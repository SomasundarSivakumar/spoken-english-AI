// ===== QUEEN RAT AI — MAIN APPLICATION =====
// Spoken English AI with Tamil Voice Assistant & Daily Learning
(function () {
    'use strict';

    // ==========================================
    // 1. DATA: 12 ENGLISH TENSES WITH TAMIL
    // ==========================================
    const TENSES_DATA = [
        {
            id: 'simple-present',
            category: 'present',
            name: 'Simple Present Tense',
            tamilName: 'சாதாரண நிகழ்காலம்',
            formula: 'Subject + V1 (s/es for he/she/it)',
            ruleTamil: 'தினசரி பழக்கவழக்கங்கள் (Habits), உண்மைகள் (Facts) மற்றும் வழக்கமான செயல்களுக்குப் பயன்படும்.',
            examples: [
                { en: 'I drink coffee every morning.', ta: 'நான் தினமும் காலையில் காபி குடிக்கிறேன்.' },
                { en: 'She speaks English fluently.', ta: 'அவள் சரளமாக ஆங்கிலம் பேசுகிறாள்.' },
                { en: 'The sun rises in the east.', ta: 'சூரியன் கிழக்கில் உதிக்கிறது.' },
                { en: 'Do you work in Chennai?', ta: 'நீங்கள் சென்னையில் வேலை செய்கிறீர்களா?' }
            ]
        },
        {
            id: 'present-continuous',
            category: 'present',
            name: 'Present Continuous Tense',
            tamilName: 'தொடர் நிகழ்காலம்',
            formula: 'Subject + am/is/are + V1 + ing',
            ruleTamil: 'இப்போது இந்த நொடியில் நடந்து கொண்டிருக்கும் செயல்களைக் குறிக்கப் பயன்படும்.',
            examples: [
                { en: 'I am learning spoken English now.', ta: 'நான் இப்போது பேசும் ஆங்கிலம் கற்றுக்கொண்டிருக்கிறேன்.' },
                { en: 'She is cooking dinner for guests.', ta: 'அவள் விருந்தினர்களுக்காக இரவு உணவு சமைத்துக் கொண்டிருக்கிறாள்.' },
                { en: 'Why are you waiting here?', ta: 'நீங்கள் ஏன் இங்கே காத்திருக்கிறீர்கள்?' },
                { en: 'It is raining outside.', ta: 'வெளியே மழை பெய்து கொண்டிருக்கிறது.' }
            ]
        },
        {
            id: 'present-perfect',
            category: 'present',
            name: 'Present Perfect Tense',
            tamilName: 'முற்றுப் பெற்ற நிகழ்காலம்',
            formula: 'Subject + have/has + V3 (Past Participle)',
            ruleTamil: 'சமீபத்தில் முடிவடைந்த, ஆனால் அதன் தாக்கம் இப்போது இருக்கும் செயல்களுக்குப் பயன்படும்.',
            examples: [
                { en: 'I have completed my college degree.', ta: 'நான் எனது கல்லூரிப் படிப்பை முடித்துவிட்டேன்.' },
                { en: 'Have you eaten your lunch?', ta: 'நீங்கள் மதிய உணவு சாப்பிட்டுவிட்டீர்களா?' },
                { en: 'He has just left the office.', ta: 'அவர் சற்று முன்பே அலுவலகத்தை விட்டுச் சென்றுவிட்டார்.' },
                { en: 'We have seen this movie already.', ta: 'நாங்கள் இந்தத் திரைப்படத்தை ஏற்கனவே பார்த்துவிட்டோம்.' }
            ]
        },
        {
            id: 'present-perfect-continuous',
            category: 'present',
            name: 'Present Perfect Continuous',
            tamilName: 'நீடித்த தொடர் நிகழ்காலம்',
            formula: 'Subject + have/has been + V1 + ing',
            ruleTamil: 'கடந்த காலத்தில் தொடங்கி இப்போதும் தொடர்ந்து நடந்து கொண்டிருக்கும் செயல்களுக்குப் பயன்படும்.',
            examples: [
                { en: 'I have been living in this city for 5 years.', ta: 'நான் இந்த நகரில் 5 ஆண்டுகளாக வாழ்ந்து வருகிறேன்.' },
                { en: 'She has been working here since 2021.', ta: 'அவள் 2021 முதல் இங்கு பணிபுரிந்து வருகிறாள்.' },
                { en: 'It has been raining for two hours.', ta: 'இரண்டு மணி நேரமாக மழை பெய்து வருகிறது.' },
                { en: 'How long have you been waiting?', ta: 'நீங்கள் எவ்வளவு நேரமாகக் காத்திருக்கிறீர்கள்?' }
            ]
        },
        {
            id: 'simple-past',
            category: 'past',
            name: 'Simple Past Tense',
            tamilName: 'சாதாரண இறந்தகாலம்',
            formula: 'Subject + V2 (Past form of Verb)',
            ruleTamil: 'கடந்த காலத்தில் ஒரு குறிப்பிட்ட நேரத்தில் நடந்து முடிந்த செயல்களுக்குப் பயன்படும்.',
            examples: [
                { en: 'I called you yesterday evening.', ta: 'நான் நேற்று மாலை உங்களை அழைத்தேன்.' },
                { en: 'She bought a new laptop last week.', ta: 'அவள் கடந்த வாரம் ஒரு புதிய மடிக்கணினி வாங்கினாள்.' },
                { en: 'We went to the beach on Sunday.', ta: 'நாங்கள் ஞாயிற்றுக்கிழமை கடற்கரைக்குச் சென்றோம்.' },
                { en: 'Did you understand the lesson?', ta: 'உங்களுக்கு அந்த பாடம் புரிந்ததா?' }
            ]
        },
        {
            id: 'past-continuous',
            category: 'past',
            name: 'Past Continuous Tense',
            tamilName: 'தொடர் இறந்தகாலம்',
            formula: 'Subject + was/were + V1 + ing',
            ruleTamil: 'கடந்த காலத்தில் ஒரு குறிப்பிட்ட நேரத்தில் தொடர்ந்து நடந்து கொண்டிருந்த செயல்களைக் குறிக்கும்.',
            examples: [
                { en: 'I was sleeping when you called me.', ta: 'நீ என்னை அழைத்த போது நான் தூங்கிக் கொண்டிருந்தேன்.' },
                { en: 'They were discussing the new project.', ta: 'அவர்கள் புதிய திட்டத்தைப் பற்றி விவாதித்துக் கொண்டிருந்தார்கள்.' },
                { en: 'She was driving very carefully.', ta: 'அவள் மிகவும் கவனமாக வண்டி ஓட்டிக் கொண்டிருந்தாள்.' },
                { en: 'What were you doing at 8 PM?', ta: 'இரவு 8 மணிக்கு நீங்கள் என்ன செய்து கொண்டிருந்தீர்கள்?' }
            ]
        },
        {
            id: 'past-perfect',
            category: 'past',
            name: 'Past Perfect Tense',
            tamilName: 'முற்றுப் பெற்ற இறந்தகாலம்',
            formula: 'Subject + had + V3',
            ruleTamil: 'கடந்த காலத்தில் நடந்த இரண்டு செயல்களில், முதலில் முடிந்த செயலைக் குறிக்கப் பயன்படும்.',
            examples: [
                { en: 'The train had left before I reached the station.', ta: 'நான் நிலையத்தை அடைவதற்கு முன்பே ரயில் கிளம்பிவிட்டது.' },
                { en: 'She had already finished dinner when we arrived.', ta: 'நாங்கள் சென்றடைந்த போது அவள் ஏற்கனவே உணவை முடித்திருந்தாள்.' },
                { en: 'I had never seen such a beautiful place before.', ta: 'நான் இதற்கு முன்பு இவ்வளவு அழகான இடத்தை பார்த்ததில்லை.' },
                { en: 'Had you heard about this news earlier?', ta: 'இந்த செய்தியைப் பற்றி நீங்கள் முன்பே கேள்விப்பட்டிருந்தீர்களா?' }
            ]
        },
        {
            id: 'past-perfect-continuous',
            category: 'past',
            name: 'Past Perfect Continuous',
            tamilName: 'நீடித்த தொடர் இறந்தகாலம்',
            formula: 'Subject + had been + V1 + ing',
            ruleTamil: 'கடந்த காலத்தில் ஒரு குறிப்பிட்ட நிகழ்வுக்கு முன்பு வரை தொடர்ந்து நடந்து கொண்டிருந்த செயலைக் குறிக்கும்.',
            examples: [
                { en: 'He had been searching for a job for months before he got hired.', ta: 'வேலை கிடைப்பதற்கு முன்பு பல மாதங்களாக அவர் வேலை தேடிக் கொண்டிருந்தார்.' },
                { en: 'I had been studying for 3 hours before the lights went out.', ta: 'மின்தடை ஏற்படுவதற்கு முன்பு நான் 3 மணி நேரமாக படித்துக் கொண்டிருந்தேன்.' },
                { en: 'They had been waiting for the bus a long time.', ta: 'அவர்கள் நீண்ட நேரமாக பேருந்துக்காகக் காத்திருந்தனர்.' },
                { en: 'She was tired because she had been running.', ta: 'அவள் ஓடிக் கொண்டிருந்ததால் சோர்வாக இருந்தாள்.' }
            ]
        },
        {
            id: 'simple-future',
            category: 'future',
            name: 'Simple Future Tense',
            tamilName: 'சாதாரண எதிர்காலம்',
            formula: 'Subject + will/shall + V1',
            ruleTamil: 'எதிர்காலத்தில் நடக்கப்போகும் செயல்கள், முடிவுகள் மற்றும் வாக்குறுதிகளைக் குறிக்கப் பயன்படும்.',
            examples: [
                { en: 'I will call you tomorrow morning.', ta: 'நான் நாளை காலை உங்களை அழைக்கிறேன் / அழைப்பேன்.' },
                { en: 'We will help you with your interview preparation.', ta: 'உங்கள் நேர்முகத் தேர்வு தயாரிப்பில் நாங்கள் உங்களுக்கு உதவுவோம்.' },
                { en: 'Will you attend the meeting tomorrow?', ta: 'நாளை கூட்டத்தில் நீங்கள் கலந்து கொள்வீர்களா?' },
                { en: 'It will take only ten minutes.', ta: 'இதற்கு பத்து நிமிடங்கள் மட்டுமே ஆகும்.' }
            ]
        },
        {
            id: 'future-continuous',
            category: 'future',
            name: 'Future Continuous Tense',
            tamilName: 'தொடர் எதிர்காலம்',
            formula: 'Subject + will be + V1 + ing',
            ruleTamil: 'எதிர்காலத்தில் ஒரு குறிப்பிட்ட நேரத்தில் தொடர்ந்து நடந்து கொண்டிருக்கும் செயலைக் குறிக்கும்.',
            examples: [
                { en: 'This time tomorrow, I will be traveling to Bangalore.', ta: 'நாளை இந்நேரம் நான் பெங்களூருக்கு பயணம் செய்து கொண்டிருப்பேன்.' },
                { en: 'She will be waiting for you at the airport.', ta: 'அவள் விமான நிலையத்தில் உங்களுக்காகக் காத்திருப்பாள்.' },
                { en: 'Will you be joining us for lunch tomorrow?', ta: 'நாளை மதிய உணவிற்கு எங்களுடன் இணைவீர்களா?' },
                { en: 'They will be attending the conference next Monday.', ta: 'அடுத்த திங்கட்கிழமை அவர்கள் மாநாட்டில் கலந்து கொள்வார்கள்.' }
            ]
        },
        {
            id: 'future-perfect',
            category: 'future',
            name: 'Future Perfect Tense',
            tamilName: 'முற்றுப் பெற்ற எதிர்காலம்',
            formula: 'Subject + will have + V3',
            ruleTamil: 'எதிர்காலத்தில் ஒரு குறிப்பிட்ட நேரத்திற்குள் அல்லது நிகழ்வுக்குள் முடிவடைந்திருக்கும் செயல்களைக் குறிக்கும்.',
            examples: [
                { en: 'I will have finished the project by 5 PM.', ta: 'மாலை 5 மணிக்குள் நான் இந்த திட்டத்தை முடித்துவிடுவேன்.' },
                { en: 'By next year, she will have graduated.', ta: 'அடுத்த ஆண்டுக்குள் அவள் பட்டம் பெற்றுவிடுவாள்.' },
                { en: 'Will they have reached home by then?', ta: 'அதற்குள் அவர்கள் வீட்டிற்குச் சென்றடைவார்களா?' },
                { en: 'We will have saved enough money by December.', ta: 'டிசம்பருக்குள் நாங்கள் போதுமான பணத்தை சேமித்திருப்போம்.' }
            ]
        },
        {
            id: 'future-perfect-continuous',
            category: 'future',
            name: 'Future Perfect Continuous',
            tamilName: 'நீடித்த தொடர் எதிர்காலம்',
            formula: 'Subject + will have been + V1 + ing',
            ruleTamil: 'எதிர்காலத்தில் ஒரு குறிப்பிட்ட நேரம் வரை தொடர்ந்து நீடிக்கும் செயல்களைக் குறிக்கும்.',
            examples: [
                { en: 'By next month, I will have been working here for 2 years.', ta: 'அடுத்த மாதத்துடன் நான் இங்கு பணிபுரிந்து 2 ஆண்டுகள் ஆகியிருக்கும்.' },
                { en: 'She will have been teaching for 10 years by 2027.', ta: '2027-க்குள் அவள் 10 ஆண்டுகளாக பாடம் சொல்லிக் கொடுத்திருப்பாள்.' },
                { en: 'They will have been practicing for weeks before the finals.', ta: 'இறுதிப் போட்டிக்கு முன்பு அவர்கள் பல வாரங்களாகப் பயிற்சி பெற்றிருப்பார்கள்.' },
                { en: 'How long will you have been living there by next year?', ta: 'அடுத்த ஆண்டுக்குள் நீங்கள் அங்கு எத்தனை காலம் வாழ்ந்திருப்பீர்கள்?' }
            ]
        }
    ];

    // ==========================================
    // 2. DATA: DYNAMIC AI SPOKEN VOCABULARY ENGINE
    // (No hardcoded words; dynamically generated by AI & user searches)
    // ==========================================
    const WORDS_DATA = [];

    // Load custom saved/generated words from localStorage
    try {
        const savedCustomWords = JSON.parse(localStorage.getItem('sw_custom_words') || '[]');
        savedCustomWords.forEach(w => {
            if (!WORDS_DATA.some(x => x.word.toLowerCase() === w.word.toLowerCase())) {
                WORDS_DATA.push(w);
            }
        });
    } catch (e) {}

    const EVERYDAY_DICT = {};

    // ==========================================
    // 3. APPLICATION STATE
    // ==========================================
    const state = {
        activeTab: 'chat',
        mode: 'conversation', // 'conversation', 'grammar', 'pronunciation'
        aiProvider: localStorage.getItem('sw_ai_provider') || 'puter',
        groqKey: localStorage.getItem('sw_groq_key') || '',
        difficulty: localStorage.getItem('sw_difficulty') || 'beginner',
        autoSpeak: localStorage.getItem('sw_autoSpeak') !== 'false',
        voiceRate: parseFloat(localStorage.getItem('sw_voiceRate') || '1.0'),
        voicePitch: parseFloat(localStorage.getItem('sw_voicePitch') || '1.0'),
        theme: localStorage.getItem('sw_theme') || 'light',
        selectedVoice: localStorage.getItem('sw_voice') || '',
        isRecording: false,
        isSending: false,
        messages: [],
        currentTenseFilter: 'all',
        currentTenseQuizIdx: 0,
        currentVocabCat: 'all',
        vocabScore: parseInt(localStorage.getItem('sw_vocab_score') || '0', 10),
        currentVocabQuizIdx: 0,
        seenWords: new Set(JSON.parse(localStorage.getItem('sw_seen_words') || '[]')),
        readingTopic: 'daily-life',
        readingDifficulty: 'beginner',
        readingLength: 'big',
        readingPassage: null,
        isReadingRecording: false,
        user: null,
        recognition: null,
        synth: window.speechSynthesis,
        voices: [],
        currentAudio: null
    };

    // ==========================================
    // 4. DOM REFERENCES
    // ==========================================
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    const dom = {
        app: $('#app'),
        sidebar: $('#sidebar'),
        sidebarOverlay: $('#sidebar-overlay'),
        menuToggle: $('#menu-toggle'),
        navItems: $$('.nav-item[data-tab]'),
        mobileNavBtns: $$('.mobile-nav-btn[data-tab]'),
        tabPanes: $$('.tab-pane'),
        pageTitle: $('#page-title'),
        pageSubtitle: $('#page-subtitle'),
        chatModePill: $('#chat-mode-pill'),
        modeChips: $$('.mode-chip[data-mode]'),
        themeToggleBtn: $('#theme-toggle-btn'),
        themeIcon: $('#theme-icon'),
        voiceQuickToggle: $('#voice-quick-toggle'),
        settingsQuickBtn: $('#settings-quick-btn'),
        clearChatBtn: $('#clear-chat-btn'),
        sidebarProviderLabel: $('#sidebar-provider-label'),

        // App & Auth Gate DOM
        app: $('#app'),
        authGateModal: $('#auth-gate-modal'),
        gateGoogleLoginBtn: $('#gate-google-login-btn'),
        gateStatusMsg: $('#gate-status-msg'),
        sidebarGoogleLoginBtn: $('#sidebar-google-login-btn'),
        userLoggedOut: $('#user-logged-out'),
        userLoggedIn: $('#user-logged-in'),
        userAvatarImg: $('#user-avatar-img'),
        userDisplayName: $('#user-display-name'),
        userEmailText: $('#user-email-text'),
        userLogoutBtn: $('#user-logout-btn'),
        topbarLoginBtn: $('#topbar-login-btn'),
        topbarProfileBadge: $('#topbar-profile-badge'),
        topbarAvatarImg: $('#topbar-avatar-img'),
        settingsGoogleLoginBtn: $('#settings-google-login-btn'),
        settingsLogoutBtn: $('#settings-logout-btn'),
        settingsUserLoggedOut: $('#settings-user-logged-out'),
        settingsUserLoggedIn: $('#settings-user-logged-in'),
        settingsUserName: $('#settings-user-name'),
        settingsUserEmail: $('#settings-user-email'),
        settingsUserAvatar: $('#settings-user-avatar'),
        toggleFirebaseKeysBtn: $('#toggle-firebase-keys-btn'),
        firebaseKeysContainer: $('#firebase-keys-container'),
        fbApiKey: $('#fb-api-key'),
        fbAuthDomain: $('#fb-auth-domain'),
        fbProjectId: $('#fb-project-id'),
        fbStorageBucket: $('#fb-storage-bucket'),
        fbAppId: $('#fb-app-id'),
        saveFirebaseConfigBtn: $('#save-firebase-config-btn'),
        firebaseSaveMsg: $('#firebase-save-msg'),
        firebaseStatusPill: $('#firebase-status-pill'),

        // Chat
        chatArea: $('#chat-area'),
        chatMessages: $('#chat-messages'),
        textInput: $('#text-input'),
        sendBtn: $('#send-btn'),
        micBtn: $('#mic-btn'),
        recordingIndicator: $('#recording-indicator'),
        quickChips: $$('.quick-chip'),
        typingMeaningBar: $('#typing-meaning-bar'),
        tmbWord: $('#tmb-word'),
        tmbTamil: $('#tmb-tamil'),
        tmbSound: $('#tmb-sound'),
        tmbSpeakBtn: $('#tmb-speak-btn'),

        // Tenses
        tensesGrid: $('#tenses-grid'),
        tensesFilterBtns: $$('.filter-btn[data-filter]'),
        tenseQuizQuestion: $('#tense-quiz-question'),
        tenseQuizOptions: $('#tense-quiz-options'),
        tenseQuizFeedback: $('#tense-quiz-feedback'),
        nextTenseQuizBtn: $('#next-tense-quiz-btn'),
        tenseMasteryBadge: $('#tense-mastery-badge'),
        quizCloudSaveStatus: $('#quiz-cloud-save-status'),
        aiGenerateTenseBtn: $('#ai-generate-tense-btn'),
        aiTenseQuizBtn: $('#ai-tense-quiz-btn'),
        aiTenseDynamicBox: $('#ai-tense-dynamic-box'),
        aiTenseResults: $('#ai-tense-results'),
        aiTenseBoxTitle: $('#ai-tense-box-title'),
        aiTenseCloseBtn: $('#ai-tense-close-btn'),

        // Words
        wordOfDayCard: $('#word-of-day-card'),
        wordsGrid: $('#words-grid'),
        vocabCatBtns: $$('.vocab-cat-btn[data-cat]'),
        vocabQuizCard: $('#vocab-quiz-card'),
        vocabScoreBadge: $('#vocab-score-badge'),
        wordSearchInput: $('#word-search-input'),
        wordSearchBtn: $('#word-search-btn'),
        wordClearBtn: $('#word-clear-btn'),
        wordLookupResult: $('#word-lookup-result'),
        aiGenerateSingleWordBtn: $('#ai-generate-single-word-btn'),
        aiGenerateBatchWordsBtn: $('#ai-generate-batch-words-btn'),
        aiVocabQuizBtn: $('#ai-vocab-quiz-btn'),

        // Reading Practice
        readingTopicChips: $$('.topic-chip[data-topic]'),
        readingDiffPills: $$('.diff-pill[data-rdiff]'),
        readingLengthPills: $$('.length-pill[data-rlength]'),
        aiGenerateReadingBtn: $('#ai-generate-reading-btn'),
        readerCard: $('#reader-card'),
        readerBadge: $('#reader-badge'),
        readerTitle: $('#reader-title'),
        readerEst: $('#reader-est'),
        readerSpeakEnBtn: $('#reader-speak-en-btn'),
        readerStopAudioBtn: $('#reader-stop-audio-btn'),
        readerPassageBox: $('#reader-passage-box'),
        readerRecordBtn: $('#reader-record-btn'),
        readerRecordText: $('#reader-record-text'),
        readerRecStatus: $('#reader-rec-status'),
        readerFeedbackCard: $('#reader-feedback-card'),
        readerScoreVal: $('#reader-score-val'),
        readerFeedbackTitle: $('#reader-feedback-title'),
        readerFeedbackTa: $('#reader-feedback-ta'),
        readerSpokenComparison: $('#reader-spoken-comparison'),
        readerTamilToggle: $('#reader-tamil-toggle'),
        readerTamilContent: $('#reader-tamil-content'),
        readerTamilArrow: $('#reader-tamil-arrow'),

        // Roleplay
        roleplayCards: $$('.roleplay-card'),

        // Settings
        aiProviderSelect: $('#ai-provider-select'),
        groqKeyContainer: $('#groq-key-container'),
        groqApiKey: $('#groq-api-key'),
        voiceSelect: $('#voice-select'),
        speedSlider: $('#speed-slider'),
        speedVal: $('#speed-val'),
        pitchSlider: $('#pitch-slider'),
        pitchVal: $('#pitch-val'),
        autoSpeakCb: $('#auto-speak-cb'),
        diffBtns: $$('.diff-btn[data-diff]'),
        themeChoiceBtns: $$('.diff-btn[data-theme-choice]'),
        resetDefaultsBtn: $('#reset-defaults-btn')
    };

    // ==========================================
    // 4.5. THEME MANAGER (LIGHT / DARK)
    // ==========================================
    const themeManager = {
        applyTheme(theme) {
            state.theme = theme;
            localStorage.setItem('sw_theme', theme);
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (dom.themeIcon) dom.themeIcon.textContent = '🌙';
            } else {
                document.documentElement.removeAttribute('data-theme');
                if (dom.themeIcon) dom.themeIcon.textContent = '☀️';
            }

            if (dom.themeChoiceBtns) {
                dom.themeChoiceBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.themeChoice === theme);
                });
            }
        },

        toggle() {
            const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
            themeManager.applyTheme(nextTheme);
        }
    };

    // ==========================================
    // 4.6. LEARNING PROGRESS & FIREBASE CLOUD MANAGER
    // ==========================================
    const learningProgressManager = {
        stats: {
            tenseScore: 0,
            tenseAnswered: 0,
            tenseCorrect: 0,
            vocabScore: 0,
            vocabAnswered: 0,
            vocabCorrect: 0,
            readingTestsCount: 0,
            readingAccuracyTotal: 0,
            chatMessagesCount: 0,
            learningPercentage: 0,
            attendedTenseQuestions: [],
            attendedVocabWords: []
        },

        async init() {
            const uid = state.user ? state.user.uid : 'guest';
            const localKey = `sw_progress_${uid}`;
            try {
                const saved = localStorage.getItem(localKey);
                if (saved) {
                    this.stats = { ...this.stats, ...JSON.parse(saved) };
                }
            } catch (e) {}

            if (window.authManager && authManager.loadUserProgress) {
                try {
                    const cloud = await authManager.loadUserProgress();
                    if (cloud) {
                        this.stats = { ...this.stats, ...cloud };
                    }
                } catch (e) {}
            }

            this.calculateAndRender();
        },

        calculateLearningPercentage() {
            // Tense accuracy & volume (up to 35%)
            const tCount = this.stats.tenseAnswered || 0;
            const tCorrect = this.stats.tenseCorrect || 0;
            const tAcc = tCount > 0 ? (tCorrect / tCount) : 0;
            const tVol = Math.min(1, tCount / 10);
            const tenseScore = (tAcc * 0.7 + tVol * 0.3) * 35;

            // Vocab accuracy & volume (up to 35%)
            const vCount = this.stats.vocabAnswered || 0;
            const vCorrect = this.stats.vocabCorrect || 0;
            const vAcc = vCount > 0 ? (vCorrect / vCount) : 0;
            const vVol = Math.min(1, (vCount + (this.stats.attendedVocabWords?.length || 0)) / 15);
            const vocabScore = (vAcc * 0.7 + vVol * 0.3) * 35;

            // Reading studio accuracy (up to 20%)
            const rCount = this.stats.readingTestsCount || 0;
            const rAvgAcc = rCount > 0 ? (this.stats.readingAccuracyTotal / rCount) / 100 : 0;
            const rVol = Math.min(1, rCount / 4);
            const readingScore = (rAvgAcc * 0.6 + rVol * 0.4) * 20;

            // Chat conversations (up to 10%)
            const convoScore = Math.min(1, (this.stats.chatMessagesCount || 0) / 10) * 10;

            const total = Math.min(100, Math.max(0, Math.round(tenseScore + vocabScore + readingScore + convoScore)));
            this.stats.learningPercentage = total;
            return total;
        },

        async recordTenseAnswer(questionText, isCorrect, tenseName) {
            this.stats.tenseAnswered = (this.stats.tenseAnswered || 0) + 1;
            if (isCorrect) {
                this.stats.tenseCorrect = (this.stats.tenseCorrect || 0) + 1;
                this.stats.tenseScore = (this.stats.tenseScore || 0) + 10;
            }
            if (!this.stats.attendedTenseQuestions) this.stats.attendedTenseQuestions = [];
            if (!this.stats.attendedTenseQuestions.includes(questionText)) {
                this.stats.attendedTenseQuestions.push(questionText);
            }

            this.calculateLearningPercentage();
            await this.sync();
            this.render();
        },

        async recordVocabAnswer(word, isCorrect) {
            this.stats.vocabAnswered = (this.stats.vocabAnswered || 0) + 1;
            if (isCorrect) {
                this.stats.vocabCorrect = (this.stats.vocabCorrect || 0) + 1;
                this.stats.vocabScore = (this.stats.vocabScore || 0) + 10;
            }
            if (!this.stats.attendedVocabWords) this.stats.attendedVocabWords = [];
            if (!this.stats.attendedVocabWords.includes(word)) {
                this.stats.attendedVocabWords.push(word);
            }

            this.calculateLearningPercentage();
            await this.sync();
            this.render();
        },

        async recordReadingTest(accuracyPercent) {
            this.stats.readingTestsCount = (this.stats.readingTestsCount || 0) + 1;
            this.stats.readingAccuracyTotal = (this.stats.readingAccuracyTotal || 0) + accuracyPercent;
            this.calculateLearningPercentage();
            await this.sync();
            this.render();
        },

        async recordChatMessage() {
            this.stats.chatMessagesCount = (this.stats.chatMessagesCount || 0) + 1;
            this.calculateLearningPercentage();
            await this.sync();
            this.render();
        },

        async sync() {
            const uid = state.user ? state.user.uid : 'guest';
            const localKey = `sw_progress_${uid}`;
            this.stats.updatedAt = new Date().toISOString();
            localStorage.setItem(localKey, JSON.stringify(this.stats));

            if (window.authManager && authManager.saveUserProgress) {
                await authManager.saveUserProgress(this.stats);
            }
        },

        render() {
            const pct = this.stats.learningPercentage || 0;

            // Sidebar progress fill & text
            const sideFill = document.getElementById('sidebar-progress-fill');
            const sideText = document.getElementById('sidebar-progress-text');
            if (sideFill) sideFill.style.width = `${pct}%`;
            if (sideText) sideText.textContent = `Mastery: ${pct}%`;

            // Settings progress fill & text
            const settingsPct = document.getElementById('settings-learning-pct');
            const settingsFill = document.getElementById('settings-progress-fill');
            const settingsTense = document.getElementById('settings-tense-stats');
            const settingsVocab = document.getElementById('settings-vocab-stats');
            const settingsReading = document.getElementById('settings-reading-stats');

            if (settingsPct) settingsPct.textContent = `${pct}% Mastered`;
            if (settingsFill) settingsFill.style.width = `${pct}%`;
            if (settingsTense) {
                settingsTense.textContent = `${this.stats.tenseCorrect || 0} / ${this.stats.tenseAnswered || 0} correct (${this.stats.tenseScore || 0} XP)`;
            }
            if (settingsVocab) {
                settingsVocab.textContent = `${this.stats.vocabCorrect || 0} / ${this.stats.vocabAnswered || 0} correct (${this.stats.vocabScore || 0} XP)`;
            }
            if (settingsReading) {
                const avgAcc = this.stats.readingTestsCount > 0 
                    ? Math.round(this.stats.readingAccuracyTotal / this.stats.readingTestsCount)
                    : 0;
                settingsReading.textContent = `${avgAcc}% avg accuracy (${this.stats.readingTestsCount || 0} tests)`;
            }

            // Tenses mastery badge
            const tenseBadge = document.getElementById('tense-mastery-badge');
            if (tenseBadge) {
                const tCount = this.stats.tenseAnswered || 0;
                const tCorrect = this.stats.tenseCorrect || 0;
                const tAcc = tCount > 0 ? Math.round((tCorrect / tCount) * 100) : 0;
                tenseBadge.textContent = `Tense Mastery: ${tAcc}% (${tCorrect}/${tCount})`;
            }
        },

        calculateAndRender() {
            this.calculateLearningPercentage();
            this.render();
        }
    };

    window.learningProgressManager = learningProgressManager;

    // ==========================================
    // 5. FREE AI ENGINE & MULTI-PROVIDER
    // ==========================================
    const aiEngine = {
        async generateReply(userPrompt) {
            // Build rich bilingual system instruction
            const systemPrompt = `You are Queen Rat AI, an encouraging and expert English speaking partner for Tamil speakers.
Your mission: Help Tamil speakers speak fluent, natural English with confidence.

Current Difficulty Level: ${state.difficulty}.
Current Mode: ${state.mode}.

CRITICAL RESPONSE FORMAT RULES:
1. Speak in friendly, natural, simple English suitable for real-world spoken conversations (2 to 4 sentences).
2. Ask one conversational follow-up question in English.
3. AT THE VERY END, YOU MUST INCLUDE A TAMIL EXPLANATION BOX formatted EXACTLY as:
💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- [Explain the Tamil meaning of key English words used in your reply.]
- [If the user made any grammatical, pronunciation, or wording mistake, gently show the correct English and explain WHY in Tamil script (தமிழ்).]
- [If the user's sentence was correct, praise them in Tamil and provide a native alternative phrase.]

Tone: Warm, motivating, strictly supportive. Use genuine Tamil script (தமிழ் எழுத்துக்கள்).`;

            // Route based on selected provider, with intelligent fallback chain
            // Priority: Groq (if key) → Local Server AI (free, no key) → Puter.js → Pollinations → Offline

            // 1. Try Groq first if user has a key
            if (state.aiProvider === 'groq' && state.groqKey) {
                try {
                    return await aiEngine.callGroq(systemPrompt, userPrompt);
                } catch (e) {
                    console.warn('Groq failed, trying fallbacks:', e.message);
                }
            }

            // 2. Primary: Local server AI proxy (free, no key, no CORS issues)
            try {
                return await aiEngine.callLocalServer(systemPrompt, userPrompt);
            } catch (e) {
                console.warn('Local server AI failed, trying other providers:', e.message);
            }

            // 3. Try Puter.js (free but may need sign-in)
            if (window.puter && window.puter.ai) {
                try {
                    const puterRes = await window.puter.ai.chat(`${systemPrompt}\n\nUser: ${userPrompt}`);
                    if (puterRes) {
                        const reply = puterRes.toString().trim();
                        if (reply.length > 0) return reply;
                    }
                } catch (e) {
                    console.warn('Puter.js AI failed:', e.message);
                }
            }

            // 4. Try Pollinations as last online resort
            try {
                return await aiEngine.callPollinations(systemPrompt, userPrompt);
            } catch (err) {
                console.warn('Pollinations AI also failed:', err.message);
            }

            // 5. Final offline fallback
            console.warn('All AI providers failed, using built-in Smart Offline Tutor');
            return aiEngine.generateOfflineFallback(userPrompt);
        },

        async callLocalServer(systemPrompt, userPrompt) {
            const messages = [
                { role: 'system', content: systemPrompt },
                ...state.messages.slice(-6).map(m => ({
                    role: m.role === 'user' ? 'user' : 'assistant',
                    content: m.text.replace(/💡 தமிழ் விளக்கம்[\s\S]*$/, '').trim()
                })),
                { role: 'user', content: userPrompt }
            ];

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 35000);

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server AI HTTP ${res.status}`);
            }

            const data = await res.json();
            const reply = data.choices?.[0]?.message?.content?.trim();
            if (!reply) throw new Error('Empty response from Server AI');
            return reply;
        },

        async callPollinations(systemPrompt, userPrompt) {
            const messages = [
                { role: 'system', content: systemPrompt },
                ...state.messages.slice(-6).map(m => ({
                    role: m.role === 'user' ? 'user' : 'assistant',
                    content: m.text.replace(/💡 தமிழ் விளக்கம்[\s\S]*$/, '').trim()
                })),
                { role: 'user', content: userPrompt }
            ];

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000);

            const res = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages,
                    model: 'openai',
                    seed: Math.floor(Math.random() * 100000)
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                throw new Error(`Free AI HTTP ${res.status}`);
            }

            // New endpoint returns OpenAI-compatible JSON
            const contentType = res.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const data = await res.json();
                const reply = data.choices?.[0]?.message?.content?.trim();
                if (!reply) throw new Error('Empty response from Free AI');
                return reply;
            }

            // Fallback: if plain text response
            const text = await res.text();
            if (!text || text.trim().length === 0) {
                throw new Error('Empty response from Free AI');
            }
            return text.trim();
        },

        async callGroq(systemPrompt, userPrompt) {
            const candidateModels = ['llama-3.3-70b-versatile', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
            let lastErr = null;

            for (const model of candidateModels) {
                try {
                    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${state.groqKey}`
                        },
                        body: JSON.stringify({
                            model,
                            messages: [
                                { role: 'system', content: systemPrompt },
                                ...state.messages.slice(-6).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
                                { role: 'user', content: userPrompt }
                            ],
                            temperature: 0.7,
                            max_tokens: 800
                        })
                    });

                    if (res.ok) {
                        const data = await res.json();
                        return data.choices?.[0]?.message?.content?.trim();
                    }
                    const errData = await res.json().catch(() => ({}));
                    lastErr = new Error(errData.error?.message || `Groq error ${res.status}`);
                } catch (e) {
                    lastErr = e;
                }
            }
            throw lastErr;
        },

        generateOfflineFallback(userPrompt) {
            const raw = userPrompt.trim();
            const lower = raw.toLowerCase();
            const historyCount = state.messages.filter(m => m.role === 'user').length;

            // 1. Check for common grammar/spoken mistakes first
            if (/\bmyself\s+[a-zA-Z]+/i.test(lower)) {
                const name = lower.match(/\bmyself\s+([a-zA-Z]+)/i)?.[1] || 'friend';
                const capName = name.charAt(0).toUpperCase() + name.slice(1);
                return `It is wonderful to meet you, ${capName}! In professional English, instead of saying "Myself ${capName}", it is best to say "I am ${capName}" or "My name is ${capName}." What field do you work in or what are you studying?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- ஆங்கிலத்தில் தன்னை அறிமுகப்படுத்தும் போது "Myself [பெயர்]" என்று சொல்லக் கூடாது.
- சரியான முறை: "I am ${capName}" அல்லது "My name is ${capName}."
- அடுத்த கேள்வி: நீங்கள் என்ன வேலை செய்கிறீர்கள் அல்லது படிக்கிறீர்கள்?`;
            }

            if (/\bi\s+am\s+agree\b/i.test(lower)) {
                return `I love that we agree! Just a quick tip: say "I agree" instead of "I am agree", because "agree" is already a verb. What made you feel that way?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Agree" என்பதே ஒரு வினைச்சொல் (Verb) என்பதால் "am" சேர்க்கக் கூடாது.
- "I am agree" ❌ -> "I agree" ✅
- "நான் ஒப்புக்கொள்கிறேன்" என்று சொல்ல "I agree" அல்லது "I completely agree" எனப் பயன்படுத்தலாம்.`;
            }

            if (/\bi\s+want\s+learn\b/i.test(lower)) {
                return `That is an inspiring goal! Remember to include "to" after want: say "I want to learn English." Speaking every single day with me will build your fluency very fast. What is your biggest challenge in speaking English?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Want" என்ற சொல்லுக்குப் பிறகு மற்றொரு செயல் (Verb) வந்தால் இடையில் "to" வர வேண்டும்.
- "I want learn" ❌ -> "I want to learn English" ✅
- உங்கள் மிகப்பெரிய சவால் என்ன? (பயம் / வார்த்தைகள் நினைவுக்கு வராமல் இருப்பது / இலக்கணம்?)`;
            }

            if (/\bdidn't\s+(went|came|saw|ate|had)\b/i.test(lower)) {
                return `Good try expressing that! Notice that after "didn't", we always use the base verb (V1): say "didn't go" or "didn't eat." Could you try saying that sentence again?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Didn't" வந்தாலே அடுத்து நிகழ்கால அடிப்படை வினையே (V1) வரவேண்டும்.
- "Didn't went" ❌ -> "Didn't go" ✅
- "Didn't ate" ❌ -> "Didn't eat" ✅`;
            }

            // 2. Name & Self Introduction
            if (/\b(my name is|i am|i'm|im)\s+([a-zA-Z]+)/i.test(lower) && !lower.includes('good') && !lower.includes('fine')) {
                const nameMatch = lower.match(/\b(?:my name is|i am|i'm|im)\s+([a-zA-Z]+)/i);
                const userName = nameMatch ? nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1) : 'there';
                return `Nice to meet you, ${userName}! It is a pleasure to be your English speaking partner. Where are you from, and which city do you live in?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Nice to meet you" = உங்களைச் சந்தித்ததில் மகிழ்ச்சி!
- "Where are you from?" = நீங்கள் எந்த ஊரைச் சேர்ந்தவர்?
- நீங்கள் பதில் சொல்லலாம்: "I am from Chennai" அல்லது "I live in Coimbatore."`;
            }

            // 3. Food / Breakfast / Lunch / Meals
            if (/\b(dosa|dosai|idli|idly|poori|pongal|rice|coffee|tea|breakfast|lunch|dinner|ate|had|bread|egg|chapati|food)\b/i.test(lower)) {
                return `That sounds tasty and energizing! Starting your day with good food always puts you in a positive mood. Do you prefer cooking at home, or do you enjoy dining out at restaurants?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Dining out" என்றால் "வெளியே ஹோட்டலில் சாப்பிடுவது" என்று பொருள்.
- "Tasty and energizing" = சுவையான மற்றும் புத்துணர்ச்சி அளிக்கும்.
- பதில் கூறலாம்: "I prefer homemade food" (நான் வீட்டு உணவையே விரும்புகிறேன்) அல்லது "I love dining out on weekends."`;
            }

            // 4. Work / Study / Career
            if (/\b(work|job|office|company|software|developer|engineer|teacher|student|college|school|studying|study|business)\b/i.test(lower)) {
                return `That is fascinating! Being in that field must be exciting and keeps you constantly learning. What is one thing you enjoy most about your daily work or studies?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Fascinating" என்றால் "மிகவும் சுவாரசியமானது" என்று அர்த்தம்.
- "Constantly learning" = தொடர்ந்து புதியவற்றைக் கற்றுக் கொண்டிருப்பது.
- எளிதாகப் பதில் சொல்லுங்கள்: "I enjoy solving problems" அல்லது "I like meeting new people in my college."`;
            }

            // 5. City / Location
            if (/\b(chennai|coimbatore|madurai|trichy|salem|bangalore|tamil nadu|india|live in|from)\b/i.test(lower)) {
                return `What a vibrant and lovely place to live! Many learners from your region are achieving great fluency in English. How is the weather there today?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Vibrant" என்றால் "துடிப்பான / கலகலப்பான இடம்" என்று பொருள்.
- "How is the weather?" = அங்கே இன்றைய வானிலை எப்படி இருக்கிறது?
- பதில் சொல்லலாம்: "It is sunny and warm today" அல்லது "The weather is very pleasant."`;
            }

            // 6. Hobbies / Free time
            if (/\b(cricket|movie|movies|cinema|music|reading|books|game|gaming|travel|cooking|drawing|gym)\b/i.test(lower)) {
                return `That is an awesome hobby! Spending your free time doing what you love keeps your mind fresh. How often do you get time to pursue this?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Pursue" என்றால் "ஒரு விருப்பமான செயலில் தொடர்ந்து ஈடுபடுவது".
- "How often" = எத்தனை முறை அல்லது எவ்வளவு அடிக்கடி?
- பதில் சொல்லலாம்: "I play cricket every weekend" அல்லது "I listen to music every evening."`;
            }

            // 7. General Greetings
            if (/\b(hello|hi|hey|good morning|good evening|good afternoon|வணக்கம்)\b/i.test(lower)) {
                return `Hello! I'm doing great, thank you for asking. I'm excited to practice English speaking with you today. What's on your mind right now?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "What's on your mind?" = நீங்கள் இப்போது என்ன யோசித்துக் கொண்டிருக்கிறீர்கள் / எதைப் பற்றி பேச விரும்புகிறீர்கள்?
- நீங்கள் இயல்பாகப் பேசலாம்: "I want to practice speaking" அல்லது "I had a busy day today."`;
            }

            // 8. Dynamic multi-turn fallbacks if no specific topic triggered
            const multiTurnFlows = [
                {
                    en: `That makes complete sense! You expressed your thought clearly. To practice more, could you describe what your typical morning routine looks like?`,
                    ta: `- "Makes complete sense" = நீங்கள் சொல்வது முற்றிலும் புரிகிறது / நியாயமாக உள்ளது.\n- "Morning routine" = காலையில் நீங்கள் செய்யும் வழக்கமான செயல்கள்.\n- முயற்சி செய்யுங்கள்: "I wake up at 6 AM, drink coffee, and read news."`
                },
                {
                    en: `I really enjoy talking with you! Your confidence is growing with every sentence. What is a goal you want to achieve this year?`,
                    ta: `- "Confidence is growing" = உங்கள் தன்னம்பிக்கை கூடிக்கொண்டே போகிறது!\n- "Goal to achieve" = இந்த வருடம் நீங்கள் அடைய நினைக்கும் இலக்கு.\n- பதில் கூறலாம்: "My goal is to speak fluent English in meetings."`
                },
                {
                    en: `Excellent effort! The secret to fluent English is regular conversation without worrying about making mistakes. Tell me, what kind of movies or series do you enjoy watching?`,
                    ta: `- "Regular conversation" = தொடர்ச்சியான உரையாடல்.\n- "Without worrying" = கவலைப்படாமல் / தயங்காமல்.\n- பதில் கூறலாம்: "I enjoy comedy and action movies."`
                }
            ];

            const selectedFlow = multiTurnFlows[historyCount % multiTurnFlows.length];
            return `${selectedFlow.en}\n\n💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):\n${selectedFlow.ta}`;
        }
    };

    // ==========================================
    // 6. SPEECH SYNTHESIS & RECOGNITION (TAMIL + ENGLISH)
    // ==========================================
    const voiceManager = {
        init() {
            voiceManager.loadVoices();
            if (state.synth.onvoiceschanged !== undefined) {
                state.synth.onvoiceschanged = voiceManager.loadVoices;
            }
            voiceManager.initSpeechRecognition();
        },

        loadVoices() {
            const allVoices = state.synth.getVoices();
            // Filter English voices
            state.voices = allVoices.filter(v => v.lang.startsWith('en'));
            if (state.voices.length === 0) state.voices = allVoices;

            if (dom.voiceSelect) {
                dom.voiceSelect.innerHTML = state.voices.map((v, i) =>
                    `<option value="${i}" ${v.name === state.selectedVoice ? 'selected' : ''}>${v.name} (${v.lang})</option>`
                ).join('');

                if (state.selectedVoice) {
                    const idx = state.voices.findIndex(v => v.name === state.selectedVoice);
                    if (idx >= 0) dom.voiceSelect.value = idx;
                }
            }
        },

        speakEnglish(text) {
            voiceManager.stopSpeech();
            // Clean text: strip Tamil characters and emojis
            const cleanEn = text
                .split('\n')
                .filter(line => !/[\u0B80-\u0BFF]/.test(line))
                .join(' ')
                .replace(/💡 தமிழ் விளக்கம்[\s\S]*$/, '')
                .replace(/[*#_`]/g, '')
                .trim();

            if (!cleanEn) return;

            const utt = new SpeechSynthesisUtterance(cleanEn);
            utt.rate = state.voiceRate;
            utt.pitch = state.voicePitch;

            const voiceIdx = parseInt(dom.voiceSelect?.value || '0', 10);
            if (state.voices[voiceIdx]) {
                utt.voice = state.voices[voiceIdx];
            }
            state.synth.speak(utt);
        },

        speakTamil(tamilText) {
            voiceManager.stopSpeech();
            if (!tamilText) return;

            // Clean text: strip Markdown, header tags, bullet points, asterisks
            let clean = tamilText
                .replace(/💡\s*தமிழ்\s*விளக்கம்[^\n]*/gi, '')
                .replace(/Tamil\s*(Meaning|Explanation)[^\n]*/gi, '')
                .replace(/[*#_`~]/g, '')
                .replace(/^[-•*]\s+/gm, '')
                .trim();

            if (!clean) return;

            // Extract sentences that have Tamil script
            const rawSentences = clean.split(/[.!?;:\n]+/).map(s => s.trim()).filter(Boolean);
            const tamilSentences = rawSentences.filter(s => /[\u0B80-\u0BFF]/.test(s));
            const sentencesToSpeak = tamilSentences.length > 0 ? tamilSentences : [clean];

            // Limit to first 3 clear sentences (max 180 chars each) for pleasant spoken delivery
            const queue = sentencesToSpeak.slice(0, 3).map(s => s.substring(0, 180));

            let queueIdx = 0;
            const playNext = () => {
                if (queueIdx >= queue.length) {
                    state.currentAudio = null;
                    return;
                }
                const chunk = queue[queueIdx++];
                const encoded = encodeURIComponent(chunk);
                const audioUrl = `/api/tts?lang=ta&text=${encoded}`;
                
                const audio = new Audio(audioUrl);
                state.currentAudio = audio;

                audio.onended = () => {
                    playNext();
                };

                audio.onerror = (e) => {
                    console.warn('API TTS failed, falling back to browser synthesis:', e);
                    voiceManager.speakTamilBrowserFallback(chunk);
                    playNext();
                };

                audio.play().catch(err => {
                    console.warn('Audio play blocked or failed:', err);
                    voiceManager.speakTamilBrowserFallback(chunk);
                });
            };

            playNext();
        },

        speakTamilBrowserFallback(cleanTa) {
            const allVoices = state.synth.getVoices();
            const taVoice = allVoices.find(v => v.lang.startsWith('ta'));
            const utt = new SpeechSynthesisUtterance(cleanTa);
            utt.lang = 'ta-IN';
            if (taVoice) {
                utt.voice = taVoice;
            }
            utt.rate = 0.9;
            utt.pitch = 1.0;
            state.synth.speak(utt);
        },

        stopSpeech() {
            state.synth.cancel();
            if (state.currentAudio) {
                state.currentAudio.pause();
                state.currentAudio.currentTime = 0;
                state.currentAudio = null;
            }
        },

        initSpeechRecognition() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                if (dom.micBtn) {
                    dom.micBtn.title = 'Speech recognition not supported in this browser';
                    dom.micBtn.style.opacity = '0.5';
                }
                return;
            }

            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = true;
            rec.lang = 'en-IN'; // Recognizes Indian English pronunciation best

            rec.onstart = () => {
                state.isRecording = true;
                dom.micBtn?.classList.add('recording');
                dom.recordingIndicator?.classList.remove('hidden');
            };

            rec.onresult = (e) => {
                let transcript = '';
                for (let i = e.resultIndex; i < e.results.length; i++) {
                    transcript += e.results[i][0].transcript;
                }
                if (dom.textInput) {
                    dom.textInput.value = transcript;
                    dom.sendBtn.disabled = !transcript.trim();
                }
            };

            rec.onend = () => {
                state.isRecording = false;
                dom.micBtn?.classList.remove('recording');
                dom.recordingIndicator?.classList.add('hidden');
                if (dom.textInput?.value.trim()) {
                    setTimeout(() => chatManager.sendMessage(), 200);
                }
            };

            rec.onerror = (e) => {
                state.isRecording = false;
                dom.micBtn?.classList.remove('recording');
                dom.recordingIndicator?.classList.add('hidden');
                console.warn('Speech Rec Error:', e.error);
            };

            state.recognition = rec;
        },

        toggleRecording() {
            if (!state.recognition) return;
            voiceManager.stopSpeech();
            if (state.isRecording) {
                state.recognition.stop();
            } else {
                dom.textInput.value = '';
                state.recognition.start();
            }
        }
    };

    // ==========================================
    // 7. CHAT & MESSAGING MANAGER
    // ==========================================
    const chatManager = {
        renderWelcome() {
            dom.chatMessages.innerHTML = `
                <div class="welcome-hero-card">
                    <img src="logo.png" alt="Queen Rat AI" class="welcome-avatar">
                    <h2>Queen Rat AI</h2>
                    <p class="welcome-subtitle">தமிழ் வழியில் Spoken English பேசும் தோழன்!</p>
                    <p class="welcome-tamil-desc">
                        ஆங்கிலத்தில் பேசுங்கள், தவறுகளைச் சரிசெய்து, புதிய வார்த்தைகளைத் தமிழில் விளக்கி உங்களைச் சரளமாகப் பேச வைப்பேன். 
                        கீழே உள்ள Mic அல்லது Text மூலம் இப்போதே பேசத் தொடங்குங்கள்!
                    </p>
                    <div class="feature-pills-row">
                        <span class="feature-pill">🎙️ Smart Voice Tutor</span>
                        <span class="feature-pill">🗣️ Tamil Explanation</span>
                        <span class="feature-pill">⏳ 12 Tenses Drills</span>
                        <span class="feature-pill">📖 Daily Words</span>
                    </div>
                </div>
            `;
        },

        addMessage(role, text) {
            state.messages.push({ role, text });

            // Remove welcome card if present
            const wc = dom.chatMessages.querySelector('.welcome-hero-card');
            if (wc) wc.remove();

            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${role}`;

            if (role === 'user') {
                msgDiv.innerHTML = `
                    <div class="msg-avatar">You</div>
                    <div class="msg-body">
                        <div class="msg-bubble">${chatManager.escapeHtml(text)}</div>
                    </div>
                `;
            } else {
                // Split into English reply & Tamil explanation card
                const parts = chatManager.parseAIResponse(text);

                msgDiv.innerHTML = `
                    <div class="msg-avatar"><img src="logo.png" alt="Queen Rat"></div>
                    <div class="msg-body">
                        <div class="msg-bubble">
                            <div class="msg-en-text">${chatManager.formatMarkdown(parts.english)}</div>
                            ${parts.tamil ? `
                                <div class="tamil-explain-card">
                                    <div class="tamil-explain-title">
                                        <span>💡 தமிழ் விளக்கம்</span>
                                    </div>
                                    <div class="tamil-content">${chatManager.formatMarkdown(parts.tamil)}</div>
                                </div>
                            ` : ''}
                        </div>
                        <div class="msg-actions">
                            <button class="msg-btn voice-en play-en-btn" title="Listen English">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                                🔊 English Voice
                            </button>
                            ${parts.tamil ? `
                                <button class="msg-btn voice-ta play-ta-btn" title="Listen Tamil Explanation">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                                    🗣️ தமிழ் குரல்
                                </button>
                            ` : ''}
                            <button class="msg-btn copy-btn" title="Copy text">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                Copy
                            </button>
                        </div>
                    </div>
                `;

                // Button listeners
                const playEn = msgDiv.querySelector('.play-en-btn');
                if (playEn) playEn.addEventListener('click', () => voiceManager.speakEnglish(parts.english));

                const playTa = msgDiv.querySelector('.play-ta-btn');
                if (playTa) playTa.addEventListener('click', () => voiceManager.speakTamil(parts.tamil));

                const copyBtn = msgDiv.querySelector('.copy-btn');
                if (copyBtn) {
                    copyBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText(text);
                        copyBtn.textContent = 'Copied!';
                        setTimeout(() => { copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy'; }, 2000);
                    });
                }
            }

            dom.chatMessages.appendChild(msgDiv);
            chatManager.scrollToBottom();
        },

        showTyping() {
            const typ = document.createElement('div');
            typ.id = 'typing-indicator-box';
            typ.className = 'message ai';
            typ.innerHTML = `
                <div class="msg-avatar"><img src="logo.png" alt="AI"></div>
                <div class="typing-bubble">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            `;
            dom.chatMessages.appendChild(typ);
            chatManager.scrollToBottom();
        },

        removeTyping() {
            const typ = document.getElementById('typing-indicator-box');
            if (typ) typ.remove();
        },

        async sendMessage() {
            const text = dom.textInput.value.trim();
            if (!text || state.isSending) return;

            state.isSending = true;
            dom.textInput.value = '';
            dom.sendBtn.disabled = true;
            chatManager.autoResizeInput();

            chatManager.addMessage('user', text);
            chatManager.showTyping();
            if (window.learningProgressManager) {
                learningProgressManager.recordChatMessage();
            }

            // If message is a single English word or "meaning of X", immediately display full definition!
            const singleWordMatch = text.match(/^(?:what is the meaning of |meaning of |define )?([a-zA-Z]{2,30})\??$/i);
            if (singleWordMatch) {
                const targetWord = singleWordMatch[1].toLowerCase();
                const dictEntry = wordsManager.getDictionaryEntry(targetWord);
                if (dictEntry) {
                    chatManager.removeTyping();
                    chatManager.addMessage('ai', `**Word:** ${dictEntry.word} (${dictEntry.pos || 'Word'})\n**Tamil Sound:** [${dictEntry.phonetic || ''}]\n**Example:** "${dictEntry.exampleEn}"\n\n💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):\n- **அர்த்தம்:** ${dictEntry.tamilMeaning}\n- **வாக்கிய விளக்கம்:** ${dictEntry.exampleTa || dictEntry.tamilMeaning}`);
                    if (state.autoSpeak) {
                        voiceManager.speakEnglish(`${dictEntry.word}. ${dictEntry.exampleEn}`);
                        // Only English auto-plays; Tamil voice plays on button click
                    }
                    state.isSending = false;
                    dom.sendBtn.disabled = !dom.textInput.value.trim();
                    dom.textInput.focus();
                    return;
                }
            }

            try {
                const reply = await aiEngine.generateReply(text);
                chatManager.removeTyping();
                chatManager.addMessage('ai', reply);

                if (state.autoSpeak) {
                    const parsed = chatManager.parseAIResponse(reply);
                    // ONLY English voice auto-plays; Tamil audio plays only when user clicks "🗣️ தமிழ் குரல்"
                    voiceManager.speakEnglish(parsed.english);
                }
            } catch (err) {
                chatManager.removeTyping();
                chatManager.addMessage('ai', `I am here with you! Let's continue practicing: "Can you tell me more about that in simple words?"\n\n💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):\n- "Let's continue" என்றால் "தொடர்ந்து பேசுவோம்" என்று அர்த்தம்.\n- தயங்காமல் பேசுங்கள்!`);
            }

            state.isSending = false;
            dom.sendBtn.disabled = !dom.textInput.value.trim();
            dom.textInput.focus();
        },

        parseAIResponse(text) {
            const tamilMarker = text.search(/(💡?\s*தமிழ்\s*விளக்கம்|Tamil\s*Explanation|Explanation\s*in\s*Tamil)/i);
            if (tamilMarker !== -1) {
                let tamilPart = text.substring(tamilMarker).trim();
                // Strip redundant header line so the card header doesn't duplicate it
                tamilPart = tamilPart.replace(/^💡?\s*தமிழ்\s*விளக்கம்[^\n]*\n?/i, '').trim();
                return {
                    english: text.substring(0, tamilMarker).trim(),
                    tamil: tamilPart
                };
            }
            return {
                english: text,
                tamil: ''
            };
        },

        formatMarkdown(text) {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
        },

        escapeHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },

        scrollToBottom() {
            dom.chatArea.scrollTo({ top: dom.chatArea.scrollHeight, behavior: 'smooth' });
        },

        autoResizeInput() {
            const el = dom.textInput;
            el.style.height = 'auto';
            el.style.height = Math.min(el.scrollHeight, 120) + 'px';
            dom.sendBtn.disabled = !el.value.trim();

            // LIVE WORD MEANING AS YOU TYPE!
            chatManager.checkLiveTypingMeaning(el.value);
        },

        checkLiveTypingMeaning(text) {
            if (!dom.typingMeaningBar) return;
            const clean = text.trim();
            if (!clean) {
                dom.typingMeaningBar.classList.add('hidden');
                return;
            }

            // Extract the word currently being typed (last word or whole word)
            const words = clean.split(/\s+/);
            const currentWord = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, '');

            if (currentWord.length < 2) {
                dom.typingMeaningBar.classList.add('hidden');
                return;
            }

            // Lookup in dictionary
            const match = wordsManager.getDictionaryEntry(currentWord);
            if (match) {
                dom.typingMeaningBar.classList.remove('hidden');
                dom.tmbWord.textContent = match.word;
                dom.tmbTamil.textContent = match.tamilMeaning;
                dom.tmbSound.textContent = match.phonetic ? `[${match.phonetic}]` : '';
                
                dom.tmbSpeakBtn.onclick = (e) => {
                    e.stopPropagation();
                    voiceManager.speakEnglish(match.word);
                };
            } else {
                dom.typingMeaningBar.classList.add('hidden');
            }
        }
    };

    // ==========================================
    // 8. TENSES MASTERY MANAGER
    // ==========================================
    const tensesManager = {
        renderTenses(filter = 'all') {
            const filtered = filter === 'all' 
                ? TENSES_DATA 
                : TENSES_DATA.filter(t => t.category === filter);

            dom.tensesGrid.innerHTML = filtered.map(t => `
                <div class="tense-card" data-tense-id="${t.id}">
                    <div class="tense-card-header">
                        <div class="tense-title-wrap">
                            <h3>${t.name}</h3>
                            <span class="tense-tamil-name">${t.tamilName}</span>
                        </div>
                        <span class="tense-category-badge badge-${t.category}">${t.category}</span>
                    </div>

                    <div class="tense-formula-box">
                        <span class="formula-label">Formula / சூத்திரம்:</span>
                        <div class="formula-text">${t.formula}</div>
                    </div>

                    <div class="tense-rule-tamil">
                        <strong>எப்போது பயன்படுத்த வேண்டும்:</strong> ${t.ruleTamil}
                    </div>

                    <div class="tense-examples-list">
                        ${t.examples.map(ex => `
                            <div class="tense-example-item">
                                <div class="example-content">
                                    <span class="example-en">${ex.en}</span>
                                    <span class="example-ta">${ex.ta}</span>
                                </div>
                                <button class="play-example-btn" data-en="${chatManager.escapeHtml(ex.en)}" title="Pronounce">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');

            // Attach play buttons
            dom.tensesGrid.querySelectorAll('.play-example-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    voiceManager.speakEnglish(btn.dataset.en);
                });
            });
        },

        currentQuiz: null,
        isFetchingQuiz: false,

        async fetchNewAITenseQuiz() {
            if (this.isFetchingQuiz) return;
            this.isFetchingQuiz = true;

            if (dom.nextTenseQuizBtn) dom.nextTenseQuizBtn.disabled = true;
            dom.tenseQuizFeedback.className = 'quiz-feedback-box hidden';
            dom.tenseQuizOptions.innerHTML = '';
            dom.tenseQuizQuestion.innerHTML = `
                <div class="quiz-loading-row">
                    <span class="loading-spinner-sm"></span>
                    <span>AI is crafting a brand new, non-repeating tense challenge...</span>
                </div>
            `;

            const attended = (window.learningProgressManager && learningProgressManager.stats.attendedTenseQuestions) || [];
            const recentExcludes = attended.slice(-6).map(q => `"${q.slice(0, 45)}..."`).join(', ');

            // Randomly select one of the 12 tenses to test
            const targetTense = TENSES_DATA[Math.floor(Math.random() * TENSES_DATA.length)];

            const prompt = `Generate 1 unique multiple-choice English grammar quiz question focusing on the tense "${targetTense.name}" (${targetTense.formula}) for Tamil speakers learning spoken English.
${recentExcludes ? `DO NOT repeat any of these recently answered questions: ${recentExcludes}.` : ''}
Make it a natural everyday spoken English sentence with a blank (e.g. "________").
Provide 4 plausible choices (with only 1 grammatically correct for "${targetTense.name}"), the 0-indexed correct option, and a crystal-clear explanation in Tamil explaining the rule and why the other options are wrong.
Respond ONLY as a valid JSON object formatted as:
{
  "tense": "${targetTense.name}",
  "question": "Sentence with blank...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0,
  "explanation": "Tamil explanation of why this answer is correct..."
}`;

            try {
                const res = await aiEngine.generateReply(prompt);
                let match = res.match(/\{[\s\S]*\}/);
                if (match) {
                    const quizObj = JSON.parse(match[0]);
                    if (quizObj.question && Array.isArray(quizObj.options) && quizObj.options.length === 4 && typeof quizObj.correct === 'number') {
                        if (!attended.includes(quizObj.question)) {
                            this.currentQuiz = quizObj;
                            this.renderActiveQuiz(quizObj);
                            this.isFetchingQuiz = false;
                            if (dom.nextTenseQuizBtn) dom.nextTenseQuizBtn.disabled = false;
                            return;
                        }
                    }
                }
            } catch (e) {
                console.warn('AI Tense Quiz generation notice:', e);
            }

            // Fallback: Dynamic algorithmic tense generator (NOT static hardcoded array, combines random subjects, realistic verbs & time markers)
            const dynamicQuiz = this.generateDynamicAlgorithmicQuiz(targetTense, attended);
            this.currentQuiz = dynamicQuiz;
            this.renderActiveQuiz(dynamicQuiz);
            this.isFetchingQuiz = false;
            if (dom.nextTenseQuizBtn) dom.nextTenseQuizBtn.disabled = false;
        },

        nextTenseQuiz() {
            tensesManager.fetchNewAITenseQuiz();
        },

        async generateAITenseDrill() {
            if (!dom.aiTenseDynamicBox) return;
            const activeFilter = state.currentTenseFilter || 'all';
            const pool = activeFilter === 'all' 
                ? TENSES_DATA 
                : TENSES_DATA.filter(t => t.category === activeFilter);
            const tense = pool[Math.floor(Math.random() * pool.length)];

            dom.aiTenseDynamicBox.classList.remove('hidden');
            dom.aiTenseBoxTitle.textContent = `✨ AI Spoken Practice: ${tense.name} (${tense.tamilName})`;
            dom.aiTenseResults.innerHTML = `
                <div style="text-align:center; padding:18px; color:var(--text-muted);">
                    <span class="typing-dot"></span> Generating 3 fresh real-life spoken sentences with AI...
                </div>
            `;

            try {
                const prompt = `Generate 3 fresh, practical, natural spoken English conversation sentences using "${tense.name}" (${tense.formula}).
For each sentence, include a natural Tamil translation.
Respond ONLY as a valid JSON array of objects with keys "en" and "ta":
[
  {"en": "Sentence 1", "ta": "Tamil translation 1"},
  {"en": "Sentence 2", "ta": "Tamil translation 2"},
  {"en": "Sentence 3", "ta": "Tamil translation 3"}
]`;
                const reply = await aiEngine.generateReply(prompt);
                let jsonMatch = reply.match(/\[\s*\{[\s\S]*\}\s*\]/);
                let sentences = [];
                if (jsonMatch) {
                    try {
                        sentences = JSON.parse(jsonMatch[0]);
                    } catch (e) {}
                }
                if (!sentences || sentences.length === 0) {
                    sentences = [
                        { en: `I always ${tense.category === 'past' ? 'checked' : 'check'} my emails before leaving the office.`, ta: "நான் அலுவலகத்தை விட்டுச் செல்லும் முன் எப்போதும் மின்னஞ்சல்களை சரிபார்க்கிறேன்." },
                        { en: `She is sharing the project update with her team right now.`, ta: "அவள் இப்போது தனது குழுவுடன் திட்டத்தின் விவரங்களைப் பகிர்ந்து கொண்டிருக்கிறாள்." },
                        { en: `We have prepared everything needed for tomorrow's meeting.`, ta: "நாளை நடைபெறும் கூட்டத்திற்குத் தேவையான அனைத்தையும் நாங்கள் தயார் செய்துள்ளோம்." }
                    ];
                }

                dom.aiTenseResults.innerHTML = sentences.map(item => `
                    <div class="ai-sentence-item">
                        <div class="ai-sentence-content">
                            <span class="ai-sentence-en">${chatManager.escapeHtml(item.en)}</span>
                            <span class="ai-sentence-ta">${chatManager.escapeHtml(item.ta)}</span>
                        </div>
                        <button class="msg-btn voice-en play-ai-tense-btn" data-en="${chatManager.escapeHtml(item.en)}" title="Listen Pronunciation">
                            🔊 Pronounce
                        </button>
                    </div>
                `).join('');

                dom.aiTenseResults.querySelectorAll('.play-ai-tense-btn').forEach(b => {
                    b.addEventListener('click', () => {
                        voiceManager.speakEnglish(b.dataset.en);
                    });
                });
            } catch (err) {
                dom.aiTenseResults.innerHTML = `<div style="color:var(--accent-rose); padding:10px;">Could not generate sentences right now. Please try again.</div>`;
            }
        },

        generateDynamicAlgorithmicQuiz(targetTense, attendedList) {
            const subjects = [
                { en: "Arun", pronoun: "he", type: "sing" },
                { en: "Priya", pronoun: "she", type: "sing" },
                { en: "The software engineers", pronoun: "they", type: "plur" },
                { en: "My uncle", pronoun: "he", type: "sing" },
                { en: "Kavitha and Deepa", pronoun: "they", type: "plur" },
                { en: "Our college team", pronoun: "it", type: "sing" },
                { en: "Suresh", pronoun: "he", type: "sing" },
                { en: "The passengers", pronoun: "they", type: "plur" },
                { en: "Dr. Karthik", pronoun: "he", type: "sing" },
                { en: "We", pronoun: "we", type: "plur" }
            ];
            const subj = subjects[Math.floor(Math.random() * subjects.length)];

            const templates = {
                'simple-present': {
                    question: `${subj.en} usually ________ (read) the daily news every morning.`,
                    options: [subj.type === 'sing' ? 'reads' : 'read', 'is reading', 'readed', 'will read'],
                    correct: 0,
                    explanation: `வழக்கமான தினசரி பழக்கவழக்கம் (Habitual action) என்பதால் Simple Present Tense ('${subj.type === 'sing' ? 'reads' : 'read'}') பயன்படும்.`
                },
                'present-continuous': {
                    question: `Look! ${subj.en} ________ (practice) spoken English right now.`,
                    options: [subj.type === 'sing' ? 'is practicing' : 'are practicing', 'practices', 'practiced', 'has practiced'],
                    correct: 0,
                    explanation: `இப்போது தற்போதைய தருணத்தில் தொடர்ந்து நிகழும் செயல் என்பதால் Present Continuous ('${subj.type === 'sing' ? 'is practicing' : 'are practicing'}') சரி.`
                },
                'present-perfect': {
                    question: `${subj.en} already ________ (complete) the quarterly project report.`,
                    options: [subj.type === 'sing' ? 'has completed' : 'have completed', 'completed', 'is completing', 'completes'],
                    correct: 0,
                    explanation: `சமீபத்தில் முடிவடைந்து அதன் தாக்கம் இப்போதும் இருப்பதால் Present Perfect Tense பயன்படும்.`
                },
                'present-perfect-continuous': {
                    question: `${subj.en} ________ (work) in this tech company since 2021.`,
                    options: [subj.type === 'sing' ? 'has been working' : 'have been working', 'is working', 'worked', 'was working'],
                    correct: 0,
                    explanation: `'since 2021' கடந்த காலத்தில் தொடங்கி இப்போதும் தொடர்ந்து நீடிப்பதால் Present Perfect Continuous சரி.`
                },
                'simple-past': {
                    question: `Yesterday evening, ${subj.en} ________ (meet) the senior manager at the office.`,
                    options: ['met', 'meets', 'has met', 'is meeting'],
                    correct: 0,
                    explanation: `'Yesterday' என்பது முடிவடைந்த கடந்த காலம், எனவே Simple Past Verb 'met' பயன்படுத்த வேண்டும்.`
                },
                'past-continuous': {
                    question: `At 7 PM yesterday, ${subj.en} ________ (travel) to Madurai by train.`,
                    options: [subj.type === 'sing' ? 'was traveling' : 'were traveling', 'traveled', 'is traveling', 'travels'],
                    correct: 0,
                    explanation: `கடந்த காலத்தில் ஒரு குறிப்பிட்ட நேரத்தில் நடந்து கொண்டிருந்த செயல் என்பதால் Past Continuous பயன்படும்.`
                },
                'past-perfect': {
                    question: `The flight ________ (take) off before ${subj.en} arrived at the airport gate.`,
                    options: ['had taken', 'took', 'has taken', 'takes'],
                    correct: 0,
                    explanation: `கடந்த காலத்தில் மற்றொரு செயலுக்கு முன்பே முற்றுப்பெற்ற முதல் செயலுக்கு Past Perfect ('had taken') வர வேண்டும்.`
                },
                'past-perfect-continuous': {
                    question: `Before moving to Chennai, ${subj.en} ________ (live) in Trichy for seven years.`,
                    options: ['had been living', 'was living', 'has been living', 'lived'],
                    correct: 0,
                    explanation: `கடந்த காலத்தில் மற்றொரு நிகழ்வு நடப்பதற்கு முன்புவரை தொடர்ந்து நிகழ்ந்ததால் Past Perfect Continuous சரி.`
                },
                'simple-future': {
                    question: `Don't worry! ${subj.en} ________ (help) you prepare for the interview tomorrow.`,
                    options: ['will help', 'helped', 'helps', 'helping'],
                    correct: 0,
                    explanation: `எதிர்காலத்தில் நடக்கப்போகும் உறுதிமொழிக்கு Simple Future ('will help') பயன்படுத்தப்படும்.`
                },
                'future-continuous': {
                    question: `Tomorrow at 10 AM, ${subj.en} ________ (attend) a client meeting.`,
                    options: ['will be attending', 'will attend', 'attends', 'attended'],
                    correct: 0,
                    explanation: `எதிர்காலத்தில் ஒரு குறிப்பிட்ட நேரத்தில் தொடர்ந்து நடைபெறும் செயலுக்கு Future Continuous ('will be attending') சரி.`
                },
                'future-perfect': {
                    question: `By next month, ${subj.en} ________ (finish) all 12 tenses exercises.`,
                    options: ['will have finished', 'will finish', 'finishes', 'finished'],
                    correct: 0,
                    explanation: `எதிர்காலத்தில் ஒரு குறிப்பிட்ட காலக்கெடுவுக்குள் முடிவடைந்திருக்கும் செயலுக்கு Future Perfect ('will have finished') பயன்படும்.`
                },
                'future-perfect-continuous': {
                    question: `By December, ${subj.en} ________ (study) spoken English for six full months.`,
                    options: ['will have been studying', 'will be studying', 'has been studying', 'will study'],
                    correct: 0,
                    explanation: `எதிர்காலக் குறிப்பிட்ட காலம் வரை தொடர்ந்து நீடிக்கப்போகும் செயலுக்கு Future Perfect Continuous சரி.`
                }
            };

            const tKey = targetTense.id || 'simple-present';
            const template = templates[tKey] || templates['simple-present'];

            const opts = [...template.options];
            const correctOpt = opts[0];
            opts.sort(() => 0.5 - Math.random());
            const correctIdx = opts.indexOf(correctOpt);

            return {
                tense: targetTense.name,
                question: template.question,
                options: opts,
                correct: correctIdx,
                explanation: template.explanation
            };
        },

        renderActiveQuiz(quiz) {
            dom.tenseQuizQuestion.textContent = quiz.question;
            dom.tenseQuizFeedback.className = 'quiz-feedback-box hidden';

            dom.tenseQuizOptions.innerHTML = quiz.options.map((opt, i) => `
                <button class="quiz-opt-btn" data-idx="${i}">
                    <strong>${['A', 'B', 'C', 'D'][i]}.</strong> ${opt}
                </button>
            `).join('');

            dom.tenseQuizOptions.querySelectorAll('.quiz-opt-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const selectedIdx = parseInt(btn.dataset.idx, 10);
                    const isCorrect = selectedIdx === quiz.correct;

                    dom.tenseQuizOptions.querySelectorAll('.quiz-opt-btn').forEach((b, idx) => {
                        b.disabled = true;
                        if (idx === quiz.correct) b.classList.add('correct');
                        if (idx === selectedIdx && !isCorrect) b.classList.add('incorrect');
                    });

                    dom.tenseQuizFeedback.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
                    dom.tenseQuizFeedback.innerHTML = `
                        <strong>${isCorrect ? '🎉 சரி! (Correct! +10 XP)' : '❌ தவறான விடை (Oops!)'}</strong><br>
                        ${quiz.explanation}
                    `;
                    dom.tenseQuizFeedback.classList.remove('hidden');

                    const cloudStatus = document.getElementById('quiz-cloud-save-status');
                    if (cloudStatus) {
                        cloudStatus.classList.remove('hidden');
                        setTimeout(() => cloudStatus.classList.add('hidden'), 3500);
                    }

                    // Record learning progress and save to Firebase Cloud DB
                    if (window.learningProgressManager) {
                        await learningProgressManager.recordTenseAnswer(quiz.question, isCorrect, quiz.tense);
                    }
                });
            });
        }
    };

    // ==========================================
    // 9. DAILY WORDS & VOCABULARY MANAGER
    // ==========================================
    const wordsManager = {
        renderWordOfDay() {
            // Pick an unseen word if available, otherwise generate fresh AI word
            const unseen = WORDS_DATA.filter(w => !state.seenWords.has(w.word.toLowerCase()));
            if (unseen.length > 0) {
                wordsManager.renderWordOfDayCard(unseen[0]);
            } else if (WORDS_DATA.length > 0) {
                wordsManager.renderWordOfDayCard(WORDS_DATA[0]);
            } else {
                wordsManager.generateAIWord();
            }
        },

        renderWordOfDayCard(wordObj) {
            dom.wordOfDayCard.innerHTML = `
                <div class="showcase-header">
                    <span class="showcase-badge">🌟 Daily Word (இன்றைய முக்கிய வார்த்தை)</span>
                    <span class="word-phonetic">${wordObj.phonetic || ''}</span>
                </div>
                <div class="word-main-row">
                    <h3 class="word-title">${wordObj.word}</h3>
                    <span class="word-pos">(${wordObj.pos || 'Word'})</span>
                </div>
                <div class="word-tamil-meaning-box">${wordObj.tamilMeaning}</div>
                <div class="word-example-box">
                    <div class="word-example-en">"${wordObj.exampleEn}"</div>
                    <div class="word-example-ta">${wordObj.exampleTa || ''}</div>
                </div>
                <div class="word-audio-actions">
                    <button class="msg-btn voice-en play-showcase-en">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        Listen Pronunciation
                    </button>
                    <button class="msg-btn voice-ta play-showcase-ta">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                        Listen Tamil Meaning
                    </button>
                </div>
            `;

            dom.wordOfDayCard.querySelector('.play-showcase-en')?.addEventListener('click', () => {
                voiceManager.speakEnglish(wordObj.word + '. ' + (wordObj.exampleEn || ''));
            });
            dom.wordOfDayCard.querySelector('.play-showcase-ta')?.addEventListener('click', () => {
                voiceManager.speakTamil(wordObj.tamilMeaning + '. ' + (wordObj.exampleTa || ''));
            });
        },

        dynamicWordPool: [
            { word: "Persevere", pos: "Verb", phonetic: "பெர்சிவியர்", tamilMeaning: "கடினமான சூழலிலும் தொடர்ந்து முயற்சி செய்", exampleEn: "You will speak fluent English if you persevere daily.", exampleTa: "நீங்கள் தினமும் தொடர்ந்து முயற்சி செய்தால் ஆங்கிலம் சரளமாகப் பேசுவீர்கள்.", cat: "daily" },
            { word: "Crucial", pos: "Adjective", phonetic: "க்ரூஷியல்", tamilMeaning: "மிக முக்கியமான / இன்றியமையாத", exampleEn: "Regular daily speaking practice is crucial for confidence.", exampleTa: "தன்னம்பிக்கை பெற வழக்கமான தினசரி பேச்சுப் பயிற்சி மிக முக்கியமானது.", cat: "daily" },
            { word: "Communicate", pos: "Verb", phonetic: "கம்யூனிகேட்", tamilMeaning: "தகவல் பரிமாறுதல் / கருத்துக்களைப் பகிர்தல்", exampleEn: "Practice speaking so you can communicate clearly at work.", exampleTa: "வேலையில் தெளிவாகப் பேசுவதற்குத் தொடர்ந்து பேசிப் பழகுங்கள்.", cat: "daily" },
            { word: "Discipline", pos: "Noun", phonetic: "டிசிப்ளின்", tamilMeaning: "சுய கட்டுப்பாடு / தினசரி ஒழுக்கம்", exampleEn: "Daily discipline is the secret to mastering spoken English.", exampleTa: "ஆங்கிலப் பேச்சில் தேர்ச்சி பெற தினசரி ஒழுக்கமே ரகசியம்.", cat: "daily" },
            { word: "Opportunity", pos: "Noun", phonetic: "ஆப்பர்சூனிட்டி", tamilMeaning: "நல்ல வாய்ப்பு / சந்தர்ப்பம்", exampleEn: "Never miss an opportunity to practice your English speaking.", exampleTa: "ஆங்கிலத்தில் பேசக் கிடைக்கும் எந்த வாய்ப்பையும் நழுவ விடாதீர்கள்.", cat: "daily" },
            { word: "Procrastinate", pos: "Verb", phonetic: "புரோக்ராஸ்டினேட்", tamilMeaning: "காரியங்களைத் தள்ளிப்போடுதல் / பிற்போடுதல்", exampleEn: "Do not procrastinate your spoken English lessons.", exampleTa: "உங்கள் ஆங்கிலப் பாடங்களைத் தள்ளிப் போடாதீர்கள்.", cat: "daily" },
            { word: "Accomplish", pos: "Verb", phonetic: "அக்காம்ப்ளிஷ்", tamilMeaning: "வெற்றிகரமாகச் செய்து முடித்தல்", exampleEn: "You can accomplish your dream of speaking fluent English.", exampleTa: "ஆங்கிலம் சரளமாகப் பேசும் உங்கள் கனவை நீங்கள் நிறைவேற்றலாம்.", cat: "daily" },
            { word: "Punctual", pos: "Adjective", phonetic: "பங்ச்சுவல்", tamilMeaning: "நேரந்தவறாமை / குறித்த நேரத்தில் வருதல்", exampleEn: "Being punctual shows professionalism and respect.", exampleTa: "நேரந்தவறாமல் இருப்பது உங்கள் பொறுப்புணர்வைக் காட்டுகிறது.", cat: "office" },
            { word: "Hesitate", pos: "Verb", phonetic: "ஹெசிடேட்", tamilMeaning: "தயங்குதல் / தயக்கம் காட்டுதல்", exampleEn: "Do not hesitate to ask questions in your meetings.", exampleTa: "கூட்டங்களில் கேள்விகள் கேட்கத் தயங்காதீர்கள்.", cat: "office" },
            { word: "Collaborate", pos: "Verb", phonetic: "கொலாபரேட்", tamilMeaning: "இணைந்து செயல்படுதல் / கூட்டுப்பணி", exampleEn: "Our team will collaborate with developers to launch the product.", exampleTa: "தயாரிப்பை வெளியிட எங்கள் குழு பொறியாளர்களுடன் இணைந்து செயல்படும்.", cat: "office" },
            { word: "Convenient", pos: "Adjective", phonetic: "கன்வீனியன்ட்", tamilMeaning: "வசதியான நேரம் / சுலபமான வழி", exampleEn: "Please let me know a convenient time for a quick phone call.", exampleTa: "அழைத்துப் பேச வசதியான நேரத்தைத் தெரிவியுங்கள்.", cat: "office" },
            { word: "Recommend", pos: "Verb", phonetic: "ரெக்கமண்ட்", tamilMeaning: "பரிந்துரைத்தல் / நல்லதென அறிவுறுத்துதல்", exampleEn: "Can you recommend an effective way to improve my accent?", exampleTa: "என் உச்சரிப்பை மேம்படுத்த ஒரு நல்ல வழியைப் பரிந்துரைக்க முடியுமா?", cat: "office" },
            { word: "Negotiate", pos: "Verb", phonetic: "நெகோஷியேட்", tamilMeaning: "பேசி உடன்பாடு செய்தல் / கலந்தாலோசித்தல்", exampleEn: "We negotiated a better project budget with the client.", exampleTa: "வாடிக்கையாளருடன் பேசி சிறந்த திட்ட பட்ஜெட்டை முடிவு செய்தோம்.", cat: "office" },
            { word: "Priority", pos: "Noun", phonetic: "பிரையாரிட்டி", tamilMeaning: "முன்னுரிமை / முக்கியமான பணி", exampleEn: "Customer satisfaction is always our top priority.", exampleTa: "வாடிக்கையாளர் திருப்தியே எங்களின் முதல் முன்னுரிமை.", cat: "office" },
            { word: "Deadline", pos: "Noun", phonetic: "டெட்லைன்", tamilMeaning: "குறிப்பிட்ட காலக்கெடு / கடைசி நேரம்", exampleEn: "We worked diligently to meet the client's deadline.", exampleTa: "வாடிக்கையாளரின் காலக்கெடுவை எட்ட நாங்கள் தீவிரமாக உழைத்தோம்.", cat: "office" },
            { word: "Feedback", pos: "Noun", phonetic: "ஃபீட்பேக்", tamilMeaning: "ஆக்கபூர்வமான கருத்து / பின்னூட்டம்", exampleEn: "Constructive feedback helps you correct your speech mistakes.", exampleTa: "ஆக்கபூர்வமான கருத்து உங்கள் பேச்சுத் தவறுகளைத் திருத்த உதவும்.", cat: "office" },
            { word: "Grateful", pos: "Adjective", phonetic: "கிரேட்ஃபுல்", tamilMeaning: "நன்றியுணர்வுடன் இருத்தல்", exampleEn: "I am grateful for all the support my colleagues provided.", exampleTa: "என் சகாக்கள் அளித்த ஆதரவிற்கு நான் மிக்க நன்றியுடையவனாக இருக்கிறேன்.", cat: "feelings" },
            { word: "Confident", pos: "Adjective", phonetic: "கான்ஃபிடன்ட்", tamilMeaning: "நம்பிக்கையான / தைரியமான மனநிலை", exampleEn: "Speak in a calm and confident voice during your interview.", exampleTa: "நேர்முகத் தேர்வின் போது அமைதியான நம்பிக்கையான குரலில் பேசுங்கள்.", cat: "feelings" },
            { word: "Resilience", pos: "Noun", phonetic: "ரெஸிலியன்ஸ்", tamilMeaning: "சவால்களைத் தாங்கி மீளும் மனவலிமை", exampleEn: "Her resilience helped her overcome every obstacle.", exampleTa: "அவளது மனவலிமை அனைத்துத் தடைகளையும் வெல்ல உதவியது.", cat: "feelings" },
            { word: "Curious", pos: "Adjective", phonetic: "க்யூரியஸ்", tamilMeaning: "புதிதாக அறிய விரும்பும் ஆர்வம்", exampleEn: "Be curious about new English words and idioms.", exampleTa: "புதிய ஆங்கில வார்த்தைகளைக் கற்றுக்கொள்வதில் ஆர்வமாக இருங்கள்.", cat: "feelings" },
            { word: "Enthusiastic", pos: "Adjective", phonetic: "என்துஸியாஸ்டிக்", tamilMeaning: "மிகுந்த உற்சாகம் மற்றும் ஊக்கம்", exampleEn: "She is very enthusiastic about learning spoken English.", exampleTa: "ஆங்கிலம் பேசுவதைக் கற்பதில் அவள் மிகுந்த உற்சாகத்துடன் இருக்கிறாள்.", cat: "feelings" },
            { word: "Fascinating", pos: "Adjective", phonetic: "ஃபாஸினேட்டிங்", tamilMeaning: "வியக்கத்தக்க சுவாரஸ்யமான", exampleEn: "Learning a new language is a fascinating experience.", exampleTa: "புதிய மொழியைக் கற்பது ஒரு வியக்கத்தக்க அனுபவமாகும்.", cat: "feelings" },
            { word: "Overwhelmed", pos: "Adjective", phonetic: "ஓவர்வெல்ம்டு", tamilMeaning: "அதிக வேலை அல்லது உணர்ச்சியால் திணறுதல்", exampleEn: "Take a deep breath whenever you feel overwhelmed.", exampleTa: "அதிக வேலைப்பளுவால் திணறும் போது ஆழ்ந்த மூச்செடுங்கள்.", cat: "feelings" },
            { word: "Exhausted", pos: "Adjective", phonetic: "எக்ஸாஸ்டெட்", tamilMeaning: "உடல் மிகவும் களைப்படைந்த நிலை", exampleEn: "I was completely exhausted after traveling all night.", exampleTa: "இரவு முழுவதும் பயணம் செய்த பிறகு நான் மிகவும் களைப்படைந்து விட்டேன்.", cat: "feelings" },
            { word: "Reluctant", pos: "Adjective", phonetic: "ரிலக்டன்ட்", tamilMeaning: "தயக்கம் காட்டும் / விருப்பமில்லாத", exampleEn: "He was reluctant to speak at first, but now speaks boldly.", exampleTa: "ஆரம்பத்தில் பேசத் தயங்கினாலும், இப்போது தைரியமாகப் பேசுகிறார்.", cat: "feelings" },
            { word: "Departure", pos: "Noun", phonetic: "டிபார்ச்சர்", tamilMeaning: "புறப்படுதல் / கிளம்பும் நேரம்", exampleEn: "Please arrive at the airport two hours before departure.", exampleTa: "விமானம் புறப்படுவதற்கு இரண்டு மணி நேரம் முன் விமான நிலையம் வாருங்கள்.", cat: "travel" },
            { word: "Accommodate", pos: "Verb", phonetic: "அக்காமடேட்", tamilMeaning: "இடமளித்தல் / தங்கும் சவுகரியம் தருதல்", exampleEn: "The hotel can accommodate all our traveling guests.", exampleTa: "பயணம் வந்திருக்கும் அனைத்து விருந்தினர்களுக்கும் விடுதியில் இடம் தரலாம்.", cat: "travel" },
            { word: "Affordable", pos: "Adjective", phonetic: "அஃபோர்டபிள்", tamilMeaning: "வாங்கக்கூடிய நியாயமான விலை", exampleEn: "This store offers high quality clothes at affordable prices.", exampleTa: "இந்தக் கடை தரமான ஆடைகளை நியாயமான விலையில் வழங்குகிறது.", cat: "travel" },
            { word: "Explore", pos: "Verb", phonetic: "எக்ஸ்ப்ளோர்", tamilMeaning: "புதிய இடங்களை ஆராய்ந்து பார்த்தல்", exampleEn: "We explored scenic coastal towns during our vacation.", exampleTa: "விடுமுறையின் போது அழகான கடற்கரை நகரங்களைச் சுற்றிப் பார்த்தோம்.", cat: "travel" },
            { word: "Destination", pos: "Noun", phonetic: "டெஸ்டினேஷன்", tamilMeaning: "சென்றடையும் இலக்கு / சேருமிடம்", exampleEn: "Ooty is a very popular vacation destination in South India.", exampleTa: "ஊட்டி தென்னிந்தியாவின் பிரபலமான சுற்றுலாத் தலமாகும்.", cat: "travel" },
            { word: "Itinerary", pos: "Noun", phonetic: "ஐட்டினரரி", tamilMeaning: "திட்டமிட்ட பயண விவரம்", exampleEn: "Here is the complete itinerary for our upcoming trip.", exampleTa: "எங்கள் பயணத்திற்கான முழுமையான திட்ட விவரம் இதோ.", cat: "travel" },
            { word: "Reservation", pos: "Noun", phonetic: "ரிசர்வேஷன்", tamilMeaning: "முன்பதிவு செய்தல்", exampleEn: "I have confirmed our train seat reservation for tomorrow.", exampleTa: "நாளைய ரயில் பயணத்திற்கான இருக்கை முன்பதிவை உறுதிசெய்துவிட்டேன்.", cat: "travel" }
        ],

        async generateAIWord() {
            dom.wordOfDayCard.innerHTML = `
                <div style="text-align:center; padding:28px 16px; color:var(--text-muted);">
                    <span class="typing-dot"></span> Selecting a brand new spoken English word with Tamil explanation...
                </div>
            `;

            const excluded = Array.from(state.seenWords).slice(-40).join(', ');
            const prompt = `Generate 1 unique, practical spoken English word that every Tamil speaker should know for fluent conversation.
Do NOT use any of these already learned words: [${excluded}].
Respond ONLY as a valid JSON object formatted as:
{
  "word": "Resilient",
  "pos": "Adjective",
  "phonetic": "ரி-ஸிலியன்ட்",
  "tamilMeaning": "சவால்களைத் தாங்கி மீண்டும் மீண்டு எழக்கூடிய மன உறுதி",
  "exampleEn": "She remained resilient despite facing many difficulties.",
  "exampleTa": "பல இன்னல்களை எதிர்கொண்ட போதிலும் அவள் மன உறுதியோடு இருந்தாள்.",
  "cat": "daily"
}`;

            let newWord = null;

            try {
                const aiPromise = aiEngine.generateReply(prompt);
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('AI timeout')), 6000));
                const reply = await Promise.race([aiPromise, timeoutPromise]);

                let match = reply.match(/\{[\s\S]*\}/);
                if (match) {
                    newWord = JSON.parse(match[0]);
                }
            } catch (err) {
                console.warn('AI word single generation notice, using dynamic pool:', err.message);
            }

            if (!newWord || !newWord.word) {
                const unseen = this.dynamicWordPool.filter(w => !state.seenWords.has(w.word.toLowerCase()));
                if (unseen.length > 0) {
                    newWord = unseen[Math.floor(Math.random() * unseen.length)];
                } else {
                    newWord = this.dynamicWordPool[Math.floor(Math.random() * this.dynamicWordPool.length)];
                }
            }

            state.seenWords.add(newWord.word.toLowerCase());
            localStorage.setItem('sw_seen_words', JSON.stringify(Array.from(state.seenWords)));
            if (window.authManager) {
                authManager.saveUserProgress({ seenWordsCount: state.seenWords.size });
            }

            const existingIdx = WORDS_DATA.findIndex(w => w.word.toLowerCase() === newWord.word.toLowerCase());
            if (existingIdx >= 0) WORDS_DATA.splice(existingIdx, 1);
            WORDS_DATA.unshift({ ...newWord, cat: newWord.cat || 'daily' });

            wordsManager.renderWordOfDayCard(newWord);
            wordsManager.renderWordsList(state.currentVocabCat);
        },

        async generateBatchWords(count = 5) {
            if (!dom.aiGenerateBatchWordsBtn) return;
            dom.aiGenerateBatchWordsBtn.disabled = true;
            dom.aiGenerateBatchWordsBtn.textContent = 'Generating 5 words...';

            const excluded = Array.from(state.seenWords).slice(-50).join(', ');
            const prompt = `Generate ${count} essential spoken English words for Tamil speakers with phonetic sound, Tamil meaning, and real conversational example.
Do NOT repeat any of: [${excluded}].
Respond ONLY as a valid JSON array of objects:
[
  {
    "word": "Persevere",
    "pos": "Verb",
    "phonetic": "பெர்-ஸி-வியர்",
    "tamilMeaning": "கடினமான சூழ்நிலையிலும் தளராமல் தொடர்ந்து முயற்சி செய்தல்",
    "exampleEn": "If you persevere every day, your English will become fluent.",
    "exampleTa": "நீங்கள் தினமும் தொடர்ந்து முயற்சி செய்தால் உங்கள் ஆங்கிலம் சரளமாகும்.",
    "cat": "daily"
  }
]`;

            let batch = null;

            // Step 1: Try AI generation with a clean 6-second race timeout
            try {
                const aiPromise = aiEngine.generateReply(prompt);
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('AI timeout')), 6000));
                const reply = await Promise.race([aiPromise, timeoutPromise]);

                let match = reply.match(/\[\s*\{[\s\S]*\}\s*\]/);
                if (match) {
                    const parsed = JSON.parse(match[0]);
                    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].word) {
                        batch = parsed;
                    }
                }
            } catch (e) {
                console.warn('Batch words online AI notice, using dynamic generator fallback:', e.message);
            }

            // Step 2: If AI timed out or returned non-JSON, pick 5 unseen words from dynamic pool
            if (!batch || batch.length === 0) {
                const unseen = this.dynamicWordPool.filter(w => !state.seenWords.has(w.word.toLowerCase()));
                const pool = unseen.length >= count ? unseen : this.dynamicWordPool;
                const shuffled = [...pool].sort(() => 0.5 - Math.random());
                batch = shuffled.slice(0, count);
            }

            // Step 3: Insert batch into WORDS_DATA & update UI
            batch.forEach(w => {
                state.seenWords.add(w.word.toLowerCase());
                const exIdx = WORDS_DATA.findIndex(x => x.word.toLowerCase() === w.word.toLowerCase());
                if (exIdx >= 0) WORDS_DATA.splice(exIdx, 1);
                WORDS_DATA.unshift({ ...w, cat: w.cat || 'daily' });
            });

            localStorage.setItem('sw_seen_words', JSON.stringify(Array.from(state.seenWords)));
            if (window.authManager) {
                authManager.saveUserProgress({ seenWordsCount: state.seenWords.size });
            }

            // Render updated word list and showcase card
            wordsManager.renderWordsList(state.currentVocabCat);
            wordsManager.renderWordOfDayCard(batch[0]);

            // Flash button with success message
            dom.aiGenerateBatchWordsBtn.disabled = false;
            dom.aiGenerateBatchWordsBtn.textContent = '✅ 5 New Words Added!';
            setTimeout(() => {
                dom.aiGenerateBatchWordsBtn.textContent = '📚 Generate 5 New Words';
            }, 1800);
        },

        async generateAIVocabQuiz() {
            if (!dom.vocabQuizCard) return;
            dom.vocabQuizCard.innerHTML = `<div style="text-align:center; padding:18px; color:#fff;">Generating brand new AI Vocab Challenge...</div>`;
            const prompt = `Generate 1 English vocabulary multiple choice question testing the Tamil meaning of a high-value English word.
Respond ONLY as JSON:
{
  "word": "Diligent",
  "pos": "Adjective",
  "correctMeaning": "கடின உழைப்பு மற்றும் கவனத்துடன் செயல்படும் தன்மை",
  "distractors": ["சோம்பேறித்தனமாக இருப்பது", "அவசரமாக முடிவெடுப்பது", "பிறரை ஏமாற்றுவது"],
  "exampleEn": "She is a diligent student who practices English daily.",
  "exampleTa": "அவள் தினமும் ஆங்கிலம் பழகும் கடின உழைப்புமிக்க மாணவி."
}`;

            try {
                const res = await aiEngine.generateReply(prompt);
                let match = res.match(/\{[\s\S]*\}/);
                if (match) {
                    const quizData = JSON.parse(match[0]);
                    wordsManager.renderCustomVocabQuiz(quizData);
                    return;
                }
                wordsManager.renderVocabQuiz();
            } catch (e) {
                wordsManager.renderVocabQuiz();
            }
        },

        renderCustomVocabQuiz(q) {
            if (!dom.vocabQuizCard) return;
            const options = [...q.distractors, q.correctMeaning].sort(() => 0.5 - Math.random());
            dom.vocabQuizCard.innerHTML = `
                <div class="quiz-q-row">
                    <span style="font-size: 1.1rem; font-weight:700; color:#fff;">Word: "${q.word}" (${q.pos || 'Word'})</span>
                    <button class="play-example-btn quiz-sound-btn" title="Hear Word">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                </div>
                <div class="quiz-options-grid" id="vocab-opts-grid">
                    ${options.map(opt => `
                        <button class="quiz-opt-btn" data-meaning="${chatManager.escapeHtml(opt)}">${opt}</button>
                    `).join('')}
                </div>
                <div id="vocab-feedback-box" class="quiz-feedback-box hidden"></div>
            `;

            dom.vocabQuizCard.querySelector('.quiz-sound-btn')?.addEventListener('click', () => {
                voiceManager.speakEnglish(q.word);
            });

            dom.vocabQuizCard.querySelectorAll('.quiz-opt-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const isCorrect = btn.dataset.meaning === q.correctMeaning;
                    if (isCorrect) {
                        state.vocabScore += 10;
                        localStorage.setItem('sw_vocab_score', state.vocabScore);
                        dom.vocabScoreBadge.textContent = `Score: ${state.vocabScore}`;
                        if (window.authManager) {
                            authManager.saveUserProgress({ vocabScore: state.vocabScore });
                        }
                    }
                    if (window.learningProgressManager) {
                        learningProgressManager.recordVocabAnswer(q.word, isCorrect);
                    }

                    dom.vocabQuizCard.querySelectorAll('.quiz-opt-btn').forEach(b => {
                        b.disabled = true;
                        if (b.dataset.meaning === q.correctMeaning) b.classList.add('correct');
                        if (b === btn && !isCorrect) b.classList.add('incorrect');
                    });

                    const fb = dom.vocabQuizCard.querySelector('#vocab-feedback-box');
                    fb.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
                    fb.innerHTML = `
                        <strong>${isCorrect ? '🎉 மிகச் சரி! (+10 pts)' : '❌ தவறான பதில்'}</strong><br>
                        "${q.word}" என்பதன் தமிழ் அர்த்தம்: <strong>${q.correctMeaning}</strong><br>
                        <em>உதாரணம்: ${q.exampleEn} (${q.exampleTa || ''})</em>
                    `;
                    fb.classList.remove('hidden');
                });
            });
        },

        renderWordsList(cat = 'all', searchQuery = '') {
            let filtered = cat === 'all'
                ? WORDS_DATA
                : WORDS_DATA.filter(w => w.cat === cat);

            if (searchQuery) {
                const sq = searchQuery.toLowerCase().trim();
                filtered = filtered.filter(w => 
                    w.word.toLowerCase().includes(sq) || 
                    w.tamilMeaning.includes(sq) ||
                    (w.phonetic && w.phonetic.includes(sq))
                );
            }

            if (filtered.length === 0) {
                dom.wordsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align:center; padding: 40px 20px; color: var(--text-muted); background: rgba(255,255,255,0.02); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg);">
                        <span style="font-size: 2rem; display:block; margin-bottom: 8px;">✨</span>
                        <h4 style="color: var(--text-main); font-size: 1.05rem; margin-bottom: 6px;">Live AI Spoken Vocabulary</h4>
                        <p style="font-size: 0.88rem; max-width: 440px; margin: 0 auto 16px; line-height: 1.5;">
                            No repetitive hardcoded words! Tap <strong>"🎲 Generate Next Word"</strong> or <strong>"📚 Generate 5 New Words"</strong> above, or search any English word to learn its Tamil meaning & voice.
                        </p>
                    </div>
                `;
                return;
            }

            dom.wordsGrid.innerHTML = filtered.map(w => `
                <div class="word-item-card" data-word="${chatManager.escapeHtml(w.word)}">
                    <div class="word-card-top">
                        <span class="card-en-word">${w.word}</span>
                        <span class="card-tamil-sound">[${w.phonetic || ''}]</span>
                    </div>
                    <div class="card-tamil-meaning">${w.tamilMeaning}</div>
                    <div class="card-sample-sentence">"${w.exampleEn}"</div>
                    <div class="card-audio-row">
                        <button class="msg-btn voice-en play-w-en" data-w="${w.word}" data-ex="${chatManager.escapeHtml(w.exampleEn)}">
                            🔊 Speak
                        </button>
                        <button class="msg-btn voice-ta play-w-ta" data-ta="${chatManager.escapeHtml(w.tamilMeaning)}">
                            🗣️ தமிழ்
                        </button>
                    </div>
                </div>
            `).join('');

            dom.wordsGrid.querySelectorAll('.play-w-en').forEach(btn => {
                btn.addEventListener('click', () => {
                    voiceManager.speakEnglish(btn.dataset.w + '. ' + btn.dataset.ex);
                });
            });
            dom.wordsGrid.querySelectorAll('.play-w-ta').forEach(btn => {
                btn.addEventListener('click', () => {
                    voiceManager.speakTamil(btn.dataset.ta);
                });
            });
        },

        renderVocabQuiz() {
            if (!dom.vocabQuizCard) return;
            if (WORDS_DATA.length < 4) {
                wordsManager.renderCustomVocabQuiz({
                    word: "Persevere",
                    pos: "Verb",
                    correctMeaning: "தொடர்ந்து முயற்சி செய் / விடாமுயற்சி காட்டு",
                    distractors: ["பயந்து ஓடுதல்", "மன்னிப்பு கேட்டல்", "சோம்பேறியாக இருப்பது"],
                    exampleEn: "You must persevere to speak English fluently.",
                    exampleTa: "ஆங்கிலம் சரளமாகப் பேச நீங்கள் தொடர்ந்து முயற்சி செய்ய வேண்டும்."
                });
                return;
            }
            const currentWord = WORDS_DATA[state.currentVocabQuizIdx % WORDS_DATA.length];
            const otherWords = WORDS_DATA.filter(w => w.word !== currentWord.word);
            
            // Generate 3 distractors
            const shuffled = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
            const options = [...shuffled.map(s => s.tamilMeaning), currentWord.tamilMeaning].sort(() => 0.5 - Math.random());

            dom.vocabQuizCard.innerHTML = `
                <div class="quiz-q-row">
                    <span style="font-size: 1.1rem; font-weight:700; color:#fff;">Word: "${currentWord.word}"</span>
                    <button class="play-example-btn quiz-sound-btn" title="Hear Word">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                </div>
                <div class="quiz-options-grid" id="vocab-opts-grid">
                    ${options.map(opt => `
                        <button class="quiz-opt-btn" data-meaning="${chatManager.escapeHtml(opt)}">${opt}</button>
                    `).join('')}
                </div>
                <div id="vocab-feedback-box" class="quiz-feedback-box hidden"></div>
            `;

            dom.vocabQuizCard.querySelector('.quiz-sound-btn').addEventListener('click', () => {
                voiceManager.speakEnglish(currentWord.word);
            });

            dom.vocabQuizCard.querySelectorAll('.quiz-opt-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const isCorrect = btn.dataset.meaning === currentWord.tamilMeaning;
                    
                    dom.vocabQuizCard.querySelectorAll('.quiz-opt-btn').forEach(b => {
                        b.disabled = true;
                        if (b.dataset.meaning === currentWord.tamilMeaning) b.classList.add('correct');
                        if (b === btn && !isCorrect) b.classList.add('incorrect');
                    });

                    if (isCorrect) {
                        state.vocabScore += 10;
                        localStorage.setItem('sw_vocab_score', state.vocabScore);
                        dom.vocabScoreBadge.textContent = `Score: ${state.vocabScore}`;
                    }
                    if (window.learningProgressManager) {
                        learningProgressManager.recordVocabAnswer(currentWord.word, isCorrect);
                    }

                    const fb = $('#vocab-feedback-box');
                    fb.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
                    fb.innerHTML = `
                        <strong>${isCorrect ? '🎉 மிகச் சரி! (+10 pts)' : '❌ தவறான பதில்'}</strong><br>
                        "${currentWord.word}" என்பதன் தமிழ் அர்த்தம்: <strong>${currentWord.tamilMeaning}</strong><br>
                        <em>உதாரணம்: ${currentWord.exampleEn} (${currentWord.exampleTa})</em>
                    `;
                    fb.classList.remove('hidden');

                    setTimeout(() => {
                        state.currentVocabQuizIdx++;
                        wordsManager.renderVocabQuiz();
                    }, 3500);
                });
            });
        },

        renderResult(wordObj, isCustom = false) {
            if (!dom.wordLookupResult) return;
            dom.wordLookupResult.classList.remove('hidden');
            dom.wordLookupResult.innerHTML = `
                <div class="lookup-word-heading">
                    <div class="lookup-title-row">
                        <span class="lookup-word-name">${chatManager.escapeHtml(wordObj.word)}</span>
                        ${wordObj.pos ? `<span class="lookup-pos-tag">(${wordObj.pos})</span>` : ''}
                        ${wordObj.phonetic ? `<span class="lookup-phonetic-tag">[${wordObj.phonetic}]</span>` : ''}
                    </div>
                    ${isCustom ? `<button id="btn-save-custom-word" class="btn-save-word">➕ Add to Daily Words</button>` : ''}
                </div>
                <div class="lookup-tamil-meaning-text">${chatManager.escapeHtml(wordObj.tamilMeaning)}</div>
                ${wordObj.exampleEn ? `
                    <div class="lookup-sentence-box">
                        <div class="lookup-sentence-en">"${chatManager.escapeHtml(wordObj.exampleEn)}"</div>
                        ${wordObj.exampleTa ? `<div class="lookup-sentence-ta">${chatManager.escapeHtml(wordObj.exampleTa)}</div>` : ''}
                    </div>
                ` : ''}
                <div class="lookup-actions-row">
                    <button class="msg-btn voice-en play-lookup-en">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        🔊 Listen Pronunciation
                    </button>
                    <button class="msg-btn voice-ta play-lookup-ta">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                        🗣️ Listen Tamil Meaning
                    </button>
                </div>
            `;

            dom.wordLookupResult.querySelector('.play-lookup-en')?.addEventListener('click', () => {
                voiceManager.speakEnglish(wordObj.word + (wordObj.exampleEn ? '. ' + wordObj.exampleEn : ''));
            });
            dom.wordLookupResult.querySelector('.play-lookup-ta')?.addEventListener('click', () => {
                voiceManager.speakTamil(wordObj.tamilMeaning + (wordObj.exampleTa ? '. ' + wordObj.exampleTa : ''));
            });

            const saveBtn = dom.wordLookupResult.querySelector('#btn-save-custom-word');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    wordsManager.saveCustomWord(wordObj);
                    saveBtn.textContent = '✅ Saved to Daily Words!';
                    saveBtn.disabled = true;
                });
            }
        },

        getDictionaryEntry(query) {
            if (!query) return null;
            const clean = query.trim().toLowerCase();

            // 1. Direct match in WORDS_DATA
            const inWordsData = WORDS_DATA.find(w => w.word.toLowerCase() === clean);
            if (inWordsData) return inWordsData;

            // 2. Direct match in EVERYDAY_DICT
            if (EVERYDAY_DICT[clean]) {
                const item = EVERYDAY_DICT[clean];
                return {
                    word: clean.charAt(0).toUpperCase() + clean.slice(1),
                    pos: item.pos || 'Word',
                    phonetic: item.sound || clean,
                    tamilMeaning: item.tamil,
                    exampleEn: item.ex,
                    exampleTa: item.taEx,
                    cat: 'daily'
                };
            }

            // 3. Exact prefix match in WORDS_DATA if query is >= 3 chars
            if (clean.length >= 3) {
                const prefixWords = WORDS_DATA.find(w => w.word.toLowerCase().startsWith(clean));
                if (prefixWords) return prefixWords;
            }

            // 4. Exact prefix match in EVERYDAY_DICT if query is >= 3 chars
            if (clean.length >= 3) {
                const dictKey = Object.keys(EVERYDAY_DICT).find(k => k.startsWith(clean));
                if (dictKey) {
                    const item = EVERYDAY_DICT[dictKey];
                    return {
                        word: dictKey.charAt(0).toUpperCase() + dictKey.slice(1),
                        pos: item.pos || 'Word',
                        phonetic: item.sound || dictKey,
                        tamilMeaning: item.tamil,
                        exampleEn: item.ex,
                        exampleTa: item.taEx,
                        cat: 'daily'
                    };
                }
            }

            return null;
        },

        async lookupWord(query) {
            const clean = query.trim();
            if (!clean) return;

            // 1. Direct local search in WORDS_DATA & EVERYDAY_DICT
            const existing = wordsManager.getDictionaryEntry(clean);
            if (existing) {
                wordsManager.renderResult(existing, false);
                return;
            }

            // 2. Fetch via Free AI
            dom.wordLookupResult.classList.remove('hidden');
            dom.wordLookupResult.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px; color:var(--text-muted); font-size:0.9rem; padding: 6px 0;">
                    <span class="typing-dot"></span>
                    <span>Finding Tamil meaning for <strong>"${chatManager.escapeHtml(clean)}"</strong>...</span>
                </div>
            `;

            try {
                const prompt = `Give the Tamil meaning, Tamil phonetic pronunciation in Tamil script, part of speech, and 1 practical spoken English sentence with Tamil translation for the English word: "${clean}".
Respond ONLY in this valid JSON format:
{"word":"${clean}","pos":"Noun/Verb/Adjective","phonetic":"Tamil pronunciation in Tamil script","tamilMeaning":"Tamil meaning in Tamil script","exampleEn":"English sentence","exampleTa":"Tamil translation of sentence"}`;

                const rawRes = await aiEngine.generateReply(prompt);
                
                let parsed = null;
                const jsonMatch = rawRes.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        parsed = JSON.parse(jsonMatch[0]);
                    } catch (e) {}
                }

                if (!parsed || !parsed.tamilMeaning) {
                    const tamilExtracted = rawRes.replace(/\{[\s\S]*\}/, '').trim() || 'தமிழ் விளக்கம் கண்டறியப்பட்டது';
                    parsed = {
                        word: clean,
                        pos: 'Word',
                        phonetic: clean,
                        tamilMeaning: tamilExtracted,
                        exampleEn: `We often use "${clean}" in daily conversations.`,
                        exampleTa: `நாம் அன்றாடப் பேச்சில் "${clean}" வார்த்தையைப் பயன்படுத்துகிறோம்.`
                    };
                }

                wordsManager.renderResult(parsed, true);
            } catch (err) {
                dom.wordLookupResult.innerHTML = `
                    <div style="color:var(--accent-rose); font-size:0.88rem;">
                        ⚠️ Could not load online meaning. Please check your network or try another common word.
                    </div>
                `;
            }
        },

        saveCustomWord(wordObj) {
            if (!WORDS_DATA.some(w => w.word.toLowerCase() === wordObj.word.toLowerCase())) {
                const wordWithCat = { ...wordObj, cat: 'daily' };
                WORDS_DATA.unshift(wordWithCat);
                try {
                    const saved = JSON.parse(localStorage.getItem('sw_custom_words') || '[]');
                    saved.unshift(wordWithCat);
                    localStorage.setItem('sw_custom_words', JSON.stringify(saved));
                } catch (e) {}
                wordsManager.renderWordsList(state.currentVocabCat);
            }
        },

        initWordSearch() {
            if (!dom.wordSearchInput) return;

            dom.wordSearchInput.addEventListener('input', () => {
                const val = dom.wordSearchInput.value.trim();
                if (dom.wordClearBtn) dom.wordClearBtn.classList.toggle('hidden', !val);
                
                // Live filter grid as user types
                wordsManager.renderWordsList(state.currentVocabCat, val);

                // If exact or strong match in database, show meaning card instantly
                if (val.length >= 2) {
                    const entry = wordsManager.getDictionaryEntry(val);
                    if (entry) {
                        wordsManager.renderResult(entry, false);
                    } else {
                        dom.wordLookupResult.classList.remove('hidden');
                        dom.wordLookupResult.innerHTML = `
                            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem; color:var(--text-muted); flex-wrap:wrap; gap:8px;">
                                <span>No local match for <strong>"${chatManager.escapeHtml(val)}"</strong>. Look up online?</span>
                                <button id="btn-quick-lookup-ai" class="btn-secondary-sm">Find Tamil Meaning ↗</button>
                            </div>
                        `;
                        dom.wordLookupResult.querySelector('#btn-quick-lookup-ai')?.addEventListener('click', () => {
                            wordsManager.lookupWord(val);
                        });
                    }
                } else {
                    dom.wordLookupResult.classList.add('hidden');
                }
            });

            dom.wordSearchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    wordsManager.lookupWord(dom.wordSearchInput.value);
                }
            });

            if (dom.wordSearchBtn) {
                dom.wordSearchBtn.addEventListener('click', () => {
                    wordsManager.lookupWord(dom.wordSearchInput.value);
                });
            }

            if (dom.wordClearBtn) {
                dom.wordClearBtn.addEventListener('click', () => {
                    dom.wordSearchInput.value = '';
                    dom.wordClearBtn.classList.add('hidden');
                    dom.wordLookupResult.classList.add('hidden');
                    wordsManager.renderWordsList(state.currentVocabCat);
                    dom.wordSearchInput.focus();
                });
            }
        }
    };

    // ==========================================
    // 10. ROLEPLAY SCENARIOS
    // ==========================================
    const roleplayManager = {
        scenarioNames: {
            'job-interview': 'Job Interview (வேலை நேர்முகத் தேர்வு)',
            'restaurant': 'Restaurant & Food Ordering (உணவகம் & உணவு ஆர்டர்)',
            'travel': 'Airport & Travel (விமான நிலையம் & பயணம்)',
            'doctor': 'Doctor Consultation (மருத்துவ ஆலோசனை)',
            'shopping': 'Shopping & Bargaining (ஷாப்பிங் & விலை பேசுதல்)',
            'casual-chat': 'Making New Friends (புதிய நண்பர்களுடன் உரையாடல்)'
        },

        async startScenario(scenarioKey) {
            const title = this.scenarioNames[scenarioKey] || 'English Conversation';
            tabManager.switchTab('chat');
            chatManager.showTyping();

            const prompt = `Start a realistic conversational English roleplay simulation for the scenario: "${title}".
You play the counterpart role (e.g., job interviewer, restaurant waiter, airport staff, doctor, shopkeeper, or new friend).
Speak 2 natural, engaging conversational sentences in English to start the dialogue and ask a realistic question.
Then provide a clear, encouraging Tamil section with header "💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):" explaining what you said in Tamil and suggesting how the user can respond in English.`;

            try {
                const reply = await aiEngine.generateReply(prompt);
                chatManager.removeTyping();
                chatManager.addMessage('ai', reply);
                if (state.autoSpeak) {
                    const parsed = chatManager.parseAIResponse(reply);
                    voiceManager.speakEnglish(parsed.english);
                }
            } catch (err) {
                chatManager.removeTyping();
                chatManager.addMessage('ai', `Hello! Welcome to our **${title}** practice.\n\nCould you tell me a little about yourself or what you need today?\n\n💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):\n- உங்கள் பதிலை ஆங்கிலத்தில் கூறிப் பழகுங்கள்!`);
            }
        }
    };

    // ==========================================
    // 10.5. READING PRACTICE & PRONUNCIATION TEST STUDIO (BIG SENTENCES & AI ENGINE)
    // ==========================================
    const readingManager = {
        cache: {},

        init() {
            readingManager.loadPassage(state.readingTopic, state.readingDifficulty);

            dom.readingTopicChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    dom.readingTopicChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    state.readingTopic = chip.dataset.topic;
                    readingManager.loadPassage(state.readingTopic, state.readingDifficulty);
                });
            });

            dom.readingDiffPills.forEach(pill => {
                pill.addEventListener('click', () => {
                    dom.readingDiffPills.forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                    state.readingDifficulty = pill.dataset.rdiff;
                    readingManager.loadPassage(state.readingTopic, state.readingDifficulty);
                });
            });

            if (dom.readingLengthPills) {
                dom.readingLengthPills.forEach(pill => {
                    pill.addEventListener('click', () => {
                        dom.readingLengthPills.forEach(p => p.classList.remove('active'));
                        pill.classList.add('active');
                        state.readingLength = pill.dataset.rlength;
                        readingManager.loadPassage(state.readingTopic, state.readingDifficulty);
                    });
                });
            }

            if (dom.aiGenerateReadingBtn) {
                dom.aiGenerateReadingBtn.addEventListener('click', () => {
                    readingManager.generateAIStory();
                });
            }

            if (dom.readerSpeakEnBtn) {
                dom.readerSpeakEnBtn.addEventListener('click', () => {
                    if (state.readingPassage) {
                        voiceManager.speakEnglish(state.readingPassage.en);
                    }
                });
            }

            if (dom.readerRecordBtn) {
                dom.readerRecordBtn.addEventListener('click', () => {
                    readingManager.toggleSpeechTest();
                });
            }

            if (dom.readerTamilToggle) {
                dom.readerTamilToggle.addEventListener('click', () => {
                    const isHidden = dom.readerTamilContent.classList.contains('hidden');
                    dom.readerTamilContent.classList.toggle('hidden', !isHidden);
                    dom.readerTamilArrow.textContent = isHidden ? '▲' : '▼';
                });
            }
        },

        loadPassage(topic, diff) {
            const lengthMode = state.readingLength || 'big';
            const cacheKey = `${topic}_${diff}_${lengthMode}`;
            if (readingManager.cache[cacheKey]) {
                state.readingPassage = readingManager.cache[cacheKey];
                readingManager.renderPassage(state.readingPassage);
            } else {
                readingManager.generateAIStory();
            }
        },

        renderPassage(passage) {
            if (!dom.readerTitle) return;
            dom.readerTitle.textContent = passage.title;
            dom.readerBadge.textContent = passage.badge;
            dom.readerEst.textContent = passage.est;
            dom.readerTamilContent.textContent = passage.ta;
            dom.readerFeedbackCard.classList.add('hidden');

            const words = passage.en.split(/\s+/);
            dom.readerPassageBox.innerHTML = words.map(w => {
                const clean = w.replace(/[^a-zA-Z]/g, '');
                return `<span class="clickable-word" data-word="${chatManager.escapeHtml(clean)}">${chatManager.escapeHtml(w)}</span>`;
            }).join(' ');

            dom.readerPassageBox.querySelectorAll('.clickable-word').forEach(span => {
                span.addEventListener('click', () => {
                    const word = span.dataset.word;
                    voiceManager.speakEnglish(word);
                    const dict = wordsManager.getDictionaryEntry(word);
                    if (dict) {
                        span.title = `${dict.word}: ${dict.tamilMeaning}`;
                        span.classList.add('active-spoken');
                        setTimeout(() => span.classList.remove('active-spoken'), 1200);
                    }
                });
            });
        },

        async generateAIStory() {
            const lengthMode = state.readingLength || 'big';
            const cacheKey = `${state.readingTopic}_${state.readingDifficulty}_${lengthMode}`;

            if (dom.readerPassageBox) {
                dom.readerPassageBox.innerHTML = `
                    <div style="text-align:center; padding: 36px 16px; color: var(--text-muted);">
                        <span class="loading-spinner-sm"></span>
                        <p style="margin-top:12px; font-size:1rem; color:var(--text-main);">AI is crafting a brand new reading passage for <strong>"${state.readingTopic}"</strong>...</p>
                        <small style="color:var(--text-muted);">Generating English passage with instant Tamil translation...</small>
                    </div>
                `;
            }

            if (dom.aiGenerateReadingBtn) {
                dom.aiGenerateReadingBtn.disabled = true;
                dom.aiGenerateReadingBtn.textContent = 'Generating AI Passage...';
            }

            const isBig = lengthMode === 'big';

            const prompt = `Write an engaging English reading practice story or passage on topic "${state.readingTopic}" with difficulty level "${state.readingDifficulty}".
Mode: ${isBig ? 'BIG SENTENCES & COMPREHENSIVE PARAGRAPH' : 'SHORT SENTENCES'}.
${isBig 
  ? 'CRITICAL REQUIREMENT: Generate 4 to 6 substantial, rich, well-crafted BIG sentences (25 to 40 words per individual sentence) connected naturally with transition words (such as furthermore, consequently, while, although, not only... but also). Total Length: 125 to 180 words. DO NOT write short sentences.' 
  : 'Generate 3 to 4 short, simple, easy-to-read sentences (40 to 60 words total).'}
Ensure natural everyday spoken English suitable for Tamil speakers practicing fluency and pronunciation.
Provide a complete, natural, accurate Tamil translation for the entire passage.
Respond ONLY as a valid JSON object formatted as:
{
  "title": "Story Title",
  "badge": "${state.readingDifficulty === 'advanced' ? '🚀 Advanced' : state.readingDifficulty === 'intermediate' ? '📚 Intermediate' : '🌱 Beginner'} · ${isBig ? '📜 Big Sentences' : '🌱 Short'}",
  "est": "⏱️ ~2 min read · Click any word for Tamil meaning",
  "en": "English passage text...",
  "ta": "முழுமையான தமிழ் மொழிபெயர்ப்பு..."
}`;

            try {
                const res = await aiEngine.generateReply(prompt);
                let match = res.match(/\{[\s\S]*\}/);
                if (match) {
                    const passageObj = JSON.parse(match[0]);
                    if (passageObj.en && passageObj.ta) {
                        state.readingPassage = passageObj;
                        readingManager.cache[cacheKey] = passageObj;
                        readingManager.renderPassage(passageObj);
                        return;
                    }
                }
            } catch (err) {
                console.warn('AI Story gen error:', err);
            } finally {
                dom.aiGenerateReadingBtn.disabled = false;
                dom.aiGenerateReadingBtn.textContent = '✨ AI Generate Big Story (AI கதை உருவாக்குக)';
            }
        },

        toggleSpeechTest() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
                return;
            }

            if (state.isReadingRecording) {
                if (state.readingRec) state.readingRec.stop();
                return;
            }

            voiceManager.stopSpeech();
            const rec = new SpeechRecognition();
            rec.lang = 'en-US';
            rec.continuous = true;
            rec.interimResults = true;

            state.isReadingRecording = true;
            dom.readerRecordBtn.classList.add('recording');
            dom.readerRecordText.textContent = '⏹️ Stop Reading & Evaluate (நிறுத்தி மதிப்பிடவும்)';
            dom.readerRecStatus.classList.remove('hidden');

            let spokenTranscript = '';

            rec.onresult = (e) => {
                spokenTranscript = '';
                for (let i = 0; i < e.results.length; i++) {
                    spokenTranscript += e.results[i][0].transcript + ' ';
                }
            };

            rec.onend = () => {
                state.isReadingRecording = false;
                dom.readerRecordBtn.classList.remove('recording');
                dom.readerRecordText.textContent = '🎙️ Read Aloud & Test Speech (படித்துப் பேசிப் பார்க்க)';
                dom.readerRecStatus.classList.add('hidden');
                readingManager.evaluateReading(spokenTranscript.trim());
            };

            rec.onerror = (e) => {
                state.isReadingRecording = false;
                dom.readerRecordBtn.classList.remove('recording');
                dom.readerRecordText.textContent = '🎙️ Read Aloud & Test Speech (படித்துப் பேசிப் பார்க்க)';
                dom.readerRecStatus.classList.add('hidden');
                console.warn('Reading rec error:', e.error);
            };

            state.readingRec = rec;
            rec.start();
        },

        evaluateReading(spokenText) {
            if (!spokenText || !state.readingPassage) return;

            const targetWords = state.readingPassage.en.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);
            const spokenWords = spokenText.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);

            let matchedCount = 0;
            const spokenSet = new Set(spokenWords);

            const spans = dom.readerPassageBox.querySelectorAll('.clickable-word');
            spans.forEach(span => {
                const wordClean = span.dataset.word.toLowerCase();
                if (spokenSet.has(wordClean)) {
                    span.className = 'clickable-word correct-word';
                    matchedCount++;
                } else {
                    span.className = 'clickable-word missed-word';
                }
            });

            const accuracy = Math.min(100, Math.round((matchedCount / targetWords.length) * 100));

            dom.readerFeedbackCard.classList.remove('hidden');
            dom.readerScoreVal.textContent = `${accuracy}%`;

            if (accuracy >= 80) {
                dom.readerFeedbackTitle.textContent = "Outstanding Pronunciation! 🎉";
                dom.readerFeedbackTa.textContent = `அற்புதம்! ${accuracy}% துல்லியமாக வாசித்துள்ளீர்கள். உங்கள் ஆங்கில உச்சரிப்பு மிக அருமையாக உள்ளது!`;
                state.vocabScore += 25;
            } else if (accuracy >= 50) {
                dom.readerFeedbackTitle.textContent = "Good Reading Effort! 👍";
                dom.readerFeedbackTa.textContent = `நல்ல முயற்சி! ${accuracy}% துல்லியமாக உள்ளது. சிவப்பு நிறத்தில் உள்ள வார்த்தைகளை '🔊 Listen English' மூலம் கேட்டு மீண்டும் முயலுங்கள்.`;
                state.vocabScore += 10;
            } else {
                dom.readerFeedbackTitle.textContent = "Keep Practicing! 🌱";
                dom.readerFeedbackTa.textContent = `தொடர்ந்து பழகுங்கள். ஒவ்வொரு வார்த்தையையும் அழுத்தி அதன் உச்சரிப்பைக் கேட்டுப் பேசிப் பாருங்கள்.`;
                state.vocabScore += 5;
            }

            localStorage.setItem('sw_vocab_score', state.vocabScore);
            dom.vocabScoreBadge.textContent = `Score: ${state.vocabScore}`;
            if (window.authManager) {
                authManager.saveUserProgress({
                    vocabScore: state.vocabScore,
                    lastReadingScore: accuracy
                });
            }
            if (window.learningProgressManager) {
                learningProgressManager.recordReadingTest(accuracy);
            }

            dom.readerSpokenComparison.innerHTML = `<strong>You spoke:</strong> "${chatManager.escapeHtml(spokenText)}"`;
        }
    };

    // ==========================================
    // 10.6. FIREBASE AUTH & USER PROFILE UI
    // ==========================================
    const authManagerUI = {
        init() {
            if (window.authManager) {
                authManager.init();
                authManager.onAuthStateChanged(user => {
                    authManagerUI.renderAuthState(user);
                });
            }

            const loginTriggers = [
                dom.gateGoogleLoginBtn,
                dom.sidebarGoogleLoginBtn,
                dom.topbarLoginBtn,
                dom.settingsGoogleLoginBtn
            ];
            loginTriggers.forEach(btn => {
                if (btn) {
                    btn.addEventListener('click', async () => {
                        authManagerUI.handleGoogleLogin();
                    });
                }
            });

            const logoutTriggers = [
                dom.userLogoutBtn,
                dom.settingsLogoutBtn
            ];
            logoutTriggers.forEach(btn => {
                if (btn) {
                    btn.addEventListener('click', async () => {
                        document.documentElement.classList.remove('user-cached-logged-in');
                        if (window.authManager) {
                            await authManager.signOut();
                        }
                    });
                }
            });

            if (dom.topbarProfileBadge) {
                dom.topbarProfileBadge.addEventListener('click', () => {
                    tabManager.switchTab('settings');
                });
            }

            if (dom.toggleFirebaseKeysBtn) {
                dom.toggleFirebaseKeysBtn.addEventListener('click', () => {
                    dom.firebaseKeysContainer.classList.toggle('hidden');
                });
            }

            if (dom.saveFirebaseConfigBtn) {
                dom.saveFirebaseConfigBtn.addEventListener('click', () => {
                    const newConfig = {
                        apiKey: dom.fbApiKey.value.trim(),
                        authDomain: dom.fbAuthDomain.value.trim(),
                        projectId: dom.fbProjectId.value.trim(),
                        storageBucket: dom.fbStorageBucket.value.trim(),
                        appId: dom.fbAppId.value.trim()
                    };
                    if (window.authManager) {
                        authManager.saveConfig(newConfig);
                        dom.firebaseSaveMsg.classList.remove('hidden');
                        setTimeout(() => dom.firebaseSaveMsg.classList.add('hidden'), 3000);
                        dom.firebaseStatusPill.textContent = 'Firebase Saved';
                    }
                });
            }

            if (window.authManager) {
                const cfg = authManager.getConfig();
                if (dom.fbApiKey) dom.fbApiKey.value = cfg.apiKey || '';
                if (dom.fbAuthDomain) dom.fbAuthDomain.value = cfg.authDomain || '';
                if (dom.fbProjectId) dom.fbProjectId.value = cfg.projectId || '';
                if (dom.fbStorageBucket) dom.fbStorageBucket.value = cfg.storageBucket || '';
                if (dom.fbAppId) dom.fbAppId.value = cfg.appId || '';
            }
        },

        async handleGoogleLogin() {
            if (dom.gateStatusMsg) dom.gateStatusMsg.classList.add('hidden');
            if (dom.gateGoogleLoginBtn) {
                dom.gateGoogleLoginBtn.disabled = true;
                dom.gateGoogleLoginBtn.style.opacity = '0.7';
            }

            try {
                if (!window.authManager || !authManager.isConfigured()) {
                    tabManager.switchTab('settings');
                    dom.firebaseKeysContainer.classList.remove('hidden');
                    dom.firebaseKeysContainer.scrollIntoView({ behavior: 'smooth' });
                    throw new Error('To enable Google Login, please save your Firebase project configuration.');
                }
                await authManager.signInWithGoogle();
            } catch (err) {
                console.error('Google Sign-in error:', err);
                let msg = err.message || 'Error connecting to Google.';
                const currentHost = window.location.hostname;

                if (err.message === 'IN_APP_BROWSER') {
                    msg = `⚠️ <strong>In-App Browser Detected</strong><br>
                    Google blocks login inside apps like WhatsApp or Instagram.<br><br>
                    <strong>Easy Fix:</strong> Tap the <strong>⋮ (3 dots)</strong> at the top-right and choose <strong>"Open in Chrome"</strong> or <strong>"Open in Safari"</strong>.`;
                } else if (err.code === 'auth/unauthorized-domain') {
                    msg = `⚠️ <strong>Domain Unauthorized in Firebase</strong><br>
                    Firebase is blocking logins from <code>${currentHost}</code>.<br><br>
                    <strong>Fix in 1 minute:</strong><br>
                    1. Open <a href="https://console.firebase.google.com" target="_blank" style="color:#fde047;text-decoration:underline;">Firebase Console</a> &gt; Select your project.<br>
                    2. Go to <strong>Authentication &gt; Settings &gt; Authorized domains</strong>.<br>
                    3. Click <strong>Add domain</strong> &amp; add <code>${currentHost}</code>.`;
                } else if (err.code === 'auth/popup-blocked') {
                    msg = 'Popup blocked! Please allow popups or tap again to use Google direct redirect.';
                } else if (err.code === 'auth/operation-not-allowed') {
                    msg = 'Google provider is not enabled in Firebase Console. Go to Authentication > Sign-in method > Google and enable it.';
                }

                if (dom.gateStatusMsg) {
                    dom.gateStatusMsg.innerHTML = msg;
                    dom.gateStatusMsg.classList.remove('hidden');
                } else {
                    alert('Google Sign-In Notice: ' + msg);
                }
            } finally {
                if (dom.gateGoogleLoginBtn) {
                    dom.gateGoogleLoginBtn.disabled = false;
                    dom.gateGoogleLoginBtn.style.opacity = '1';
                }
            }
        },

        renderAuthState(user) {
            state.user = user;
            const isLoggedIn = Boolean(user);

            // Synchronous anti-flicker class
            if (isLoggedIn) {
                document.documentElement.classList.add('user-cached-logged-in');
            } else {
                document.documentElement.classList.remove('user-cached-logged-in');
            }

            // Mandatory Auth Gate Lock
            if (dom.authGateModal) {
                dom.authGateModal.classList.toggle('gate-hidden', isLoggedIn);
            }
            if (dom.app) {
                dom.app.classList.toggle('auth-locked', !isLoggedIn);
            }
            if (dom.gateStatusMsg) {
                dom.gateStatusMsg.classList.add('hidden');
            }

            if (dom.userLoggedOut) dom.userLoggedOut.classList.toggle('hidden', isLoggedIn);
            if (dom.userLoggedIn) dom.userLoggedIn.classList.toggle('hidden', !isLoggedIn);

            if (dom.topbarLoginBtn) dom.topbarLoginBtn.classList.toggle('hidden', isLoggedIn);
            if (dom.topbarProfileBadge) dom.topbarProfileBadge.classList.toggle('hidden', !isLoggedIn);

            if (dom.settingsUserLoggedOut) dom.settingsUserLoggedOut.classList.toggle('hidden', isLoggedIn);
            if (dom.settingsUserLoggedIn) dom.settingsUserLoggedIn.classList.toggle('hidden', !isLoggedIn);

            if (user) {
                const name = user.displayName || 'Learner';
                const email = user.email || '';
                const photo = user.photoURL || 'logo.png';

                if (dom.userDisplayName) dom.userDisplayName.textContent = name;
                if (dom.userEmailText) dom.userEmailText.textContent = email;
                if (dom.userAvatarImg) dom.userAvatarImg.src = photo;

                if (dom.topbarAvatarImg) dom.topbarAvatarImg.src = photo;

                if (dom.settingsUserName) dom.settingsUserName.textContent = name;
                if (dom.settingsUserEmail) dom.settingsUserEmail.textContent = email;
                if (dom.settingsUserAvatar) dom.settingsUserAvatar.src = photo;

                if (dom.firebaseStatusPill) dom.firebaseStatusPill.textContent = 'Account Connected';

                if (window.learningProgressManager) {
                    learningProgressManager.init();
                }
            }
        }
    };

    // ==========================================
    // 11. TAB & UI NAVIGATION
    // ==========================================
    const tabManager = {
        switchTab(tabId) {
            state.activeTab = tabId;

            // Nav links
            dom.navItems.forEach(n => n.classList.toggle('active', n.dataset.tab === tabId));
            dom.mobileNavBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));

            // Panes
            dom.tabPanes.forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));

            // Page Title
            const titles = {
                chat: 'Queen Rat AI',
                reading: 'Reading Practice Studio',
                tenses: 'Daily Tenses Mastery',
                words: 'Daily Vocabulary',
                roleplay: 'Roleplay Drills',
                settings: 'Voice & Learning Preferences'
            };
            const subtitles = {
                chat: 'Spoken English Tutor with Tamil Voice',
                reading: 'Read Aloud, Test Pronunciation & Instant Tamil Translation',
                tenses: '12 English Tenses with Tamil Rules & Audio',
                words: 'Words, Tamil Meaning, Pronunciation & Quizzes',
                roleplay: 'Practice Real Life English Scenarios',
                settings: 'Cloud Account, Voice Speed & Learning Level'
            };

            dom.pageTitle.textContent = titles[tabId] || 'Queen Rat AI';
            dom.pageSubtitle.textContent = subtitles[tabId] || '';

            // Chat Mode Pill visibility
            dom.chatModePill.style.display = tabId === 'chat' ? 'flex' : 'none';

            // Close mobile sidebar if open
            dom.sidebar.classList.remove('open');
            if (dom.sidebarOverlay) dom.sidebarOverlay.classList.remove('open');
        }
    };

    // ==========================================
    // 12. INITIALIZATION & EVENT LISTENERS
    // ==========================================
    function init() {
        window.tabManager = tabManager;
        // Tab switching
        dom.navItems.forEach(n => n.addEventListener('click', () => {
            tabManager.switchTab(n.dataset.tab);
            if (dom.sidebar) dom.sidebar.classList.remove('open');
            if (dom.sidebarOverlay) dom.sidebarOverlay.classList.remove('open');
        }));
        dom.mobileNavBtns.forEach(b => b.addEventListener('click', () => tabManager.switchTab(b.dataset.tab)));

        // Handle URL Hash navigation
        if (window.location.hash) {
            const initialTab = window.location.hash.replace('#', '');
            if (['chat', 'reading', 'tenses', 'words', 'roleplay', 'settings'].includes(initialTab)) {
                tabManager.switchTab(initialTab);
            }
        }
        window.addEventListener('hashchange', () => {
            const h = window.location.hash.replace('#', '');
            if (['chat', 'reading', 'tenses', 'words', 'roleplay', 'settings'].includes(h)) {
                tabManager.switchTab(h);
            }
        });

        // Mobile drawer with backdrop
        dom.menuToggle.addEventListener('click', () => {
            dom.sidebar.classList.toggle('open');
            if (dom.sidebarOverlay) dom.sidebarOverlay.classList.toggle('open', dom.sidebar.classList.contains('open'));
        });
        if (dom.sidebarOverlay) {
            dom.sidebarOverlay.addEventListener('click', () => {
                dom.sidebar.classList.remove('open');
                dom.sidebarOverlay.classList.remove('open');
            });
        }

        // Chat Mode Selector
        dom.modeChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const mode = chip.dataset.mode;
                state.mode = mode;
                dom.modeChips.forEach(c => {
                    c.classList.toggle('active', c.dataset.mode === mode);
                });
            });
        });

        // Quick prompts
        dom.quickChips.forEach(chip => {
            chip.addEventListener('click', () => {
                dom.textInput.value = chip.dataset.prompt;
                chatManager.autoResizeInput();
                chatManager.sendMessage();
            });
        });

        // Input & Textarea
        dom.textInput.addEventListener('input', chatManager.autoResizeInput);
        dom.textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatManager.sendMessage();
            }
        });

        // Send & Mic
        dom.sendBtn.addEventListener('click', chatManager.sendMessage);
        dom.micBtn.addEventListener('click', voiceManager.toggleRecording);

        // Voice quick toggle
        dom.voiceQuickToggle.addEventListener('click', () => {
            state.autoSpeak = !state.autoSpeak;
            localStorage.setItem('sw_autoSpeak', state.autoSpeak);
            dom.voiceQuickToggle.classList.toggle('active', state.autoSpeak);
            if (!state.autoSpeak) voiceManager.stopSpeech();
        });

        // Settings button
        dom.settingsQuickBtn.addEventListener('click', () => tabManager.switchTab('settings'));

        // Clear chat
        dom.clearChatBtn.addEventListener('click', () => {
            state.messages = [];
            voiceManager.stopSpeech();
            chatManager.renderWelcome();
        });

        // Tenses Filter
        dom.tensesFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dom.tensesFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentTenseFilter = btn.dataset.filter;
                tensesManager.renderTenses(state.currentTenseFilter);
            });
        });
        dom.nextTenseQuizBtn.addEventListener('click', tensesManager.nextTenseQuiz);

        // Vocab Category Filter
        dom.vocabCatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dom.vocabCatBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentVocabCat = btn.dataset.cat;
                wordsManager.renderWordsList(state.currentVocabCat);
            });
        });

        // Roleplay Cards
        dom.roleplayCards.forEach(card => {
            card.addEventListener('click', () => {
                roleplayManager.startScenario(card.dataset.scenario);
            });
        });

        // Settings Listeners
        if (dom.aiProviderSelect) {
            dom.aiProviderSelect.value = state.aiProvider;
            dom.aiProviderSelect.addEventListener('change', () => {
                state.aiProvider = dom.aiProviderSelect.value;
                localStorage.setItem('sw_ai_provider', state.aiProvider);
                if (dom.groqKeyContainer) {
                    dom.groqKeyContainer.classList.toggle('hidden', state.aiProvider !== 'groq');
                }
                if (dom.sidebarProviderLabel) {
                    dom.sidebarProviderLabel.textContent = state.aiProvider === 'groq' ? 'Groq Cloud Active' : '';
                }
            });
        }

        if (dom.groqApiKey) {
            dom.groqApiKey.value = state.groqKey;
            dom.groqApiKey.addEventListener('input', () => {
                state.groqKey = dom.groqApiKey.value.trim();
                localStorage.setItem('sw_groq_key', state.groqKey);
            });
        }

        dom.speedSlider.value = state.voiceRate;
        dom.speedVal.textContent = state.voiceRate.toFixed(1) + 'x';
        dom.speedSlider.addEventListener('input', () => {
            state.voiceRate = parseFloat(dom.speedSlider.value);
            dom.speedVal.textContent = state.voiceRate.toFixed(1) + 'x';
            localStorage.setItem('sw_voiceRate', state.voiceRate);
        });

        dom.pitchSlider.value = state.voicePitch;
        dom.pitchVal.textContent = state.voicePitch.toFixed(1);
        dom.pitchSlider.addEventListener('input', () => {
            state.voicePitch = parseFloat(dom.pitchSlider.value);
            dom.pitchVal.textContent = state.voicePitch.toFixed(1);
            localStorage.setItem('sw_voicePitch', state.voicePitch);
        });

        dom.autoSpeakCb.checked = state.autoSpeak;
        dom.autoSpeakCb.addEventListener('change', () => {
            state.autoSpeak = dom.autoSpeakCb.checked;
            localStorage.setItem('sw_autoSpeak', state.autoSpeak);
            dom.voiceQuickToggle.classList.toggle('active', state.autoSpeak);
        });

        dom.diffBtns.forEach(btn => {
            if (btn.dataset.diff === state.difficulty) btn.classList.add('active');
            btn.addEventListener('click', () => {
                dom.diffBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.difficulty = btn.dataset.diff;
                localStorage.setItem('sw_difficulty', state.difficulty);
            });
        });

        dom.resetDefaultsBtn.addEventListener('click', () => {
            if (confirm('Reset all saved settings and clear conversation?')) {
                localStorage.clear();
                window.location.reload();
            }
        });

        // Theme listeners
        themeManager.applyTheme(state.theme);
        if (dom.themeToggleBtn) {
            dom.themeToggleBtn.addEventListener('click', themeManager.toggle);
        }
        if (dom.themeChoiceBtns) {
            dom.themeChoiceBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    themeManager.applyTheme(btn.dataset.themeChoice);
                });
            });
        }

        // AI Tenses Generator buttons
        if (dom.aiGenerateTenseBtn) {
            dom.aiGenerateTenseBtn.addEventListener('click', () => tensesManager.generateAITenseDrill());
        }
        if (dom.aiTenseQuizBtn) {
            dom.aiTenseQuizBtn.addEventListener('click', () => tensesManager.fetchNewAITenseQuiz());
        }
        if (dom.aiTenseCloseBtn) {
            dom.aiTenseCloseBtn.addEventListener('click', () => {
                if (dom.aiTenseDynamicBox) dom.aiTenseDynamicBox.classList.add('hidden');
            });
        }

        // AI Words Generator buttons
        if (dom.aiGenerateSingleWordBtn) {
            dom.aiGenerateSingleWordBtn.addEventListener('click', () => wordsManager.generateAIWord());
        }
        if (dom.aiGenerateBatchWordsBtn) {
            dom.aiGenerateBatchWordsBtn.addEventListener('click', () => wordsManager.generateBatchWords(5));
        }
        if (dom.aiVocabQuizBtn) {
            dom.aiVocabQuizBtn.addEventListener('click', () => wordsManager.generateAIVocabQuiz());
        }

        // Initialize sub-systems
        voiceManager.init();
        chatManager.renderWelcome();
        tensesManager.renderTenses('all');
        tensesManager.fetchNewAITenseQuiz();
        wordsManager.renderWordOfDay();
        wordsManager.renderWordsList('all');
        if (dom.vocabQuizCard) wordsManager.renderVocabQuiz();
        wordsManager.initWordSearch();
        readingManager.init();
        authManagerUI.init();
        learningProgressManager.init();
        if (dom.vocabScoreBadge) dom.vocabScoreBadge.textContent = `Score: ${state.vocabScore}`;
    }

    // Start App
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
