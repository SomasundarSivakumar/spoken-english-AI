// ===== Queen Rat AI — Main Application =====
(function () {
    'use strict';

    // ---------- STATE ----------
    const state = {
        apiKey: localStorage.getItem('sw_apiKey') || '',
        mode: 'conversation',
        difficulty: localStorage.getItem('sw_difficulty') || 'beginner',
        autoSpeak: localStorage.getItem('sw_autoSpeak') !== 'false',
        voiceRate: parseFloat(localStorage.getItem('sw_voiceRate') || '1'),
        voicePitch: parseFloat(localStorage.getItem('sw_voicePitch') || '1'),
        selectedVoice: localStorage.getItem('sw_voice') || '',
        voiceLang: localStorage.getItem('sw_voiceLang') || 'en',
        voiceGender: localStorage.getItem('sw_voiceGender') || 'any',
        isRecording: false,
        isSending: false,
        messages: [],
        recognition: null,
        synth: window.speechSynthesis,
        voices: [],
        currentAudio: null,
    };

    // ---------- DOM REFS ----------
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const dom = {
        app: $('#app'),
        sidebar: $('#sidebar'),
        menuToggle: $('#menu-toggle'),
        navItems: $$('.nav-item[data-mode]'),
        modeTitle: $('#current-mode-title'),
        modeDesc: $('#current-mode-desc'),
        chatMessages: $('#chat-messages'),
        chatArea: $('#chat-area'),
        textInput: $('#text-input'),
        sendBtn: $('#send-btn'),
        micBtn: $('#mic-btn'),
        recordingStatus: $('#recording-status'),
        clearChatBtn: $('#clear-chat-btn'),
        settingsBtn: $('#voice-settings-btn'),
        settingsModal: $('#settings-modal'),
        closeSettings: $('#close-settings'),
        voiceSelect: $('#voice-select'),
        speedRange: $('#speed-range'),
        speedValue: $('#speed-value'),
        pitchRange: $('#pitch-range'),
        pitchValue: $('#pitch-value'),
        autoSpeakToggle: $('#auto-speak-toggle'),
        difficultyChips: $$('.chip[data-level]'),
        langChips: $$('.chip[data-lang]'),
        genderChips: $$('.chip[data-gender]'),
        setupOverlay: $('#setup-overlay'),
        setupApiKey: $('#setup-api-key'),
        saveKeyBtn: $('#save-key-btn'),
        settingsApiKey: $('#settings-api-key'),
    };

    // ---------- MODE CONFIGS ----------
    const modeConfig = {
        conversation: {
            title: 'AI Conversation',
            desc: 'Practice natural English conversation with your AI partner',
            system: `You are Queen Rat, a friendly and encouraging English conversation partner. 
Your role is to have natural conversations while subtly helping users improve their English. 
- Respond naturally and warmly, like a supportive friend.
- If the user makes grammatical errors, gently point them out after responding, using format: "💡 Quick tip: ..."
- Adjust complexity based on difficulty level.
- Keep responses concise (2-4 sentences usually) to keep the conversation flowing.
- Ask follow-up questions to keep the conversation going.`,
        },
        grammar: {
            title: 'Grammar Check',
            desc: 'Analyze your sentences for grammar and get detailed corrections',
            system: `You are Queen Rat Grammar Checker. Analyze the user's text for grammar errors.
Format your response as:
1. Show the original text
2. List each error with: ❌ Error → ✅ Correction, then a brief explanation
3. Show the fully corrected text
4. Give a grammar score out of 10
Keep explanations clear and educational. Use examples when helpful.`,
        },
        pronunciation: {
            title: 'Pronunciation Practice',
            desc: 'Learn correct pronunciation with phonetic guides and tips',
            system: `You are Queen Rat Pronunciation Coach. Help users with English pronunciation.
- When given a word/phrase, provide: phonetic transcription (IPA), syllable breakdown, common mistakes, and tips.
- Use simple analogies to explain sounds.
- Suggest similar-sounding words for practice.
- Give tongue twisters related to difficult sounds.
- Format clearly with emojis for readability.`,
        },
        vocabulary: {
            title: 'Vocabulary Builder',
            desc: 'Learn new words, idioms, and expand your English vocabulary',
            system: `You are Queen Rat Vocabulary Builder. Help users learn new English words and phrases.
When teaching vocabulary:
- Provide: definition, pronunciation hint, part of speech, 2-3 example sentences, synonyms & antonyms
- Include the word's origin/etymology if interesting
- Suggest related words and common collocations
- Create a mini-quiz at the end to test understanding
- Use the word in a real-world context
Format with clear sections and emojis.`,
        },
        roleplay: {
            title: 'Role Play',
            desc: 'Practice real-world scenarios like interviews, shopping, and more',
            system: `You are Queen Rat Role Play Partner. Create immersive English practice scenarios.
Available scenarios: job interview, restaurant ordering, hotel check-in, doctor visit, shopping, airport/travel, phone call, meeting a neighbor, asking for directions, presentation.
- Start by asking which scenario they'd like, or suggest one
- Stay in character and make it realistic
- After each exchange, optionally note how they could improve
- Adjust formality based on the scenario
- Use natural language with appropriate idioms and expressions`,
        },
    };

    // ---------- INIT ----------
    function init() {
        setupEventListeners();
        loadVoices();
        initSpeechRecognition();
        applySettings();
        
        // Show setup overlay if no API key is present
        if (!state.apiKey) {
            dom.setupOverlay.classList.remove('hidden');
        } else {
            dom.setupOverlay.classList.add('hidden');
            showWelcome();
        }
    }

    // ---------- EVENT LISTENERS ----------
    function setupEventListeners() {
        // Sidebar
        dom.menuToggle.addEventListener('click', () => dom.sidebar.classList.toggle('open'));
        dom.navItems.forEach((item) => {
            item.addEventListener('click', () => switchMode(item.dataset.mode));
        });

        // Chat
        dom.textInput.addEventListener('input', autoResize);
        dom.textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
        });
        dom.sendBtn.addEventListener('click', sendMessage);
        dom.micBtn.addEventListener('click', toggleRecording);
        dom.clearChatBtn.addEventListener('click', clearChat);

        // Settings
        dom.settingsBtn.addEventListener('click', openSettings);
        dom.closeSettings.addEventListener('click', closeSettings);
        dom.settingsModal.addEventListener('click', (e) => {
            if (e.target === dom.settingsModal) closeSettings();
        });
        dom.speedRange.addEventListener('input', () => {
            state.voiceRate = parseFloat(dom.speedRange.value);
            dom.speedValue.textContent = state.voiceRate.toFixed(1) + 'x';
            localStorage.setItem('sw_voiceRate', state.voiceRate);
        });
        dom.pitchRange.addEventListener('input', () => {
            state.voicePitch = parseFloat(dom.pitchRange.value);
            dom.pitchValue.textContent = state.voicePitch.toFixed(1);
            localStorage.setItem('sw_voicePitch', state.voicePitch);
        });
        dom.autoSpeakToggle.addEventListener('change', () => {
            state.autoSpeak = dom.autoSpeakToggle.checked;
            localStorage.setItem('sw_autoSpeak', state.autoSpeak);
        });
        dom.voiceSelect.addEventListener('change', () => {
            const voiceIdx = parseInt(dom.voiceSelect.value);
            if (state.voices[voiceIdx]) {
                state.selectedVoice = state.voices[voiceIdx].name;
                localStorage.setItem('sw_voice', state.selectedVoice);
            }
        });
        dom.difficultyChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                dom.difficultyChips.forEach((c) => c.classList.remove('active'));
                chip.classList.add('active');
                state.difficulty = chip.dataset.level;
                localStorage.setItem('sw_difficulty', state.difficulty);
            });
        });
        dom.langChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                dom.langChips.forEach((c) => c.classList.remove('active'));
                chip.classList.add('active');
                state.voiceLang = chip.dataset.lang;
                localStorage.setItem('sw_voiceLang', state.voiceLang);
                loadVoices();
            });
        });
        dom.genderChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                dom.genderChips.forEach((c) => c.classList.remove('active'));
                chip.classList.add('active');
                state.voiceGender = chip.dataset.gender;
                localStorage.setItem('sw_voiceGender', state.voiceGender);
                loadVoices();
            });
        });

        // Close sidebar on outside click (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && dom.sidebar.classList.contains('open') &&
                !dom.sidebar.contains(e.target) && e.target !== dom.menuToggle) {
                dom.sidebar.classList.remove('open');
            }
        });

        // Setup Overlay events
        if (dom.setupApiKey) {
            dom.setupApiKey.addEventListener('input', () => {
                dom.saveKeyBtn.disabled = !dom.setupApiKey.value.trim().startsWith('gsk_');
            });
            dom.saveKeyBtn.addEventListener('click', () => {
                const key = dom.setupApiKey.value.trim();
                if (key.startsWith('gsk_')) {
                    state.apiKey = key;
                    localStorage.setItem('sw_apiKey', key);
                    dom.setupOverlay.classList.add('hidden');
                    showWelcome();
                }
            });
            dom.setupApiKey.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && dom.setupApiKey.value.trim().startsWith('gsk_')) {
                    dom.saveKeyBtn.click();
                }
            });
        }

        // Settings API key events
        if (dom.settingsApiKey) {
            dom.settingsApiKey.addEventListener('input', () => {
                const key = dom.settingsApiKey.value.trim();
                state.apiKey = key;
                localStorage.setItem('sw_apiKey', key);
            });
        }
    }

    // ---------- SWITCH MODE ----------
    function switchMode(mode) {
        state.mode = mode;
        state.messages = [];
        dom.navItems.forEach((n) => n.classList.toggle('active', n.dataset.mode === mode));
        dom.modeTitle.textContent = modeConfig[mode].title;
        dom.modeDesc.textContent = modeConfig[mode].desc;
        dom.sidebar.classList.remove('open');
        showWelcome();
    }

    // ---------- WELCOME ----------
    function showWelcome() {
        const features = {
            conversation: [
                { icon: '💬', title: 'Natural Chat', desc: 'Talk about any topic freely' },
                { icon: '📝', title: 'Error Feedback', desc: 'Get gentle grammar corrections' },
                { icon: '🎯', title: 'Adaptive Level', desc: 'AI adjusts to your level' },
                { icon: '🔊', title: 'Voice Support', desc: 'Speak and listen naturally' },
            ],
            grammar: [
                { icon: '✏️', title: 'Error Detection', desc: 'Find grammar mistakes instantly' },
                { icon: '✅', title: 'Corrections', desc: 'Get the right way to say it' },
                { icon: '📖', title: 'Explanations', desc: 'Understand why it\'s wrong' },
                { icon: '💯', title: 'Grammar Score', desc: 'Track your improvement' },
            ],
            pronunciation: [
                { icon: '🗣️', title: 'Phonetics', desc: 'Learn IPA transcriptions' },
                { icon: '🎵', title: 'Syllables', desc: 'Break words into syllables' },
                { icon: '👅', title: 'Tongue Twisters', desc: 'Fun pronunciation drills' },
                { icon: '🎧', title: 'Listen & Repeat', desc: 'AI speaks, you practice' },
            ],
            vocabulary: [
                { icon: '📚', title: 'New Words', desc: 'Learn words with context' },
                { icon: '🔗', title: 'Collocations', desc: 'Natural word combinations' },
                { icon: '🧩', title: 'Quizzes', desc: 'Test your knowledge' },
                { icon: '🌍', title: 'Real Usage', desc: 'See words in real context' },
            ],
            roleplay: [
                { icon: '🎭', title: 'Scenarios', desc: 'Real-world situations' },
                { icon: '💼', title: 'Professional', desc: 'Interviews & meetings' },
                { icon: '✈️', title: 'Travel', desc: 'Airport, hotel & more' },
                { icon: '🏥', title: 'Daily Life', desc: 'Shopping, doctor visits' },
            ],
        };

        const items = features[state.mode] || features.conversation;
        dom.chatMessages.innerHTML = `
            <div class="welcome-card">
                <h2>${modeConfig[state.mode].title}</h2>
                <p>${modeConfig[state.mode].desc}</p>
                <div class="feature-grid">
                    ${items.map((f) => `
                        <div class="feature-item">
                            <div class="fi-icon">${f.icon}</div>
                            <h4>${f.title}</h4>
                            <p>${f.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // ---------- MESSAGES ----------
    function addMessage(role, text) {
        state.messages.push({ role, text });
        const msgEl = document.createElement('div');
        msgEl.className = `message ${role}`;

        const formattedText = formatMessage(text);
        msgEl.innerHTML = `
            <div class="msg-avatar">${role === 'ai' ? 'AI' : 'U'}</div>
            <div class="msg-content">
                ${formattedText}
                ${role === 'ai' ? `
                <div class="msg-actions">
                    <button class="msg-action-btn speak-btn" title="Listen">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        Listen
                    </button>
                    <button class="msg-action-btn copy-btn" title="Copy">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        Copy
                    </button>
                </div>
                ` : ''}
            </div>
        `;

        // Attach button listeners
        const speakBtn = msgEl.querySelector('.speak-btn');
        if (speakBtn) speakBtn.addEventListener('click', () => speak(text));
        const copyBtn = msgEl.querySelector('.copy-btn');
        if (copyBtn) copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(text);
            copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied`;
            setTimeout(() => { copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`; }, 2000);
        });

        dom.chatMessages.appendChild(msgEl);
        scrollToBottom();
    }

    function formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/❌\s*(.*?)(?=\n|$)/g, '<span class="grammar-error">$1</span>')
            .replace(/✅\s*(.*?)(?=\n|$)/g, '<span class="grammar-correction">$1</span>')
            .split('\n').map((line) => `<p>${line || '&nbsp;'}</p>`).join('');
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'message ai';
        el.id = 'typing-msg';
        el.innerHTML = `
            <div class="msg-avatar">AI</div>
            <div class="msg-content">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
        dom.chatMessages.appendChild(el);
        scrollToBottom();
    }

    function removeTyping() {
        const el = document.getElementById('typing-msg');
        if (el) el.remove();
    }

    function scrollToBottom() {
        dom.chatArea.scrollTo({ top: dom.chatArea.scrollHeight, behavior: 'smooth' });
    }

    function clearChat() {
        state.messages = [];
        showWelcome();
    }

    // ---------- SEND MESSAGE ----------
    async function sendMessage() {
        const text = dom.textInput.value.trim();
        if (!text || state.isSending) return;
        state.isSending = true;
        dom.textInput.value = '';
        autoResize();
        dom.sendBtn.disabled = true;

        // Remove welcome card if present
        const wc = dom.chatMessages.querySelector('.welcome-card');
        if (wc) wc.remove();

        addMessage('user', text);
        showTyping();

        try {
            const response = await callGeminiAPI(text);
            removeTyping();
            addMessage('ai', response);
            if (state.autoSpeak) speak(response);
        } catch (err) {
            removeTyping();
            addMessage('ai', `⚠️ Error: ${err.message}. Please check your API key and try again.`);
        }

        state.isSending = false;
        dom.sendBtn.disabled = false;
        dom.textInput.focus();
    }

    // ---------- GROQ API ----------
    async function callGeminiAPI(userText) {
        let tamilInstructions = '';
        if (state.voiceLang === 'ta') {
            if (state.mode === 'conversation') {
                tamilInstructions = `\n\nIMPORTANT TAMIL MODE RULE:
