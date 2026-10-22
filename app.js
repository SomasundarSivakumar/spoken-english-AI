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

    // Interactive Tense Quizzes
    const TENSE_QUIZZES = [
        {
            question: 'Fill in the blank: "Right now, Suresh ________ (watch) a cricket match."',
            options: ['watches', 'is watching', 'watched', 'has watched'],
            correct: 1,
            explanation: 'நிகழ்வில் இப்போது நடந்து கொண்டிருக்கும் செயல் என்பதால் Present Continuous Tense ("is watching") வர வேண்டும்.'
        },
        {
            question: 'Fill in the blank: "She ________ (work) in TCS since 2022."',
            options: ['is working', 'has been working', 'worked', 'will work'],
            correct: 1,
            explanation: '"since 2022" கடந்த காலத்தில் தொடங்கி இப்போதும் தொடர்வதால் Present Perfect Continuous ("has been working") சரி.'
        },
        {
            question: 'Fill in the blank: "I ________ (meet) the doctor yesterday afternoon."',
            options: ['meet', 'met', 'have met', 'was meeting'],
            correct: 1,
            explanation: '"yesterday" என்பது முடிவடைந்த கடந்த காலம், எனவே Simple Past Verb "met" பயன்படுத்த வேண்டும்.'
        },
        {
            question: 'Fill in the blank: "Don\'t worry! I ________ (help) you with your spoken English."',
            options: ['will help', 'helped', 'have helped', 'helping'],
            correct: 0,
            explanation: 'எதிர்கால உறுதிமொழி அல்லது வாக்குறுதிக்கு Simple Future ("will help") பயன்படும்.'
        },
        {
            question: 'Fill in the blank: "The train ________ (leave) before we reached the platform."',
            options: ['leaves', 'had left', 'has left', 'leaving'],
            correct: 1,
            explanation: 'கடந்த காலத்தில் மற்றொரு செயலுக்கு முன்பே முடிந்துவிட்டதால் Past Perfect ("had left") வர வேண்டும்.'
        }
    ];

    // ==========================================
    // 2. DATA: DAILY ENGLISH WORDS & TAMIL MEANING
    // ==========================================
    const WORDS_DATA = [
        {
            word: 'Persevere',
            pos: 'Verb',
            phonetic: 'பெர்சிவியர்',
            tamilMeaning: 'தொடர்ந்து முயற்சி செய் / விடாமுயற்சி காட்டு',
            exampleEn: 'Even when English speaking feels hard, you must persevere.',
            exampleTa: 'ஆங்கிலம் பேசுவது கடினமாகத் தோன்றினாலும், நீங்கள் தொடர்ந்து முயற்சி செய்ய வேண்டும்.',
            cat: 'daily'
        },
        {
            word: 'Hesitate',
            pos: 'Verb',
            phonetic: 'ஹெசிடேட்',
            tamilMeaning: 'தயங்குதல் / தயக்கம் காட்டுதல்',
            exampleEn: 'Do not hesitate to ask questions in the meeting.',
            exampleTa: 'கூட்டத்தில் கேள்விகள் கேட்கத் தயங்காதீர்கள்.',
            cat: 'office'
        },
        {
            word: 'Grateful',
            pos: 'Adjective',
            phonetic: 'கிரேட்ஃபுல்',
            tamilMeaning: 'நன்றியுணர்வுடன் இருத்தல்',
            exampleEn: 'I am really grateful for your valuable support.',
            exampleTa: 'உங்கள் மதிப்புமிக்க ஆதரவிற்கு நான் மிகவும் நன்றியுள்ளவனாக இருக்கிறேன்.',
            cat: 'feelings'
        },
        {
            word: 'Accommodate',
            pos: 'Verb',
            phonetic: 'அக்காமடேட்',
            tamilMeaning: 'இடமளித்தல் / சவுகரியம் செய்து தருதல்',
            exampleEn: 'Can the hotel accommodate five guests in one room?',
            exampleTa: 'ஹோட்டலில் ஒரே அறையில் ஐந்து விருந்தினர்களுக்கு இடமளிக்க முடியுமா?',
            cat: 'travel'
        },
        {
            word: 'Confident',
            pos: 'Adjective',
            phonetic: 'கான்ஃபிடன்ட்',
            tamilMeaning: 'நம்பிக்கையான / தைரியமான',
            exampleEn: 'Speak English in a confident voice without fear of mistakes.',
            exampleTa: 'தவறுகளைப் பற்றிக் கவலைப்படாமல் நம்பிக்கையான குரலில் ஆங்கிலம் பேசுங்கள்.',
            cat: 'daily'
        },
        {
            word: 'Convenient',
            pos: 'Adjective',
            phonetic: 'கன்வீனியன்ட்',
            tamilMeaning: 'வசதியான / சுலபமான நேரம் அல்லது வழி',
            exampleEn: 'What time is convenient for you to have a quick call?',
            exampleTa: 'உங்களுக்கு அழைத்துப் பேச எந்த நேரம் வசதியாக இருக்கும்?',
            cat: 'office'
        },
        {
            word: 'Overwhelmed',
            pos: 'Adjective',
            phonetic: 'ஓவர்வெல்ம்டு',
            tamilMeaning: 'அதிக வேலை அல்லது உணர்ச்சியால் திணறுதல்',
            exampleEn: 'She felt overwhelmed by the sudden workload.',
            exampleTa: 'திடீர் வேலைப் பளுவால் அவள் மிகவும் திணறிவிட்டாள்.',
            cat: 'feelings'
        },
        {
            word: 'Affordable',
            pos: 'Adjective',
            phonetic: 'அஃபோர்டபிள்',
            tamilMeaning: 'வாங்கக்கூடிய நியாயமான விலை',
            exampleEn: 'This supermarket has affordable groceries and fresh vegetables.',
            exampleTa: 'இந்த சூப்பர் மார்க்கெட்டில் மளிகைப் பொருட்களும் காய்கறிகளும் வாங்கக்கூடிய நியாயமான விலையில் உள்ளன.',
            cat: 'travel'
        },
        {
            word: 'Communicate',
            pos: 'Verb',
            phonetic: 'கம்யூனிகேட்',
            tamilMeaning: 'தகவல் பரிமாறுதல் / கருத்தைப் பகிர்ந்துகொள்ளுதல்',
            exampleEn: 'The best way to learn English is to communicate daily.',
            exampleTa: 'ஆங்கிலம் கற்க சிறந்த வழி தினமும் பேசிப் பழகுவதே.',
            cat: 'daily'
        },
        {
            word: 'Collaborate',
            pos: 'Verb',
            phonetic: 'கொலாபரேட்',
            tamilMeaning: 'ஒன்றிணைந்து பணிபுரிதல்',
            exampleEn: 'Our team will collaborate with developers to fix the bug.',
            exampleTa: 'பிழையைச் சரிசெய்ய எங்கள் குழு புரோகிராமர்களுடன் இணைந்து செயல்படும்.',
            cat: 'office'
        },
        {
            word: 'Curious',
            pos: 'Adjective',
            phonetic: 'க்யூரியஸ்',
            tamilMeaning: 'ஆர்வமுள்ள / புதிதாக அறிய விரும்பும்',
            exampleEn: 'Children are always curious about how things work.',
            exampleTa: 'பொருட்கள் எவ்வாறு இயங்குகின்றன என்பதை அறிவதில் குழந்தைகள் எப்போதும் ஆர்வமாக இருப்பார்கள்.',
            cat: 'feelings'
        },
        {
            word: 'Departure',
            pos: 'Noun',
            phonetic: 'டிபார்ச்சர்',
            tamilMeaning: 'புறப்படுதல் / கிளம்பும் நேரம்',
            exampleEn: 'The flight departure is scheduled for 10:30 PM.',
            exampleTa: 'விமானம் இரவு 10:30 மணிக்கு புறப்படும் என அறிவிக்கப்பட்டுள்ளது.',
            cat: 'travel'
        },
        {
            word: 'Crucial',
            pos: 'Adjective',
            phonetic: 'க்ரூஷியல்',
            tamilMeaning: 'மிக முக்கியமான / இன்றியமையாத',
            exampleEn: 'Consistency is crucial for mastering spoken English.',
            exampleTa: 'பேசும் ஆங்கிலத்தில் தேர்ச்சி பெற விடாமுயற்சி மிக முக்கியமானது.',
            cat: 'daily'
        },
        {
            word: 'Explore',
            pos: 'Verb',
            phonetic: 'எக்ஸ்ப்ளோர்',
            tamilMeaning: 'ஆராய்ந்து பார்த்தல் / புதியவற்றைத் தேடி அறிதல்',
            exampleEn: 'We love to explore new restaurants and places on weekends.',
            exampleTa: 'வார இறுதி நாட்களில் புதிய உணவகங்களையும் இடங்களையும் ஆராய்ந்து பார்க்க நாங்கள் விரும்புகிறோம்.',
            cat: 'travel'
        },
        {
            word: 'Resilience',
            pos: 'Noun',
            phonetic: 'ரெஸிலியன்ஸ்',
            tamilMeaning: 'சவால்களைத் தாங்கி மீண்டெழும் மனவலிமை',
            exampleEn: 'Her resilience in difficult times inspired everyone.',
            exampleTa: 'கடினமான சூழல்களில் அவள் காட்டிய மீண்டெழும் மனவலிமை அனைவரையும் ஈர்த்தது.',
            cat: 'feelings'
        },
        {
            word: 'Appreciate',
            pos: 'Verb',
            phonetic: 'அப்ரிசியேட்',
            tamilMeaning: 'பாராட்டுதல் / மனதார போற்றுதல்',
            exampleEn: 'I really appreciate your timely advice and encouragement.',
            exampleTa: 'உங்கள் சரியான நேரத்து ஆலோசனையையும் ஊக்கத்தையும் நான் மனதாரப் பாராட்டுகிறேன்.',
            cat: 'daily'
        },
        {
            word: 'Punctual',
            pos: 'Adjective',
            phonetic: 'பங்ச்சுவல்',
            tamilMeaning: 'நேரந்தவறாமை / குறித்த நேரத்தில் வருகிற',
            exampleEn: 'Always be punctual for job interviews and client meetings.',
            exampleTa: 'வேலை நேர்முகத் தேர்வுகள் மற்றும் வாடிக்கையாளர் சந்திப்புகளுக்கு எப்போதும் குறித்த நேரத்தில் இருங்கள்.',
            cat: 'office'
        },
        {
            word: 'Exhausted',
            pos: 'Adjective',
            phonetic: 'எக்ஸாஸ்டெட்',
            tamilMeaning: 'மிகவும் களைப்படைந்த / உடல் சோர்வான',
            exampleEn: 'I was completely exhausted after the long road trip.',
            exampleTa: 'நீண்ட சாலைப் பயணத்திற்குப் பிறகு நான் மிகவும் களைப்படைந்து விட்டேன்.',
            cat: 'feelings'
        },
        {
            word: 'Procrastinate',
            pos: 'Verb',
            phonetic: 'புரோக்ராஸ்டினேட்',
            tamilMeaning: 'காரியங்களைத் தள்ளிப்போடுதல் / பிற்போடுதல்',
            exampleEn: 'Do not procrastinate your daily spoken English practice.',
            exampleTa: 'உங்கள் தினசரி ஆங்கிலப் பயிற்சியைத் தள்ளிப் போடாதீர்கள்.',
            cat: 'daily'
        },
        {
            word: 'Reluctant',
            pos: 'Adjective',
            phonetic: 'ரிலக்டன்ட்',
            tamilMeaning: 'தயக்கம் காட்டும் / விருப்பமில்லாத',
            exampleEn: 'He was reluctant to speak in public at first.',
            exampleTa: 'ஆரம்பத்தில் அவர் பொதுவெளியில் பேசத் தயங்கினார்.',
            cat: 'feelings'
        },
        {
            word: 'Fascinating',
            pos: 'Adjective',
            phonetic: 'ஃபாஸினேட்டிங்',
            tamilMeaning: 'மிகவும் சுவாரஸ்யமான / வியக்கத்தக்க',
            exampleEn: 'The documentary on marine life was absolutely fascinating.',
            exampleTa: 'கடல் வாழ் உயிரினங்களைப் பற்றிய அந்த ஆவணப்படம் மிகவும் சுவாரஸ்யமாக இருந்தது.',
            cat: 'daily'
        },
        {
            word: 'Apologize',
            pos: 'Verb',
            phonetic: 'அபாலஜைஸ்',
            tamilMeaning: 'மன்னிப்பு கோருதல் / வருத்தம் தெரிவித்தல்',
            exampleEn: 'I sincerely apologize for the delay in replying to your email.',
            exampleTa: 'உங்கள் மின்னஞ்சலுக்குப் பதிலளிக்கத் தாமதமானதற்கு நான் மனப்பூர்வமாக மன்னிப்புக் கேட்டுக்கொள்கிறேன்.',
            cat: 'office'
        },
        {
            word: 'Recommend',
            pos: 'Verb',
            phonetic: 'ரெக்கமண்ட்',
            tamilMeaning: 'பரிந்துரைத்தல் / பரிந்துரை செய்தல்',
            exampleEn: 'Can you recommend a good English grammar book for beginners?',
            exampleTa: 'தொடக்க நிலை மாணவர்களுக்கு ஒரு நல்ல ஆங்கில இலக்கணப் புத்தகத்தைப் பரிந்துரைக்க முடியுமா?',
            cat: 'office'
        },
        {
            word: 'Opportunity',
            pos: 'Noun',
            phonetic: 'ஆப்பர்சூனிட்டி',
            tamilMeaning: 'நல்ல வாய்ப்பு / சந்தர்ப்பம்',
            exampleEn: 'Never miss an opportunity to practice speaking in English.',
            exampleTa: 'ஆங்கிலத்தில் பேசிப் பழகுவதற்கான எந்த ஒரு நல்ல வாய்ப்பையும் நழுவ விடாதீர்கள்.',
            cat: 'daily'
        },
        {
            word: 'Challenge',
            pos: 'Noun',
            phonetic: 'சேலஞ்ச்',
            tamilMeaning: 'சவால் / கடினமான இலக்கு',
            exampleEn: 'Learning a new language is a fun and rewarding challenge.',
            exampleTa: 'ஒரு புதிய மொழியைக் கற்றுக்கொள்வது சுவாரஸ்யமான ஒரு சவாலாகும்.',
            cat: 'daily'
        },
        {
            word: 'Generous',
            pos: 'Adjective',
            phonetic: 'ஜெனரஸ்',
            tamilMeaning: 'தாராள மனப்பான்மையுள்ள / வாரி வழங்கும்',
            exampleEn: 'They were very generous in sharing their knowledge.',
            exampleTa: 'அவர்கள் தங்கள் அறிவைப் பகிர்வதில் மிகவும் தாராள மனப்பான்மையுடன் இருந்தனர்.',
            cat: 'feelings'
        },
        {
            word: 'Essential',
            pos: 'Adjective',
            phonetic: 'எசென்ஷியல்',
            tamilMeaning: 'அத்தியாவசியமான / தவிர்க்க முடியாத',
            exampleEn: 'Clear pronunciation is essential for good communication.',
            exampleTa: 'சிறந்த தகவல் தொடர்புக்குத் தெளிவான உச்சரிப்பு மிகவும் அத்தியாவசியமானது.',
            cat: 'daily'
        },
        {
            word: 'Inspire',
            pos: 'Verb',
            phonetic: 'இன்ஸ்பையர்',
            tamilMeaning: 'ஊக்கமளித்தல் / ஊக்கமூட்டுதல்',
            exampleEn: 'Great teachers always inspire their students to dream big.',
            exampleTa: 'சிறந்த ஆசிரியர்கள் எப்போதும் தங்கள் மாணவர்களைப் பெரிதாகக் கனவு காண ஊக்கப்படுத்துகிறார்கள்.',
            cat: 'daily'
        },
        {
            word: 'Bargain',
            pos: 'Verb',
            phonetic: 'பார்கெய்ன்',
            tamilMeaning: 'பேரம் பேசுதல் / விலையைக் குறைத்துக் கேட்டல்',
            exampleEn: 'You can politely bargain with street market vendors.',
            exampleTa: 'தெருவோரக் கடைகளில் நீங்கள் கண்ணியமாகப் பேரம் பேசலாம்.',
            cat: 'travel'
        },
        {
            word: 'Patience',
            pos: 'Noun',
            phonetic: 'பேஷன்ஸ்',
            tamilMeaning: 'பொறுமை / சகிப்புத்தன்மை',
            exampleEn: 'Fluency in English requires constant practice and patience.',
            exampleTa: 'ஆங்கிலத்தில் சரளமாகப் பேச தொடர் பயிற்சியும் பொறுமையும் தேவை.',
            cat: 'daily'
        },
        {
            word: 'Comfortable',
            pos: 'Adjective',
            phonetic: 'கம்ஃபர்ட்டபிள்',
            tamilMeaning: 'வசதியான / இதமான / மன அமைதியான',
            exampleEn: 'Make yourself comfortable before the speech begins.',
            exampleTa: 'உரை தொடங்குவதற்கு முன் உங்களை வசதியாகவும் நிதானமாகவும் அமைத்துக் கொள்ளுங்கள்.',
            cat: 'daily'
        },
        {
            word: 'Discipline',
            pos: 'Noun',
            phonetic: 'டிசிப்ளின்',
            tamilMeaning: 'ஒழுக்கம் / சுய கட்டுப்பாடு',
            exampleEn: 'Daily discipline is the secret to acquiring any new skill.',
            exampleTa: 'தினசரி ஒழுக்கமே எந்தவொரு புதிய திறனையும் கற்றுக்கொள்வதற்கான ரகசியம்.',
            cat: 'daily'
        },
        {
            word: 'Gratitude',
            pos: 'Noun',
            phonetic: 'கிராட்டிட்யூட்',
            tamilMeaning: 'நன்றியுணர்வு / நன்றி மறவாமை',
            exampleEn: 'Express gratitude for the small blessings in your life.',
            exampleTa: 'உங்கள் வாழ்வில் கிடைக்கும் சிறு நன்மைகளுக்கும் நன்றியுணர்வை வெளிப்படுத்துங்கள்.',
            cat: 'feelings'
        }
    ];

    // Load custom saved words from localStorage
    try {
        const savedCustomWords = JSON.parse(localStorage.getItem('sw_custom_words') || '[]');
        savedCustomWords.forEach(w => {
            if (!WORDS_DATA.some(x => x.word.toLowerCase() === w.word.toLowerCase())) {
                WORDS_DATA.unshift(w);
            }
        });
    } catch (e) {}

    // ==========================================
    // 2.5. EVERYDAY ENGLISH-TO-TAMIL DICTIONARY (200+ COMMON WORDS)
    // ==========================================
    const EVERYDAY_DICT = {
        'apple': { tamil: 'ஆப்பிள் பழம்', sound: 'ஆப்பிள்', pos: 'Noun', ex: 'I eat a fresh apple every day.', taEx: 'நான் தினமும் ஒரு புதிய ஆப்பிள் சாப்பிடுகிறேன்.' },
        'water': { tamil: 'தண்ணீர் / நீர்', sound: 'வாட்டர்', pos: 'Noun', ex: 'Please drink plenty of water.', taEx: 'தயவுசெய்து நிறைய தண்ணீர் குடியுங்கள்.' },
        'book': { tamil: 'புத்தகம்', sound: 'புக்', pos: 'Noun', ex: 'I am reading an English book.', taEx: 'நான் ஒரு ஆங்கிலப் புத்தகம் படித்துக்கொண்டிருக்கிறேன்.' },
        'food': { tamil: 'உணவு', sound: 'ஃபுட்', pos: 'Noun', ex: 'Traditional Tamil food is delicious.', taEx: 'பாரம்பரிய தமிழ் உணவு மிகவும் சுவையானது.' },
        'house': { tamil: 'வீடு', sound: 'ஹவுஸ்', pos: 'Noun', ex: 'My house is near the bus stop.', taEx: 'என் வீடு பேருந்து நிறுத்தம் அருகே உள்ளது.' },
        'home': { tamil: 'இல்லம் / வீடு', sound: 'ஹோம்', pos: 'Noun', ex: 'I will go home after work.', taEx: 'வேலை முடிந்ததும் நான் வீட்டிற்குச் செல்வேன்.' },
        'friend': { tamil: 'நண்பன் / தோழி', sound: 'பிரண்ட்', pos: 'Noun', ex: 'He is my best childhood friend.', taEx: 'அவன் என் சிறந்த சிறுவயது நண்பன்.' },
        'school': { tamil: 'பள்ளி', sound: 'ஸ்கூல்', pos: 'Noun', ex: 'Children go to school at 8 AM.', taEx: 'குழந்தைகள் காலை 8 மணிக்கு பள்ளிக்குச் செல்கிறார்கள்.' },
        'work': { tamil: 'வேலை / பணி', sound: 'வொர்க்', pos: 'Verb/Noun', ex: 'I work at a software company.', taEx: 'நான் ஒரு மென்பொருள் நிறுவனத்தில் வேலை செய்கிறேன்.' },
        'time': { tamil: 'நேரம்', sound: 'டைம்', pos: 'Noun', ex: 'What is the time right now?', taEx: 'இப்போது என்ன நேரம் ஆகிறது?' },
        'money': { tamil: 'பணம்', sound: 'மனி', pos: 'Noun', ex: 'Save money for your future.', taEx: 'உங்கள் எதிர்காலத்திற்காக பணத்தைச் சேமிக்கவும்.' },
        'car': { tamil: 'கார் / மகிழுந்து', sound: 'கார்', pos: 'Noun', ex: 'He bought a new electric car.', taEx: 'அவர் ஒரு புதிய மின்சார காரை வாங்கினார்.' },
        'run': { tamil: 'ஓடுதல்', sound: 'ரன்', pos: 'Verb', ex: 'He runs 3 kilometers every morning.', taEx: 'அவர் தினமும் காலையில் 3 கிலோமீட்டர் ஓடுகிறார்.' },
        'walk': { tamil: 'நடத்தல்', sound: 'வாக்', pos: 'Verb', ex: 'Let us walk in the park.', taEx: 'நாம் பூங்காவில் நடைபயிற்சி செய்வோம்.' },
        'go': { tamil: 'போதல் / செல்', sound: 'கோ', pos: 'Verb', ex: 'I will go to Chennai tomorrow.', taEx: 'நான் நாளை சென்னைக்குச் செல்வேன்.' },
        'come': { tamil: 'வருதல்', sound: 'கம்', pos: 'Verb', ex: 'Please come inside and sit.', taEx: 'தயவுசெய்து உள்ளே வந்து அமருங்கள்.' },
        'eat': { tamil: 'சாப்பிடுதல்', sound: 'ஈட்', pos: 'Verb', ex: 'What did you eat for breakfast?', taEx: 'காலை உணவுக்கு என்ன சாப்பிட்டீர்கள்?' },
        'drink': { tamil: 'குடித்தல்', sound: 'ட்ரிங்க்', pos: 'Verb', ex: 'Drink warm water with honey.', taEx: 'தேனுடன் வெதுவெதுப்பான நீரைக் குடியுங்கள்.' },
        'sleep': { tamil: 'தூங்குதல்', sound: 'ஸ்லீப்', pos: 'Verb', ex: 'Try to sleep 8 hours every night.', taEx: 'தினமும் இரவில் 8 மணி நேரம் தூங்க முயற்சி செய்யுங்கள்.' },
        'read': { tamil: 'படித்தல்', sound: 'ரீட்', pos: 'Verb', ex: 'Read English newspapers daily.', taEx: 'தினமும் ஆங்கிலச் செய்தித்தாள்களைப் படியுங்கள்.' },
        'write': { tamil: 'எழுதுதல்', sound: 'ரைட்', pos: 'Verb', ex: 'Write down your daily goals.', taEx: 'உங்கள் தினசரி இலக்குகளை எழுதி வையுங்கள்.' },
        'speak': { tamil: 'பேசுதல்', sound: 'ஸ்பீக்', pos: 'Verb', ex: 'Speak English with full confidence.', taEx: 'முழு நம்பிக்கையுடன் ஆங்கிலத்தில் பேசுங்கள்.' },
        'listen': { tamil: 'கவனித்துக் கேட்டல்', sound: 'லிசன்', pos: 'Verb', ex: 'Listen carefully to pronunciation.', taEx: 'உச்சரிப்பைக் கவனமாகக் கேளுங்கள்.' },
        'see': { tamil: 'பார்த்தல்', sound: 'சீ', pos: 'Verb', ex: 'I see a beautiful rainbow.', taEx: 'நான் ஒரு அழகான வானவில்லைப் பார்க்கிறேன்.' },
        'help': { tamil: 'உதவுதல் / உதவி', sound: 'ஹெல்ப்', pos: 'Verb/Noun', ex: 'Can you help me with this problem?', taEx: 'இந்த சிக்கலுக்கு நீங்கள் எனக்கு உதவ முடியுமா?' },
        'happy': { tamil: 'மகிழ்ச்சியான', sound: 'ஹேப்பி', pos: 'Adjective', ex: 'We are very happy to meet you.', taEx: 'உங்களைச் சந்திப்பதில் நாங்கள் மிக்க மகிழ்ச்சியடைகிறோம்.' },
        'good': { tamil: 'நல்ல', sound: 'குட்', pos: 'Adjective', ex: 'This is a very good suggestion.', taEx: 'இது ஒரு மிகச் சிறந்த ஆலோசனை.' },
        'bad': { tamil: 'கெட்ட / மோசமான', sound: 'பேட்', pos: 'Adjective', ex: 'Avoid bad habits and stay healthy.', taEx: 'கெட்ட பழக்கங்களைத் தவிர்த்து ஆரோக்கியமாக இருங்கள்.' },
        'big': { tamil: 'பெரிய', sound: 'பிக்', pos: 'Adjective', ex: 'Chennai is a big and busy city.', taEx: 'சென்னை ஒரு பெரிய, பரபரப்பான நகரம்.' },
        'small': { tamil: 'சிறிய', sound: 'ஸ்மால்', pos: 'Adjective', ex: 'Take small steps every day.', taEx: 'தினமும் சிறு சிறு அடிகள் எடுத்து வையுங்கள்.' },
        'fast': { tamil: 'வேகமான', sound: 'ஃபாஸ்ட்', pos: 'Adjective/Adverb', ex: 'The train travels very fast.', taEx: 'ரயில் மிக வேகமாகச் செல்கிறது.' },
        'slow': { tamil: 'மெதுவான', sound: 'ஸ்லோ', pos: 'Adjective', ex: 'Please speak a little slow.', taEx: 'தயவுசெய்து கொஞ்சம் மெதுவாகப் பேசுங்கள்.' },
        'easy': { tamil: 'எளிதான / சுலபமான', sound: 'ஈஸி', pos: 'Adjective', ex: 'Spoken English is easy to learn.', taEx: 'பேசும் ஆங்கிலம் கற்க மிகவும் எளிதானது.' },
        'hard': { tamil: 'கடினமான', sound: 'ஹார்ட்', pos: 'Adjective', ex: 'Hard work brings great success.', taEx: 'கடின உழைப்பு பெரும் வெற்றியைக் கொண்டுவரும்.' },
        'love': { tamil: 'அன்பு / காதல்', sound: 'லவ்', pos: 'Verb/Noun', ex: 'I love my parents very much.', taEx: 'நான் என் பெற்றோரை மிகவும் நேசிக்கிறேன்.' },
        'learn': { tamil: 'கற்றுக்கொள்ளுதல்', sound: 'லேர்ன்', pos: 'Verb', ex: 'We learn something new each day.', taEx: 'நாம் தினமும் புதிதாக ஒன்றைக் கற்றுக்கொள்கிறோம்.' },
        'teach': { tamil: 'கற்பித்தல்', sound: 'டீச்', pos: 'Verb', ex: 'She teaches English grammar.', taEx: 'அவள் ஆங்கில இலக்கணத்தைக் கற்பிக்கிறாள்.' },
        'call': { tamil: 'அழைத்தல் / தொலைபேசி அழைப்பு', sound: 'கால்', pos: 'Verb/Noun', ex: 'Call me when you reach home.', taEx: 'வீட்டிற்குச் சென்றதும் என்னை அழையுங்கள்.' },
        'buy': { tamil: 'வாங்குதல்', sound: 'பை', pos: 'Verb', ex: 'I want to buy fresh vegetables.', taEx: 'நான் புதிய காய்கறிகளை வாங்க விரும்புகிறேன்.' },
        'sell': { tamil: 'விற்பனை செய்தல்', sound: 'செல்', pos: 'Verb', ex: 'They sell fruits at a low price.', taEx: 'அவர்கள் குறைந்த விலையில் பழங்களை விற்கிறார்கள்.' },
        'give': { tamil: 'கொடுத்தல்', sound: 'கிவ்', pos: 'Verb', ex: 'Please give me ten minutes.', taEx: 'தயவுசெய்து எனக்கு பத்து நிமிடங்கள் கொடுங்கள்.' },
        'take': { tamil: 'எடுத்தல்', sound: 'டேக்', pos: 'Verb', ex: 'Take this medicine after food.', taEx: 'இந்த மருந்தை உணவுக்குப் பின் உட்கொள்ளவும்.' },
        'open': { tamil: 'திறத்தல்', sound: 'ஓபன்', pos: 'Verb', ex: 'Open the door and let fresh air in.', taEx: 'கதவைத் திறந்து புதிய காற்றை உள்ளே வர விடுங்கள்.' },
        'close': { tamil: 'மூடுதல்', sound: 'க்ளோஸ்', pos: 'Verb', ex: 'Please close the window.', taEx: 'தயவுசெய்து ஜன்னலை மூடுங்கள்.' },
        'start': { tamil: 'தொடங்குதல்', sound: 'ஸ்டார்ட்', pos: 'Verb', ex: 'Let us start the meeting now.', taEx: 'நாம் இப்போது கூட்டத்தைத் தொடங்குவோம்.' },
        'stop': { tamil: 'நிறுத்துதல்', sound: 'ஸ்டாப்', pos: 'Verb', ex: 'The bus will stop here.', taEx: 'பேருந்து இங்கே நிற்கும்.' },
        'wait': { tamil: 'காத்திருத்தல்', sound: 'வெயிட்', pos: 'Verb', ex: 'Wait for five minutes, please.', taEx: 'தயவுசெய்து ஐந்து நிமிடங்கள் காத்திருங்கள்.' },
        'meet': { tamil: 'சந்தித்தல்', sound: 'மீட்', pos: 'Verb', ex: 'I will meet you at the cafe.', taEx: 'நான் உங்களை உணவகத்தில் சந்திக்கிறேன்.' },
        'understand': { tamil: 'புரிந்துகொள்ளுதல்', sound: 'அண்டர்ஸ்டாண்ட்', pos: 'Verb', ex: 'Did you understand the lesson?', taEx: 'உங்களுக்கு பாடம் புரிந்ததா?' },
        'know': { tamil: 'அறிதல் / தெரிதல்', sound: 'நோ', pos: 'Verb', ex: 'I know how to solve this problem.', taEx: 'இதை எவ்வாறு தீர்ப்பது என்று எனக்குத் தெரியும்.' },
        'think': { tamil: 'சிந்தித்தல் / யோசித்தல்', sound: 'திங்க்', pos: 'Verb', ex: 'Think before you speak.', taEx: 'பேசுவதற்கு முன் யோசித்துக்கொள்ளுங்கள்.' },
        'want': { tamil: 'விரும்புதல் / தேவைப்படுதல்', sound: 'வாண்ட்', pos: 'Verb', ex: 'I want a cup of hot tea.', taEx: 'எனக்கு ஒரு கோப்பை சூடான தேநீர் வேண்டும்.' },
        'feel': { tamil: 'உணர்தல்', sound: 'ஃபீல்', pos: 'Verb', ex: 'I feel great today.', taEx: 'இன்று நான் மிகவும் நன்றாக உணர்கிறேன்.' },
        'today': { tamil: 'இன்று', sound: 'டுடே', pos: 'Noun/Adverb', ex: 'Today is a wonderful day.', taEx: 'இன்று ஒரு அருமையான நாள்.' },
        'tomorrow': { tamil: 'நாளை', sound: 'டுமாரோ', pos: 'Noun/Adverb', ex: 'See you tomorrow morning.', taEx: 'நாளை காலை சந்திப்போம்.' },
        'yesterday': { tamil: 'நேற்று', sound: 'யெஸ்டர்டே', pos: 'Noun/Adverb', ex: 'I visited my friend yesterday.', taEx: 'நான் நேற்று எனது நண்பரைப் பார்த்தேன்.' },
        'morning': { tamil: 'காலை', sound: 'மார்னிங்', pos: 'Noun', ex: 'Good morning, have a nice day!', taEx: 'காலை வணக்கம், இனிய நாளாக அமையட்டும்!' },
        'night': { tamil: 'இரவு', sound: 'நைட்', pos: 'Noun', ex: 'Have a peaceful night sleep.', taEx: 'அமைதியான இரவு தூக்கம் அமையட்டும்.' },
        'doctor': { tamil: 'மருத்துவர்', sound: 'டாக்டர்', pos: 'Noun', ex: 'Consult a doctor for health checkup.', taEx: 'உடல் பரிசோதனைக்கு மருத்துவரை அணுகவும்.' },
        'hospital': { tamil: 'மருத்துவமனை', sound: 'ஹாஸ்பிடல்', pos: 'Noun', ex: 'The hospital is near the railway station.', taEx: 'மருத்துவமனை ரயில் நிலையத்திற்கு அருகில் உள்ளது.' },
        'office': { tamil: 'அலுவலகம்', sound: 'ஆஃபிஸ்', pos: 'Noun', ex: 'I reach the office by 9:30 AM.', taEx: 'நான் காலை 9:30 மணிக்குள் அலுவலகத்தை அடைகிறேன்.' },
        'phone': { tamil: 'தொலைபேசி', sound: 'போன்', pos: 'Noun', ex: 'Answer the phone call immediately.', taEx: 'உடனடியாக தொலைபேசி அழைப்பை ஏற்கவும்.' },
        'family': { tamil: 'குடும்பம்', sound: 'ஃபேமிலி', pos: 'Noun', ex: 'Family is our greatest blessing.', taEx: 'குடும்பமே நமக்கு கிடைத்த மிகப்பெரிய வரம்.' },
        'mother': { tamil: 'தாய் / அம்மா', sound: 'மதர்', pos: 'Noun', ex: 'Mother cooks delicious food.', taEx: 'அம்மா சுவையான உணவு சமைக்கிறார்.' },
        'father': { tamil: 'தந்தை / அப்பா', sound: 'ஃபாதர்', pos: 'Noun', ex: 'Father guided me in my career.', taEx: 'என் தொழில் வாழ்க்கையில் அப்பா எனக்கு வழிகாட்டினார்.' },
        'brother': { tamil: 'சகோதரன் (அண்ணன்/தம்பி)', sound: 'பிரதர்', pos: 'Noun', ex: 'My brother plays cricket.', taEx: 'என் சகோதரன் கிரிக்கெட் விளையாடுகிறான்.' },
        'sister': { tamil: 'சகோதரி (அக்கா/தங்கை)', sound: 'சிஸ்டர்', pos: 'Noun', ex: 'My sister is studying medicine.', taEx: 'என் சகோதரி மருத்துவம் படித்து வருகிறாள்.' },
        'child': { tamil: 'குழந்தை', sound: 'சைல்ட்', pos: 'Noun', ex: 'The child is playing happily.', taEx: 'குழந்தை மகிழ்ச்சியாக விளையாடிக்கொண்டிருக்கிறது.' },
        'city': { tamil: 'நகரம்', sound: 'சிட்டி', pos: 'Noun', ex: 'Madurai is an ancient cultural city.', taEx: 'மதுரை ஒரு பழமையான கலாச்சார நகரம்.' },
        'village': { tamil: 'கிராமம்', sound: 'வில்லேஜ்', pos: 'Noun', ex: 'The village has green paddy fields.', taEx: 'கிராமத்தில் பசுமையான நெல் வயல்கள் உள்ளன.' },
        'beautiful': { tamil: 'அழகான', sound: 'பியூட்டிஃபுல்', pos: 'Adjective', ex: 'She has a beautiful smile.', taEx: 'அவளுக்கு ஒரு அழகான புன்னகை இருக்கிறது.' },
        'clean': { tamil: 'சுத்தமான', sound: 'க்ளீன்', pos: 'Adjective', ex: 'Keep your surroundings clean.', taEx: 'உங்கள் சுற்றுப்புறத்தைத் தூய்மையாக வைத்திருங்கள்.' },
        'hot': { tamil: 'சூடான / வெப்பமான', sound: 'ஹாட்', pos: 'Adjective', ex: 'The tea is very hot.', taEx: 'தேநீர் மிகவும் சூடாக இருக்கிறது.' },
        'cold': { tamil: 'குளிர்ந்த', sound: 'கோல்ட்', pos: 'Adjective', ex: 'The climate is cold in Ooty.', taEx: 'ஊட்டியில் தட்பவெப்பம் குளிராக இருக்கிறது.' },
        'rain': { tamil: 'மழை', sound: 'ரெய்ன்', pos: 'Noun/Verb', ex: 'It is raining outside.', taEx: 'வெளியே மழை பெய்து கொண்டிருக்கிறது.' },
        'sun': { tamil: 'சூரியன்', sound: 'சன்', pos: 'Noun', ex: 'The sun shines brightly in the sky.', taEx: 'சூரியன் வானத்தில் பிரகாசமாக ஒளிர்கிறது.' },
        'moon': { tamil: 'நிலவு / சந்திரன்', sound: 'மூன்', pos: 'Noun', ex: 'The full moon looks gorgeous tonight.', taEx: 'இன்றிரவு முழு நிலவு அழகாகக் காட்சியளிக்கிறது.' },
        'tea': { tamil: 'தேநீர் / டீ', sound: 'டீ', pos: 'Noun', ex: 'Would you like a hot cup of tea?', taEx: 'ஒரு கோப்பை சூடான தேநீர் அருந்துகிறீர்களா?' },
        'coffee': { tamil: 'காபி / குளம்பி', sound: 'காபி', pos: 'Noun', ex: 'I drink filter coffee every morning.', taEx: 'நான் தினமும் காலையில் ஃபில்டர் காபி குடிக்கிறேன்.' },
        'milk': { tamil: 'பால்', sound: 'மில்க்', pos: 'Noun', ex: 'Children should drink warm milk.', taEx: 'குழந்தைகள் வெதுவெதுப்பான பால் குடிக்க வேண்டும்.' },
        'rice': { tamil: 'அரிசி / சாதம்', sound: 'ரைஸ்', pos: 'Noun', ex: 'We eat rice and sambar for lunch.', taEx: 'நாங்கள் மதிய உணவுக்கு சாதமும் சாம்பாரும் சாப்பிடுகிறோம்.' },
        'bus': { tamil: 'பேருந்து', sound: 'பஸ்', pos: 'Noun', ex: 'I catch the city bus at 8:30 AM.', taEx: 'நான் காலை 8:30 மணிக்கு நகரப் பேருந்தைப் பிடிக்கிறேன்.' },
        'train': { tamil: 'ரயில் / தொடர்வண்டி', sound: 'ட்ரெய்ன்', pos: 'Noun', ex: 'The train arrives on platform 2.', taEx: 'ரயில் நடைமேடை 2-ல் வந்து சேர்கிறது.' },
        'road': { tamil: 'சாலை / தெரு', sound: 'ரோட்', pos: 'Noun', ex: 'Cross the busy road carefully.', taEx: 'பரபரப்பான சாலையைக் கவனமாகக் கடக்கவும்.' },
        'room': { tamil: 'அறை', sound: 'ரூம்', pos: 'Noun', ex: 'Please keep your room neat and tidy.', taEx: 'தயவுசெய்து உங்கள் அறையை நேர்த்தியாகவும் சுத்தமாகவும் வைத்திருங்கள்.' },
        'door': { tamil: 'கதவு', sound: 'டோர்', pos: 'Noun', ex: 'Please knock on the door before entering.', taEx: 'உள்ளே நுழைவதற்கு முன் கதவைத் தட்டவும்.' },
        'window': { tamil: 'ஜன்னல்', sound: 'விண்டோ', pos: 'Noun', ex: 'Open the window to get fresh air.', taEx: 'புதிய காற்று வர ஜன்னலைத் திறக்கவும்.' },
        'pen': { tamil: 'பேனா', sound: 'பென்', pos: 'Noun', ex: 'Can I borrow your blue pen for a minute?', taEx: 'ஒரு நிமிடம் உங்கள் நீல நிறப் பேனாவைப் பயன்படுத்தலாமா?' },
        'paper': { tamil: 'காகிதம் / தாள்', sound: 'பேப்பர்', pos: 'Noun', ex: 'Write your address on this paper.', taEx: 'இந்தத் தாளில் உங்கள் முகவரியை எழுதுங்கள்.' },
        'question': { tamil: 'கேள்வி', sound: 'கொஸ்டின்', pos: 'Noun', ex: 'Feel free to ask any question.', taEx: 'எந்தக் கேள்வியையும் தயங்காமல் கேளுங்கள்.' },
        'answer': { tamil: 'பதில் / விடை', sound: 'ஆன்சர்', pos: 'Noun/Verb', ex: 'She gave the correct answer.', taEx: 'அவள் சரியான பதிலை அளித்தாள்.' },
        'problem': { tamil: 'பிரச்சனை / சிக்கல்', sound: 'ப்ராப்ளம்', pos: 'Noun', ex: 'Together we can solve any problem.', taEx: 'நாம் இணைந்து எந்த ஒரு பிரச்சனையையும் தீர்க்கலாம்.' },
        'health': { tamil: 'உடல்நலம் / ஆரோக்கியம்', sound: 'ஹெல்த்', pos: 'Noun', ex: 'Health is the greatest wealth.', taEx: 'சுவரிருந்தால் தான் சித்திரம்; ஆரோக்கியமே சிறந்த செல்வம்.' },
        'music': { tamil: 'இசை', sound: 'மியூசிக்', pos: 'Noun', ex: 'Listening to soft music relaxes the mind.', taEx: 'மெல்லிசையைக் கேட்பது மனதை அமைதிப்படுத்துகிறது.' },
        'job': { tamil: 'வேலை / பணி', sound: 'ஜாப்', pos: 'Noun', ex: 'He got an exciting new software job.', taEx: 'அவருக்கு ஒரு புதிய மென்பொருள் வேலை கிடைத்தது.' },
        'market': { tamil: 'சந்தை / அங்காடி', sound: 'மார்க்கெட்', pos: 'Noun', ex: 'Mother went to the vegetable market.', taEx: 'அம்மா காய்கறிச் சந்தைக்குச் சென்றுள்ளார்.' },
        'shop': { tamil: 'கடை', sound: 'ஷாப்', pos: 'Noun', ex: 'The grocery shop is just round the corner.', taEx: 'மளிகைக் கடை தெரு முனையிலேயே உள்ளது.' },
        'price': { tamil: 'விலை', sound: 'ப்ரைஸ்', pos: 'Noun', ex: 'What is the price of this shirt?', taEx: 'இந்த சட்டையின் விலை என்ன?' },
        'pay': { tamil: 'பணம் செலுத்துதல்', sound: 'பே', pos: 'Verb', ex: 'You can pay using UPI or cash.', taEx: 'நீங்கள் UPI அல்லது ரொக்கமாகப் பணம் செலுத்தலாம்.' },
        'sad': { tamil: 'வருத்தமான / சோகமான', sound: 'சேட்', pos: 'Adjective', ex: 'Do not be sad; everything will be fine.', taEx: 'சோகமாக இருக்காதீர்கள்; எல்லாம் சரியாகிவிடும்.' },
        'tired': { tamil: 'களைப்பான / சோர்வான', sound: 'டயர்ட்', pos: 'Adjective', ex: 'I am a little tired after a long journey.', taEx: 'நீண்ட பயணத்திற்குப் பிறகு நான் சற்று சோர்வாக இருக்கிறேன்.' },
        'angry': { tamil: 'கோபமான', sound: 'ஆங்க்ரி', pos: 'Adjective', ex: 'Stay calm even when you feel angry.', taEx: 'கோபம் வரும்போதும் அமைதியைக் கடைப்பிடியுங்கள்.' },
        'busy': { tamil: 'வேலை மும்முரமான / பரபரப்பான', sound: 'பிஸி', pos: 'Adjective', ex: 'He is currently busy with a client meeting.', taEx: 'அவர் தற்போது வாடிக்கையாளர் சந்திப்பில் மும்முரமாக உள்ளார்.' },
        'ready': { tamil: 'தயாராக', sound: 'ரெடி', pos: 'Adjective', ex: 'Are you ready for English conversation?', taEx: 'நீங்கள் ஆங்கில உரையாடலுக்குத் தயாரா?' },
        'clean': { tamil: 'சுத்தமான', sound: 'க்ளீன்', pos: 'Adjective', ex: 'Keep your room clean and organized.', taEx: 'உங்கள் அறையைத் தூய்மையாகவும் ஒழுங்காகவும் வைத்திருங்கள்.' },
        'new': { tamil: 'புதிய', sound: 'நியூ', pos: 'Adjective', ex: 'I started learning a new English word today.', taEx: 'நான் இன்று ஒரு புதிய ஆங்கில வார்த்தையைக் கற்கத் தொடங்கினேன்.' },
        'old': { tamil: 'பழைய', sound: 'ஓல்ட்', pos: 'Adjective', ex: 'Old friends are precious treasures.', taEx: 'பழைய நண்பர்கள் விலைமதிப்பற்ற பொக்கிஷங்கள்.' },
        'right': { tamil: 'சரி / வலதுபக்கம்', sound: 'ரைட்', pos: 'Adjective', ex: 'Your English sentence is absolutely right!', taEx: 'உங்கள் ஆங்கில வாக்கியம் முற்றிலும் சரியானது!' },
        'wrong': { tamil: 'தவறான', sound: 'ராங்', pos: 'Adjective', ex: 'Mistakes are natural; never fear being wrong.', taEx: 'தவறுகள் சகஜம்; தவறாகி விடுமோ என்று ஒருபோதும் அஞ்சாதீர்கள்.' },
        'please': { tamil: 'தயவுசெய்து', sound: 'ப்ளீஸ்', pos: 'Adverb', ex: 'Please have a cup of tea.', taEx: 'தயவுசெய்து ஒரு கோப்பை தேநீர் அருந்துங்கள்.' },
        'thanks': { tamil: 'நன்றி', sound: 'தேங்க்ஸ்', pos: 'Interjection', ex: 'Thanks for your kind support.', taEx: 'உங்கள் அன்பான ஆதரவிற்கு நன்றி.' },
        'sorry': { tamil: 'மன்னிக்கவும்', sound: 'ஸாரி', pos: 'Interjection', ex: 'Sorry for keeping you waiting.', taEx: 'உங்களைக் காத்திருக்க வைத்ததற்கு மன்னிக்கவும்.' },
        'welcome': { tamil: 'வரவேற்பு / நல்வரவு', sound: 'வெல்கம்', pos: 'Interjection', ex: 'You are always welcome here.', taEx: 'நீங்கள் எப்போதும் இங்கு வரவேற்கப்படுகிறீர்கள்.' }
    };

    // Auto-merge EVERYDAY_DICT into WORDS_DATA so all 100+ daily words are in the main vocabulary system!
    Object.entries(EVERYDAY_DICT).forEach(([k, val]) => {
        if (!WORDS_DATA.some(w => w.word.toLowerCase() === k.toLowerCase())) {
            let cat = 'daily';
            if (['office', 'work', 'call', 'buy', 'sell', 'money', 'job', 'pay', 'market', 'shop', 'price', 'busy'].includes(k)) cat = 'office';
            else if (['happy', 'good', 'bad', 'love', 'feel', 'beautiful', 'sad', 'tired', 'angry'].includes(k)) cat = 'feelings';
            else if (['car', 'go', 'come', 'city', 'village', 'hospital', 'doctor', 'bus', 'train', 'road'].includes(k)) cat = 'travel';

            WORDS_DATA.push({
                word: k.charAt(0).toUpperCase() + k.slice(1),
                pos: val.pos || 'Word',
                phonetic: val.sound,
                tamilMeaning: val.tamil,
                exampleEn: val.ex,
                exampleTa: val.taEx,
                cat: cat
            });
        }
    });

    // ==========================================
    // 3. APPLICATION STATE
    // ==========================================
    const state = {
        activeTab: 'chat',
        mode: 'conversation', // 'conversation', 'grammar', 'pronunciation'
        aiProvider: localStorage.getItem('sw_ai_provider') || 'pollinations',
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

            // Route based on selected provider
            if (state.aiProvider === 'groq' && state.groqKey) {
                try {
                    return await aiEngine.callGroq(systemPrompt, userPrompt);
                } catch (e) {
                    console.warn('Groq failed, falling back to Free Pollinations AI:', e.message);
                }
            }

            if (state.aiProvider === 'puter' && window.puter && window.puter.ai) {
                try {
                    const puterRes = await window.puter.ai.chat(`${systemPrompt}\n\nUser: ${userPrompt}`);
                    if (puterRes) return puterRes.toString().trim();
                } catch (e) {
                    console.warn('Puter.js failed, falling back to Pollinations:', e.message);
                }
            }

            // Default & Primary: Free Pollinations AI (Zero API key needed, unlimited)
            try {
                return await aiEngine.callPollinations(systemPrompt, userPrompt);
            } catch (err) {
                console.warn('Pollinations AI failed, using built-in Smart Offline Tutor:', err.message);
                return aiEngine.generateOfflineFallback(userPrompt);
            }
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
            const timeoutId = setTimeout(() => controller.abort(), 12000);

            const res = await fetch('https://text.pollinations.ai/', {
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
            const promptLower = userPrompt.toLowerCase();
            
            if (promptLower.includes('hello') || promptLower.includes('hi') || promptLower.includes('வணக்கம்')) {
                return `Hello there! I am delighted to practice English with you today. How is your day going so far? What did you have for breakfast?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Delighted" என்றால் "மிகவும் மகிழ்ச்சியடைகிறேன்" என்று அர்த்தம்.
- "How is your day going?" என்பது ஒருவருடன் பேச்சைத் தொடங்கும் ஒரு இயல்பான ஆங்கிலக் கேள்வி.
- பதில் கூற முயற்சி செய்யுங்கள்: "My day is going great! I had dosa for breakfast."`;
            }

            if (promptLower.includes('tense') || promptLower.includes('grammar') || promptLower.includes('இலக்கணம்')) {
                return `Grammar is easiest when learned through everyday speaking! For example, whenever you talk about your daily habit, always use Simple Present: "I wake up at 6 AM."

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- உங்கள் தினசரி வழக்கத்தைக் கூற Simple Present Tense பயன்படும்.
- "I wake up" (நான் எழுகிறேன்), "I go to work" (நான் வேலைக்குச் செல்கிறேன்).
- இப்போது உங்கள் வழக்கமான செயல்களில் ஒன்றை ஆங்கிலத்தில் கூறிப் பாருங்கள்!`;
            }

            return `That is a wonderful point! Practicing like this step-by-step is how you gain fluency. Could you tell me a little bit more about what you like to do on weekends?

💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):
- "Fluency" என்றால் "சரளமாகத் தடையின்றிப் பேசுதல்" என்று பொருள்.
- உங்கள் வாக்கியம் நன்றாக உள்ளது!
- வார இறுதி நாட்களைப் பற்றி கூறலாம்: "On weekends, I like to relax with my family and watch movies."`;
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
                        <span class="feature-pill">✨ 100% Free AI</span>
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
                        setTimeout(() => {
                            voiceManager.speakTamil(dictEntry.tamilMeaning + '. ' + (dictEntry.exampleTa || ''));
                        }, 2200);
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
                    voiceManager.speakEnglish(parsed.english);
                    if (parsed.tamil) {
                        setTimeout(() => {
                            voiceManager.speakTamil(parsed.tamil);
                        }, 2800);
                    }
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
                return {
                    english: text.substring(0, tamilMarker).trim(),
                    tamil: text.substring(tamilMarker).trim()
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

        renderTenseQuiz() {
            const quiz = TENSE_QUIZZES[state.currentTenseQuizIdx % TENSE_QUIZZES.length];
            dom.tenseQuizQuestion.textContent = quiz.question;
            dom.tenseQuizFeedback.className = 'quiz-feedback-box hidden';

            dom.tenseQuizOptions.innerHTML = quiz.options.map((opt, i) => `
                <button class="quiz-opt-btn" data-idx="${i}">
                    <strong>${['A', 'B', 'C', 'D'][i]}.</strong> ${opt}
                </button>
            `).join('');

            dom.tenseQuizOptions.querySelectorAll('.quiz-opt-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const selectedIdx = parseInt(btn.dataset.idx, 10);
                    const isCorrect = selectedIdx === quiz.correct;

                    dom.tenseQuizOptions.querySelectorAll('.quiz-opt-btn').forEach((b, idx) => {
                        b.disabled = true;
                        if (idx === quiz.correct) b.classList.add('correct');
                        if (idx === selectedIdx && !isCorrect) b.classList.add('incorrect');
                    });

                    dom.tenseQuizFeedback.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
                    dom.tenseQuizFeedback.innerHTML = `
                        <strong>${isCorrect ? '🎉 சரி! (Correct!)' : '❌ தவறான விடை (Oops!)'}</strong><br>
                        ${quiz.explanation}
                    `;
                    dom.tenseQuizFeedback.classList.remove('hidden');
                });
            });
        },

        nextTenseQuiz() {
            state.currentTenseQuizIdx++;
            tensesManager.renderTenseQuiz();
        }
    };

    // ==========================================
    // 9. DAILY WORDS & VOCABULARY MANAGER
    // ==========================================
    const wordsManager = {
        renderWordOfDay() {
            // Pick based on day of year
            const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            const wordObj = WORDS_DATA[dayOfYear % WORDS_DATA.length];

            dom.wordOfDayCard.innerHTML = `
                <div class="showcase-header">
                    <span class="showcase-badge">🌟 Word of the Day (இன்றைய முக்கிய வார்த்தை)</span>
                    <span class="word-phonetic">${wordObj.phonetic}</span>
                </div>
                <div class="word-main-row">
                    <h3 class="word-title">${wordObj.word}</h3>
                    <span class="word-pos">(${wordObj.pos})</span>
                </div>
                <div class="word-tamil-meaning-box">${wordObj.tamilMeaning}</div>
                <div class="word-example-box">
                    <div class="word-example-en">"${wordObj.exampleEn}"</div>
                    <div class="word-example-ta">${wordObj.exampleTa}</div>
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

            dom.wordOfDayCard.querySelector('.play-showcase-en').addEventListener('click', () => {
                voiceManager.speakEnglish(wordObj.word + '. ' + wordObj.exampleEn);
            });
            dom.wordOfDayCard.querySelector('.play-showcase-ta').addEventListener('click', () => {
                voiceManager.speakTamil(wordObj.tamilMeaning + '. ' + wordObj.exampleTa);
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
                    <div style="grid-column: 1 / -1; text-align:center; padding: 30px 20px; color: var(--text-muted);">
                        <p style="font-size: 1.1rem; margin-bottom: 8px;">No matching word found in current list.</p>
                        <p style="font-size: 0.88rem;">Click <strong>"Get Tamil Meaning"</strong> above to look up any English word with AI!</p>
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
                                <span>No local match for <strong>"${chatManager.escapeHtml(val)}"</strong>. Look up online with Free AI?</span>
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
        startScenario(scenarioKey) {
            const scenarios = {
                'job-interview': {
                    title: 'Job Interview',
                    intro: 'Good morning! Welcome to our interview. Please have a seat. Could you introduce yourself and tell me why you applied for this position?'
                },
                'restaurant': {
                    title: 'Restaurant & Food Ordering',
                    intro: 'Welcome to Royal Spice Restaurant! Table for two? Would you like to start with some hot soup or fruit mocktails?'
                },
                'travel': {
                    title: 'Airport & Travel',
                    intro: 'Good morning traveler! May I see your passport and flight booking ticket for baggage check-in?'
                },
                'doctor': {
                    title: 'Doctor Consultation',
                    intro: 'Hello, please come in. What symptoms or difficulties have you been experiencing recently?'
                },
                'shopping': {
                    title: 'Shopping & Bargaining',
                    intro: 'Hello sir! Welcome to our collection. Are you looking for shirts, jeans, or traditional outfits today?'
                },
                'casual-chat': {
                    title: 'Making New Friends',
                    intro: 'Hey! Nice to meet you. I am waiting for my friend at this cafe. Do you come here often?'
                }
            };

            const selected = scenarios[scenarioKey] || scenarios['job-interview'];
            tabManager.switchTab('chat');
            chatManager.addMessage('ai', `${selected.intro}\n\n💡 தமிழ் விளக்கம் (Tamil Meaning & Explanation):\n- நாம் இப்போது "${selected.title}" சூழல் பயிற்சியில் இருக்கிறோம்.\n- உங்கள் பதிலை ஆங்கிலத்தில் கூறிப் பழகுங்கள்!`);
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
                tenses: 'Daily Tenses Mastery',
                words: 'Daily Vocabulary',
                roleplay: 'Roleplay Drills',
                settings: 'Voice & AI Settings'
            };
            const subtitles = {
                chat: 'Spoken English Tutor with Tamil Voice',
                tenses: '12 English Tenses with Tamil Rules & Audio',
                words: 'Words, Tamil Meaning, Pronunciation & Quizzes',
                roleplay: 'Practice Real Life English Scenarios',
                settings: 'AI Provider, Voice Pitch & Learning Level'
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
        // Tab switching
        dom.navItems.forEach(n => n.addEventListener('click', () => tabManager.switchTab(n.dataset.tab)));
        dom.mobileNavBtns.forEach(b => b.addEventListener('click', () => tabManager.switchTab(b.dataset.tab)));

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
        dom.aiProviderSelect.value = state.aiProvider;
        dom.aiProviderSelect.addEventListener('change', () => {
            state.aiProvider = dom.aiProviderSelect.value;
            localStorage.setItem('sw_ai_provider', state.aiProvider);
            dom.groqKeyContainer.classList.toggle('hidden', state.aiProvider !== 'groq');
            dom.sidebarProviderLabel.textContent = state.aiProvider === 'groq' ? 'Groq Cloud Active' : 'Free AI Active · No Key Needed';
        });

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

        // Initialize sub-systems
        voiceManager.init();
        chatManager.renderWelcome();
        tensesManager.renderTenses('all');
        tensesManager.renderTenseQuiz();
        wordsManager.renderWordOfDay();
        wordsManager.renderWordsList('all');
        wordsManager.renderVocabQuiz();
        wordsManager.initWordSearch();
        dom.vocabScoreBadge.textContent = `Score: ${state.vocabScore}`;
    }

    // Start App
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
