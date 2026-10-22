import http.server
import socketserver
import urllib.request
import urllib.parse
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class TutorHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

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

    def end_headers(self):
        # Enable CORS for local dev
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), TutorHTTPRequestHandler) as httpd:
        print(f"Queen Rat AI Server with Tamil Voice API running at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