- You MUST converse in English so the user can practice.
- You MUST ALWAYS add a section at the very end of your response in Tamil (தமிழ் script).
- If the user made any grammatical errors in their message, add a "💡 Quick tip:" section in Tamil explaining the corrections (e.g., "💡 Quick tip: [Tamil explanation of errors and corrections]").
- If the user did NOT make any errors, you MUST still add a "📝 Note:" section in Tamil translating your reply or explaining key words (e.g., "📝 Note: [Tamil translation of your response or explanation of key words]").
- Every response must end with either "💡 Quick tip:" or "📝 Note:" written in Tamil script.`;
            } else if (state.mode === 'grammar') {
                tamilInstructions = `\n\nIMPORTANT TAMIL MODE RULE:
- You MUST analyze the grammar and list the corrections in Tamil (தமிழ் script).
- Format:
1. Original text (English)
2. List of errors: ❌ [Error] → ✅ [Correction] - [Explain why in Tamil (தமிழ்)]
3. Fully corrected text (English)
4. Grammar score out of 10
- All explanations and comments must be in Tamil script.`;
            } else if (state.mode === 'pronunciation') {
                tamilInstructions = `\n\nIMPORTANT TAMIL MODE RULE:
- All explanations, guides, tongue twister explanations, and practice instructions MUST be in Tamil (தமிழ் script). Only the IPA symbols and English words should be in English.`;
            } else if (state.mode === 'vocabulary') {
                tamilInstructions = `\n\nIMPORTANT TAMIL MODE RULE:
