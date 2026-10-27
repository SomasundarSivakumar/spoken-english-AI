import http.server
import socketserver
import urllib.request
import urllib.parse
import os
import sys
import json

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class TutorHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        if not getattr(self, 'path', '').startswith('/api/tts'):
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # High quality TTS audio streaming endpoint (Tamil & English)
        if parsed.path == '/api/tts':
            query = urllib.parse.parse_qs(parsed.query)
            text = query.get('text', [''])[0].strip()
            lang = query.get('lang', ['ta'])[0].strip()
            
            if not text:
                self.send_response(400)
                self.send_header('Content-Type', 'text/plain')
                self.end_headers()
                self.wfile.write(b'Text parameter is required')
                return

            # Chunk or limit text length for TTS provider (max 200 chars per chunk)
            clean_text = text[:200]
            encoded = urllib.parse.quote(clean_text)
            tts_url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl={lang}&client=tw-ob&q={encoded}"

            try:
                req = urllib.request.Request(
                    tts_url, 
                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
                )
                with urllib.request.urlopen(req, timeout=8) as resp:
                    audio_data = resp.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'audio/mpeg')
                    self.send_header('Content-Length', str(len(audio_data)))
                    self.send_header('Cache-Control', 'public, max-age=86400')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(audio_data)
            except Exception as e:
                self.send_response(502)
                self.send_header('Content-Type', 'text/plain; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(f"TTS fetch error: {e}".encode('utf-8'))
            return

        # Fallback to standard static file serving
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)

        # Free AI Chat proxy endpoint (uses DuckDuckGo AI — no API key needed)
        if parsed.path == '/api/chat':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                request_data = json.loads(body.decode('utf-8'))
                messages = request_data.get('messages', [])

                if not messages:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Messages are required'}).encode('utf-8'))
                    return

                # Step 1: Get VQD session token from DuckDuckGo
                status_url = "https://duckduckgo.com/duckchat/v1/status"
                status_headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'x-vqd-accept': '1',
                }
                status_req = urllib.request.Request(status_url, headers=status_headers)
                with urllib.request.urlopen(status_req, timeout=10) as status_resp:
                    vqd_token = status_resp.headers.get('x-vqd-4')

                if not vqd_token:
                    raise Exception('Failed to get VQD token from DuckDuckGo')

                # Step 2: Send chat request
                chat_url = "https://duckduckgo.com/duckchat/v1/chat"
                chat_payload = json.dumps({
                    "model": "gpt-4o-mini",
                    "messages": messages,
                }).encode('utf-8')

                chat_headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Content-Type': 'application/json',
                    'x-vqd-4': vqd_token,
                }
                chat_req = urllib.request.Request(chat_url, data=chat_payload, headers=chat_headers)

                # Read SSE response and combine all message chunks
                full_reply = []
                with urllib.request.urlopen(chat_req, timeout=30) as chat_resp:
                    for line in chat_resp:
                        decoded = line.decode('utf-8').strip()
                        if decoded.startswith('data: '):
                            data_str = decoded[6:]
                            if data_str == '[DONE]':
                                break
                            try:
                                chunk = json.loads(data_str)
                                if 'message' in chunk:
                                    full_reply.append(chunk['message'])
                            except json.JSONDecodeError:
                                pass

                reply_text = ''.join(full_reply).strip()
                if not reply_text:
                    raise Exception('Empty response from AI')

                # Send success response
                response_json = json.dumps({
                    'choices': [{
                        'message': {
                            'role': 'assistant',
                            'content': reply_text
                        }
                    }]
                }).encode('utf-8')

                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(response_json)

            except Exception as e:
                print(f"[AI Chat Error] {e}")
                self.send_response(502)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def end_headers(self):
        # Enable CORS for local dev
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), TutorHTTPRequestHandler) as httpd:
        print(f"Queen Rat AI Server with Tamil Voice API + Free AI Chat running at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