- All definitions, usage guides, synonym/antonym explanations, and quizzes MUST be explained in Tamil (தமிழ் script). Only the raw English words and English example sentences should remain in English.`;
            } else if (state.mode === 'roleplay') {
                tamilInstructions = `\n\nIMPORTANT TAMIL MODE RULE:
- Speak in English for the roleplay conversation.
- At the very end of every reply, you MUST add a "📝 Feedback:" section written entirely in Tamil (தமிழ் script) coaching the user on their English, grammar, or suggesting better ways to respond.`;
            }
        }

        const systemPrompt = modeConfig[state.mode].system +
            `\n\nUser's difficulty level: ${state.difficulty}. Adjust your language complexity accordingly.` +
            tamilInstructions;

        // Build messages array (OpenAI-compatible format)
        const messages = [
            { role: 'system', content: systemPrompt },
        ];

        // Add conversation history (last 10 messages for context)
        const recentMsgs = state.messages.slice(-10);
        for (const msg of recentMsgs) {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.text,
            });
        }

        const body = {
            model: 'llama-3.1-8b-instant',
            messages,
            temperature: 0.8,
            max_tokens: 1024,
        };

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.apiKey}`,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error?.message || `API Error (${res.status})`);
        }

        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (!text) throw new Error('No response from AI');
        return text.trim();
    }

    // ---------- SPEECH RECOGNITION ----------
    function initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            dom.micBtn.title = 'Speech recognition not supported in this browser';
            dom.micBtn.style.opacity = '0.4';
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        // Set language based on voice preference
        recognition.lang = state.voiceLang === 'ta' ? 'ta-IN' : 'en-US';

        let fullFinalTranscript = '';

        recognition.onstart = () => {
            state.isRecording = true;
            fullFinalTranscript = '';
            dom.textInput.value = '';
            dom.micBtn.classList.add('recording');
            dom.recordingStatus.classList.remove('hidden');
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    fullFinalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            // Show accumulated final + current interim
            dom.textInput.value = fullFinalTranscript + interimTranscript;
            autoResize();
            dom.sendBtn.disabled = !dom.textInput.value.trim();
        };

        recognition.onend = () => {
            state.isRecording = false;
            dom.micBtn.classList.remove('recording');
            dom.recordingStatus.classList.add('hidden');
            // Small delay to ensure last final result is captured, then auto-send
            setTimeout(() => {
                if (dom.textInput.value.trim()) sendMessage();
            }, 150);
        };

        recognition.onerror = (e) => {
            state.isRecording = false;
            dom.micBtn.classList.remove('recording');
            dom.recordingStatus.classList.add('hidden');
            if (e.error !== 'no-speech') console.error('Speech error:', e.error);
        };

        state.recognition = recognition;
    }

    function toggleRecording() {
        if (!state.recognition) return;
        if (state.isRecording) {
            state.recognition.stop();
        } else {
            stopSpeech(); // Stop any ongoing speech (synthesis + Google TTS)
            dom.textInput.value = '';
            // Dynamically update recognition language based on current selection
            state.recognition.lang = state.voiceLang === 'ta' ? 'ta-IN' : 'en-US';
            state.recognition.start();
        }
    }

    // ---------- SPEECH SYNTHESIS ----------
    function stopSpeech() {
        state.synth.cancel();
        if (state.currentAudio) {
            state.currentAudio.onended = null;
            state.currentAudio.onerror = null;
            state.currentAudio.pause();
            state.currentAudio = null;
        }
    }

    function speakTamilGoogle(text) {
        // Split text into chunks of max 180 chars (Google Translate TTS has a limit of 200 chars)
        const chunks = [];
        const words = text.split(' ');
        let currentChunk = '';
        
        for (const word of words) {
            if ((currentChunk + ' ' + word).length > 180) {
                chunks.push(currentChunk.trim());
                currentChunk = word;
            } else {
                currentChunk = currentChunk ? currentChunk + ' ' + word : word;
            }
        }
        if (currentChunk) {
            chunks.push(currentChunk.trim());
        }

        let index = 0;
        function playNext() {
            if (index >= chunks.length) {
                state.currentAudio = null;
                return;
            }
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ta&client=tw-ob&q=${encodeURIComponent(chunks[index])}`;
            state.currentAudio = new Audio(url);
            state.currentAudio.playbackRate = state.voiceRate;
            state.currentAudio.onended = () => {
                index++;
                playNext();
            };
            state.currentAudio.onerror = (e) => {
                console.error("Google TTS error:", e);
                index++;
                playNext();
            };
            state.currentAudio.play().catch(err => {
                console.error("Google TTS playback blocked/failed:", err);
                state.currentAudio = null;
            });
        }
        playNext();
    }

    // ---------- VOICE GENDER DETECTION ----------
    function detectVoiceGender(name) {
        const female = /samantha|victoria|karen|moira|tessa|veena|fiona|allison|ava|nova|aria|jenny|sonia|libby|mia|heera|zira|hazel|susan|zoe|alice|emma|emily|lisa|sarah|anna|linda|laura|olivia|sophia|charlotte|amelia|natasha|kate|julia|helena|freya|female|woman|girl|microsoft zira|google uk english female/i;
        const male = /alex|daniel|fred|thomas|oliver|ryan|guy|james|eric|aaron|david|mark|richard|michael|william|george|kevin|brian|edward|timothy|jason|jeffrey|frank|scott|matthew|andrew|gary|joshua|dennis|henry|carl|arthur|roger|jack|albert|jonathan|justin|keith|samuel|ralph|roy|benjamin|bruce|brandon|adam|harry|wayne|billy|steve|louis|jeremy|raymond|eugene|russell|bobby|jesse|philip|howard|carlos|male|man|boy|microsoft david|google uk english male/i;
        if (female.test(name.toLowerCase())) return 'female';
        if (male.test(name.toLowerCase())) return 'male';
        return 'unknown';
    }

    function loadVoices() {
        const populateVoices = () => {
            const allVoices = state.synth.getVoices();
            const langPrefix = state.voiceLang === 'ta' ? 'ta' : 'en';
            let filtered = allVoices.filter((v) => v.lang.startsWith(langPrefix));

            // Fallback: if no Tamil voices found, show English voices with a note
            if (filtered.length === 0) {
                filtered = allVoices.filter((v) => v.lang.startsWith('en'));
            }

            // Filter by gender preference
            if (state.voiceGender !== 'any') {
                const genderFiltered = filtered.filter((v) => detectVoiceGender(v.name) === state.voiceGender);
                if (genderFiltered.length > 0) filtered = genderFiltered;
            }

            state.voices = filtered;
            dom.voiceSelect.innerHTML = state.voices.length
                ? state.voices.map((v, i) =>
                    `<option value="${i}" ${v.name === state.selectedVoice ? 'selected' : ''}>${v.name} (${v.lang})</option>`
                  ).join('')
                : '<option>No voices found for this filter</option>';

            if (state.selectedVoice) {
                const idx = state.voices.findIndex((v) => v.name === state.selectedVoice);
                if (idx >= 0) dom.voiceSelect.value = idx;
            }
        };
        populateVoices();
        if (state.synth.onvoiceschanged !== undefined) {
            state.synth.onvoiceschanged = populateVoices;
        }
    }

    function speak(text) {
        stopSpeech();
        // Clean markdown for speech
        const clean = text.replace(/\*\*/g, '').replace(/`/g, '').replace(/[❌✅💡🗣️📝🎯🔊✏️📖💯🎵👅🎧📚🔗🧩🌍🎭💼✈️🏥⚠️]/g, '').trim();
        
        const voiceIdx = parseInt(dom.voiceSelect.value);
        const selectedVoiceObj = state.voices[voiceIdx];

        // Check if we need to fall back to Google Translate TTS for Tamil
        if (state.voiceLang === 'ta' && (!selectedVoiceObj || !selectedVoiceObj.lang.startsWith('ta'))) {
            speakTamilGoogle(clean);
            return;
        }

        const utt = new SpeechSynthesisUtterance(clean);
        utt.rate = state.voiceRate;
        utt.pitch = state.voicePitch;
        if (selectedVoiceObj) {
            utt.voice = selectedVoiceObj;
            state.selectedVoice = selectedVoiceObj.name;
        }
        state.synth.speak(utt);
    }

    // ---------- SETTINGS ----------
    function openSettings() {
        dom.settingsModal.classList.remove('hidden');
    }
    function closeSettings() { dom.settingsModal.classList.add('hidden'); }
    function applySettings() {
        dom.speedRange.value = state.voiceRate;
        dom.speedValue.textContent = state.voiceRate.toFixed(1) + 'x';
        dom.pitchRange.value = state.voicePitch;
        dom.pitchValue.textContent = state.voicePitch.toFixed(1);
        dom.autoSpeakToggle.checked = state.autoSpeak;
        dom.difficultyChips.forEach((c) => c.classList.toggle('active', c.dataset.level === state.difficulty));
        dom.langChips.forEach((c) => c.classList.toggle('active', c.dataset.lang === state.voiceLang));
        dom.genderChips.forEach((c) => c.classList.toggle('active', c.dataset.gender === state.voiceGender));
        if (dom.settingsApiKey) dom.settingsApiKey.value = state.apiKey;
    }

    // ---------- HELPERS ----------
    function autoResize() {
        const el = dom.textInput;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
        dom.sendBtn.disabled = !el.value.trim();
    }

    // ---------- START ----------
    init();
})();
