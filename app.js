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
            // Pick an unseen word if available
            const unseen = WORDS_DATA.filter(w => !state.seenWords.has(w.word.toLowerCase()));
            const wordObj = unseen.length > 0 ? unseen[0] : WORDS_DATA[0];
            wordsManager.renderWordOfDayCard(wordObj);
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

        async generateAIWord() {
            dom.wordOfDayCard.innerHTML = `
                <div style="text-align:center; padding:28px 16px; color:var(--text-muted);">
                    <span class="typing-dot"></span> AI is selecting a brand new, non-repeating spoken English word with Tamil meaning...
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
  "exampleTa": "பல இன்னல்களை எதிர்கொண்ட போதிலும் அவள் மன உறுதியோடு இருந்தாள்."
}`;

            try {
                const reply = await aiEngine.generateReply(prompt);
                let match = reply.match(/\{[\s\S]*\}/);
                let newWord = null;
                if (match) {
                    try {
                        newWord = JSON.parse(match[0]);
                    } catch (e) {}
                }

                if (!newWord || !newWord.word) {
                    const unseen = WORDS_DATA.filter(w => !state.seenWords.has(w.word.toLowerCase()));
                    newWord = unseen.length > 0 ? unseen[Math.floor(Math.random() * unseen.length)] : WORDS_DATA[Math.floor(Math.random() * WORDS_DATA.length)];
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
            } catch (err) {
                console.warn('AI word generation error:', err);
                wordsManager.renderWordOfDay();
            }
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
    "exampleTa": "நீங்கள் தினமும் தொடர்ந்து முயற்சி செய்தால் உங்கள் ஆங்கிலம் சரளமாகும்."
  }
]`;

            try {
                const reply = await aiEngine.generateReply(prompt);
                let match = reply.match(/\[\s*\{[\s\S]*\}\s*\]/);
                if (match) {
                    const batch = JSON.parse(match[0]);
                    batch.forEach(w => {
                        state.seenWords.add(w.word.toLowerCase());
                        const exIdx = WORDS_DATA.findIndex(x => x.word.toLowerCase() === w.word.toLowerCase());
                        if (exIdx >= 0) WORDS_DATA.splice(exIdx, 1);
                        WORDS_DATA.unshift({ ...w, cat: 'daily' });
                    });
                    localStorage.setItem('sw_seen_words', JSON.stringify(Array.from(state.seenWords)));
                    wordsManager.renderWordsList(state.currentVocabCat);
                    wordsManager.renderWordOfDayCard(batch[0]);
                }
            } catch (e) {
                console.warn('Batch words error:', e);
            } finally {
                dom.aiGenerateBatchWordsBtn.disabled = false;
                dom.aiGenerateBatchWordsBtn.textContent = '📚 Generate 5 New Words';
            }
        },

        async generateAIVocabQuiz() {
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
    // 10.5. READING PRACTICE & PRONUNCIATION TEST STUDIO (BIG SENTENCES & AI ENGINE)
    // ==========================================
    const readingManager = {
        passages: {
            'daily-life': {
                beginner: {
                    big: {
                        title: 'The Joy of Morning Filter Coffee and Tamil Family Traditions',
                        badge: '🌱 Beginner · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Every morning across countless homes in Tamil Nadu, the entire neighborhood comes alive with the irresistible aroma of freshly brewed filter coffee pouring into traditional brass dabarah sets. Waking up before the sunrise, family members gather together in the kitchen to share peaceful moments and enjoy their hot beverages, which immediately provides boundless energy for the busy hours ahead. While the morning newspapers arrive and temple bells gently chime in the background, parents and children engage in cheerful conversations about their daily schedules and future goals. Consequently, taking time to savor this simple morning ritual not only awakens the body and mind, but also strengthens the emotional bond that keeps the entire household harmoniously united.',
                        ta: 'தமிழ்நாட்டில் உள்ள எண்ணற்ற வீடுகளில் ஒவ்வொரு காலையும் பாரம்பரிய பித்தளை டவரா செட்களில் சுடச்சுட வார்க்கப்படும் ஃபில்டர் காபியின் அலாதியான நறுமணத்துடன் விடியல் தொடங்குகிறது. சூரிய உதயத்திற்கு முன்பே எழுந்து, குடும்ப உறுப்பினர்கள் சமையலறையில் கூடி அமைதியான தருணங்களைப் பகிர்ந்து கொண்டு சூடான காபியை ரசிக்கிறார்கள்; இது வரவிருக்கும் பரபரப்பான நேரத்திற்கு அளப்பரிய ஆற்றலை உடனே தருகிறது. காலை நாளிதழ்கள் வந்துசேர, பின்னணியில் கோவில் மணிகள் மெல்ல ஒலிக்க, பெற்றோர்களும் குழந்தைகளும் தங்களின் அன்றாட பணிகள் மற்றும் இலக்குகளைப் பற்றி உற்சாகமாக உரையாடுகிறார்கள். எனவே, இந்த எளிய காலை வழக்கத்தை ரசித்து அனுபவிப்பது உடலையும் மனதையும் புத்துணர்ச்சியடையச் செய்வது மட்டுமல்லாமல், ஒட்டுமொத்த குடும்பத்தையும் அன்பால் ஒன்றிணைக்கும் உணர்வுபூர்வமான பிணைப்பையும் பலப்படுத்துகிறது.'
                    },
                    short: {
                        title: 'A Morning Cup of Filter Coffee',
                        badge: '🌱 Beginner · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Every morning in Tamil Nadu starts with the aroma of hot filter coffee. Families wake up early and enjoy their fresh morning brew together. It gives great energy and brings everyone together before a busy day begins.',
                        ta: 'தமிழ்நாட்டில் ஒவ்வொரு காலையும் சுடச்சுட ஃபில்டர் காபியின் நறுமணத்துடன் தொடங்குகிறது. குடும்பங்கள் அதிகாலையில் எழுந்து புத்துணர்ச்சியூட்டும் காலைக் காபியை ஒன்றாக ருசிக்கிறார்கள். இது நல்ல சுறுசுறுப்பை அளித்து, ஒரு பரபரப்பான நாள் தொடங்குவதற்கு முன் அனைவரையும் ஒன்றிணைக்கிறது.'
                    }
                },
                intermediate: {
                    big: {
                        title: 'The Rejuvenating Magic of Saturday Mornings by the Beach',
                        badge: '📚 Intermediate · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'After enduring an exceptionally exhausting work week filled with endless meetings and tight deadlines, relaxing on a breezy Saturday morning provides an incomparable sense of physical and mental renewal. Countless city dwellers choose to take an early stroll along the sandy shores of Marina beach, where the crisp ocean wind and rhythmic crashing of waves wash away every lingering stress of the corporate world. Meanwhile, others prefer spending these quiet weekend hours diving into thought-provoking literature, listening to soulful melodies, or preparing elaborate homemade brunches for their families. Ultimately, carving out intentional space for genuine relaxation not only restores our creative vitality, but also equips us with the clarity and resilience needed to conquer future aspirations.',
                        ta: 'முடிவில்லாத சந்திப்புகளும் கடுமையான காலக்கெடுவும் நிறைந்த ஒரு பரபரப்பான வேலை வாரத்திற்குப் பிறகு, இதமான சனிக்கிழமை காலை ஓய்வெடுப்பது உடலுக்கும் மனதுக்கும் ஈடு இணையற்ற புத்துணர்ச்சியை அளிக்கிறது. பல நகர மக்கள் மெரினா கடற்கரையின் மணற்பரப்பில் அதிகாலை நடைப்பயிற்சி செய்வதைத் தேர்வு செய்கிறார்கள்; அங்கு வீசும் புத்துணர்ச்சியூட்டும் கடல் காற்றும் சீரான அலைகளின் ஓசையும் கார்ப்பரேட் உலகின் அனைத்து மன அழுத்தங்களையும் விரட்டியடிக்கின்றன. அதே நேரத்தில், மற்றவர்கள் இந்த அமைதியான வார இறுதி நேரங்களை சிந்தனையைத் தூண்டும் புத்தகங்களைப் படிப்பதிலும், மெல்லிய இசையைக் கேட்பதிலும், குடும்பத்தினருக்கு விருப்பமான உணவுகளைச் சமைப்பதிலும் கழிக்க விரும்புகிறார்கள். இறுதியில், ஓய்வுக்காகத் திட்டமிட்டு நேரம் ஒதுக்குவது நமது படைப்பாற்றல் திறனை மீட்டெடுப்பது மட்டுமல்லாமல், எதிர்கால லட்சியங்களை வெல்வதற்குத் தேவையான மனத் தெளிவையும் உறுதியையும் நமக்கு வழங்குகிறது.'
                    },
                    short: {
                        title: 'The Art of Weekend Relaxation',
                        badge: '📚 Intermediate · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'After a hectic work week, relaxing on Saturday morning is truly rejuvenating. Some people prefer taking a peaceful morning walk along the Marina beach, feeling the gentle sea breeze. Others love spending quiet hours reading inspiring books or preparing special homemade meals for their loved ones.',
                        ta: 'ஒரு பரபரப்பான வேலை வாரத்திற்குப் பிறகு, சனிக்கிழமை காலை ஓய்வெடுப்பது புத்துணர்ச்சி அளிக்கும் விஷயமாகும். சிலர் மெரினா கடற்கரையில் அமைதியான காலை நடைப்பயிற்சி மேற்கொண்டு, இதமான கடல் காற்றை ரசிக்க விரும்புகிறார்கள்.'
                    }
                },
                advanced: {
                    big: {
                        title: 'Cultivating Resilience and the Modern Growth Mindset',
                        badge: '🚀 Advanced · 📜 Big Sentences',
                        est: '⏱️ ~3 min read · Click any word for Tamil meaning',
                        en: 'In an era characterized by rapid technological disruption and unpredictable socioeconomic shifts, cultivating profound mental resilience and intellectual curiosity empowers individuals to navigate unprecedented complexities with poise and wisdom. When professionals view setbacks not as permanent defeats but rather as invaluable learning catalysts, they naturally unlock higher levels of creativity, adaptability, and emotional intelligence. Furthermore, proactively soliciting and thoughtfully integrating constructive feedback inevitably accelerates long-term career growth, while dismantling the crippling fear of making mistakes. Therefore, true personal mastery lies in embracing continuous self-evolution, fostering empathy in communication, and remaining steadfast in our pursuit of purposeful excellence.',
                        ta: 'விரைவான தொழில்நுட்ப மாற்றங்களும் கணிக்க முடியாத சமூக-பொருளாதார ஏற்ற இறக்கங்களும் நிறைந்த இக்காலகட்டத்தில், ஆழ்ந்த மன உறுதியையும் அறிவார்ந்த ஆர்வத்தையும் வளர்த்துக்கொள்வது, முன்னெப்போதும் இல்லாத சிக்கல்களை அமைதியோடும் விவேகத்தோடும் எதிர்கொள்ள மக்களுக்கு உதவுகிறது. தொழில் வல்லுநர்கள் பின்னடைவுகளை நிரந்தரத் தோல்விகளாகப் பார்க்காமல் விலைமதிப்பற்ற கற்றல் வாய்ப்புகளாகக் கருதும் போது, அவர்கள் இயற்கையாகவே அதிக அளவிலான படைப்பாற்றல், சூழ்நிலைக்கு ஏற்ப மாறும் தன்மை மற்றும் உணர்ச்சிசார் நுண்ணறிவை வெளிப்படுத்துகிறார்கள். மேலும், ஆக்கபூர்வமான கருத்துக்களை முன்வந்து கேட்டு அவற்றைச் சிந்தித்துச் செயல்படுத்துவது நீண்டகால தொழில் வளர்ச்சியைத் துரிதப்படுத்துவதோடு, தவறு செய்துவிடுவோமோ என்ற அச்சத்தையும் தகர்த்தெறிகிறது. எனவே, உண்மையான மனித மேன்மை என்பது தொடர்ச்சியான சுய முன்னேற்றத்தை ஏற்றுக்கொள்வதிலும், இரக்கத்துடன் பேசுவதிலும், அர்த்தமுள்ள சிறப்பை அடைவதில் உறுதியாக இருப்பதிலுமே அடங்கியுள்ளது.'
                    },
                    short: {
                        title: 'Mastering the Mindset of Continuous Growth',
                        badge: '🚀 Advanced · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Cultivating resilience and intellectual curiosity empowers individuals to navigate unprecedented challenges with composure. Embracing constructive feedback rather than resisting it inevitably accelerates personal and professional development.',
                        ta: 'மன உறுதியையும் அறிவார்ந்த ஆர்வத்தையும் வளர்த்துக் கொள்வது, முன்னெப்போதும் இல்லாத சவால்களை அமைதியோடு எதிர்கொள்ள மனிதர்களுக்கு ஆற்றலை அளிக்கிறது. ஆக்கபூர்வமான கருத்துக்களை மறுக்காமல் ஏற்றுக் கொள்வது தனிப்பட்ட மற்றும் தொழில்முறை வளர்ச்சியை துரிதப்படுத்துகிறது.'
                    }
                }
            },
            'office-work': {
                beginner: {
                    big: {
                        title: 'Stepping Into the Modern Corporate Workplace',
                        badge: '🌱 Beginner · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Arriving at the software technology park on my very first morning, I felt a dynamic mix of nervous anticipation and tremendous enthusiasm as I walked through the gleaming glass entrance. My project manager welcomed me with a warm and reassuring handshake, immediately introducing me to kind colleagues who were eager to show me around the modern office facilities and explain our team objectives. Over a friendly cup of tea in the cafeteria, experienced team members patiently answered my questions regarding daily workflows and shared practical advice on how to collaborate smoothly. By the end of the orientation session, all my initial hesitations had completely vanished, leaving me feeling deeply motivated and genuinely proud to embark on this promising professional career journey.',
                        ta: 'எனது முதல் நாள் காலையில் மென்பொருள் தொழில்நுட்பப் பூங்காவிற்கு வந்தபோது, பளபளக்கும் கண்ணாடி நுழைவாயில் வழியே நுழைகையில் எனக்குள் ஒருவித பதற்றமும் அதே சமயம் அளவற்ற உற்சாகமும் கலந்திருந்தது. எனது திட்ட மேலாளர் புன்னகையுடனும் கனிவான கைக்குலுக்கலுடனும் என்னை வரவேற்று, அலுவலக வசதிகளைச் சுற்றிக் காட்டவும் எங்கள் குழுவின் நோக்கங்களை விவரிக்கவும் தயாராக இருந்த அன்பான சகாக்களுக்கு என்னை உடனடியாக அறிமுகப்படுத்தினார். சிற்றுண்டிச்சாலையில் சுவையான தேநீர் அருந்தியபடி, அனுபவம் வாய்ந்த குழு உறுப்பினர்கள் அன்றாட பணி நடைமுறைகள் குறித்த எனது சந்தேகங்களுக்குப் பொறுமையாகப் பதிலளித்து, மற்றவர்களுடன் சுமுகமாக இணைந்து பணியாற்றுவது குறித்த நடைமுறை ஆலோசனைகளைப் பகிர்ந்துகொண்டனர். அறிமுக அமர்வு முடியும் போது, எனது ஆரம்பகால தயக்கங்கள் அனைத்தும் முற்றிலும் மறைந்து, இந்த சிறந்த தொழில் பயணத்தைத் தொடங்குவதில் நான் மிகுந்த உந்துதலையும் உண்மையான பெருமையையும் உணர்ந்தேன்.'
                    },
                    short: {
                        title: 'My First Day at Office',
                        badge: '🌱 Beginner · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Today is my first day at the new software office. My manager introduced me to the entire team with a warm smile. Everyone was helpful and showed me my workstation. I am excited to learn new skills here.',
                        ta: 'இன்று புதிய மென்பொருள் அலுவலகத்தில் எனது முதல் நாள். எனது மேலாளர் புன்னகையோடு என்னை முழு குழுவிற்கும் அறிமுகப்படுத்தினார். அனைவரும் உதவிகரமாக இருந்து எனது பணி இடத்தைக் காட்டினார்கள்.'
                    }
                },
                intermediate: {
                    big: {
                        title: 'Delivering High-Impact Corporate Presentations with Confidence',
                        badge: '📚 Intermediate · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Clear and persuasive verbal communication represents the undeniable cornerstone of professional credibility, particularly when presenting critical strategic proposals before senior international stakeholders. Prior to stepping into the boardroom, successful professionals diligently organize their key arguments into concise visual slides, rehearse their vocal pacing, and anticipate probing inquiries that might challenge their proposals. While explaining complex software architectures or financial forecasts, maintaining steady eye contact and employing precise industry vocabulary enables speakers to project unwavering authority and inspire confidence. Ultimately, transforming anxiety into poised enthusiasm ensures that your innovative proposals are not merely heard, but enthusiastically approved by organizational decision-makers.',
                        ta: 'தெளிவான மற்றும் ஈர்க்கக்கூடிய பேச்சுத் தொடர்பு என்பது தொழில்முறைக் களத்தில் நம்பகத்தன்மையின் மறுக்க முடியாத அடித்தளமாகும்; குறிப்பாக மூத்த சர்வதேசத் தலைவர்கள் முன் முக்கியமான மூலோபாயத் திட்டங்களை முன்வைக்கும் போது இது மிகவும் அவசியமாகிறது. கூட்ட அறைக்குள் நுழைவதற்கு முன், வெற்றிகரமான தொழில் வல்லுநர்கள் தங்கள் முக்கிய வாதங்களை நேர்த்தியான காட்சிகளாக ஒழுங்கமைத்து, பேசும் வேகத்தைப் பயிற்சி செய்து, தங்கள் திட்டத்திற்கு வரக்கூடிய கடினமான கேள்விகளை முன்கூட்டியே கணிக்கிறார்கள். சிக்கலான மென்பொருள் வடிவமைப்பு அல்லது நிதிநிலை அறிக்கைகளை விளக்கும் போது, பார்வையாளர்களை நேருக்கு நேர் பார்த்து துல்லியமான சொற்களைப் பயன்படுத்துவது பேச்சாளரின் தன்னம்பிக்கையையும் அதிகாரத்தையும் வெளிப்படுத்துகிறது. இறுதியில், பதற்றத்தைத் தன்னம்பிக்கையாக மாற்றுவது உங்கள் புதிய யோசனைகளை வெறும் கருத்துக்களாக அல்லாமல், நிறுவன முடிவெடுப்பவர்களால் உற்சாகமாக ஏற்றுக்கொள்ளப்படும் வெற்றிகரமான திட்டங்களாக மாற்றுகிறது.'
                    },
                    short: {
                        title: 'Preparing for an Effective Client Meeting',
                        badge: '📚 Intermediate · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Clear communication is the cornerstone of successful corporate collaboration. Before entering a high-stakes presentation, it is essential to organize your key talking points clearly, anticipate tough questions, and speak with steady confidence.',
                        ta: 'தெளிவான தகவல் பரிமாற்றமே வெற்றிகரமான நிறுவன ஒத்துழைப்பின் அடித்தளமாகும். ஒரு முக்கியமான விளக்கக்காட்சியில் நுழைவதற்கு முன், முக்கிய கருத்துக்களைத் தெளிவாக ஒழுங்கமைத்து தன்னம்பிக்கையுடன் பேசுவது அவசியமாகும்.'
                    }
                },
                advanced: {
                    big: {
                        title: 'Transformational Leadership and Cross-Functional Synergies',
                        badge: '🚀 Advanced · 📜 Big Sentences',
                        est: '⏱️ ~3 min read · Click any word for Tamil meaning',
                        en: 'Visionary leadership in high-velocity tech ecosystems transcends conventional task delegation, demanding instead the deliberate cultivation of psychological safety where team members feel intrinsically inspired to voice bold innovations. When departmental silos are systematically dissolved in favor of transparent, interdisciplinary collaboration, engineering velocity and client satisfaction experience unprecedented exponential gains. Moreover, emotionally intelligent leaders consistently model intellectual humility by actively listening to diverse perspectives, celebrating constructive dissent, and prioritizing long-term mentorship over short-term expediency. As organizations expand globally, this unwavering commitment to empathetic excellence and meritocracy distinguishes enduring market pioneers from transient enterprises.',
                        ta: 'வேகமாக வளரும் தொழில்நுட்பச் சூழலில் தொலைநோக்குத் தலைமைத்துவம் என்பது வழக்கமான பணிகளைப் பகிர்ந்தளிப்பதை விட மேலானது; துணிச்சலான புதுமைகளை அச்சமின்றி வெளிப்படுத்த குழு உறுப்பினர்களை ஊக்குவிக்கும் ஒரு பாதுகாப்பான சூழலை உருவாக்குவது இதற்கு அவசியமாகிறது. துறைசார்ந்த தடைகள் தகர்க்கப்பட்டு வெளிப்படையான, பல்துறை ஒருங்கிணைப்பு ஏற்படும் போது, உற்பத்தி வேகமும் வாடிக்கையாளர் திருப்தியும் வியத்தகு முறையில் பன்மடங்கு உயர்கிறது. மேலும், சிறந்த தலைவர்கள் பல்வேறு மாறுபட்ட கருத்துக்களைக் கூர்ந்து கவனிப்பதன் மூலமும், ஆக்கபூர்வமான கருத்து வேறுபாடுகளை வரவேற்பதன் மூலமும், குறுகிய கால லாபத்தை விட நீண்டகால வழிகாட்டுதலுக்கு முன்னுரிமை அளிப்பதன் மூலமும் முன்மாதிரியாகத் திகழ்கிறார்கள். நிறுவனங்கள் உலகளவில் விரிவடையும் போது, மனிதநேய மேன்மைக்கும் திறமைக்கும் அளிக்கப்படும் இந்த அசைக்க முடியாத முக்கியத்துவமே ஒரு நிறுவனத்தை நீண்டகால சந்தை முன்னோடியாக நிலைநிறுத்துகிறது.'
                    },
                    short: {
                        title: 'Strategic Leadership and Team Synergy',
                        badge: '🚀 Advanced · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Exemplary leadership hinges upon the ability to articulate a compelling vision while fostering psychological safety across diverse teams. High-performing organizations consistently prioritize transparency and meritocracy.',
                        ta: 'சிறந்த தலைமைத்துவம் என்பது பன்முகத்தன்மை கொண்ட குழுக்களுக்கு உளவியல் ரீதியான பாதுகாப்பை வழங்குவதோடு, ஒரு வலுவான தொலைநோக்குப் பார்வையைத் தெளிவாக எடுத்துரைக்கும் திறனைப் பொறுத்தது.'
                    }
                }
            },
            'travel': {
                beginner: {
                    big: {
                        title: 'The Thrilling Experience of Boarding an International Flight',
                        badge: '🌱 Beginner · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Arriving at Chennai international airport several hours before departure, we marveled at the bustling terminal filled with globetrotters from diverse nations wheeling their luggage toward brightly illuminated check-in counters. After the polite airline agent verified our passports and handed us our stamped boarding passes with a pleasant smile, we proceeded through security clearance where officers efficiently scanned our hand baggage. Walking through the vibrant duty-free concourse toward our departure gate, the thrilling announcement echoed over the loudspeakers inviting passengers to board the aircraft. As we settled into our window seats and fastened our safety belts, looking out across the illuminated runway filled our hearts with immense excitement for the foreign lands awaiting us.',
                        ta: 'விமானம் புறப்படுவதற்கு பல மணி நேரங்களுக்கு முன்பே சென்னை சர்வதேச விமான நிலையத்தை அடைந்த நாங்கள், பல நாடுகளிலிருந்தும் வந்த பயணிகள் தங்களின் பயணப் பெட்டிகளை உருட்டியபடி பிரகாசமான செக்-இன் கவுண்டர்களை நோக்கிச் செல்லும் பரபரப்பான காட்சியை வியப்புடன் பார்த்தோம். கண்ணியமான விமான நிறுவனப் பணியாளர் எங்கள் கடவுச்சீட்டுகளைச் சரிபார்த்து புன்னகையுடன் போர்டிங் பாஸ்களை வழங்கியதும், அதிகாரிகள் எங்கள் கைப் பைகளை விரைவாக ஸ்கேன் செய்த பாதுகாப்புப் பிரிவைக் கடந்து சென்றோம். வண்ணமயமான டியூட்டி-ஃப்ரீ பகுதியைக் கடந்து போர்டிங் கேட்டை நோக்கி நடந்தபோது, பயணிகள் விமானத்தில் ஏறுமாறு ஒலிபெருக்கியில் ஒலித்த உற்சாகமான அறிவிப்பு கேட்டது. நாங்கள் எங்கள் சாளர இருக்கைகளில் அமர்ந்து பாதுகாப்பு பெல்ட்டுகளை அணிந்துகொண்டு, விளக்குகளால் ஒளிரும் ஓடுபாதையைப் பார்த்தபோது, எங்களை வரவேற்கக் காத்திருக்கும் வெளிநாடுகளைப் பற்றிய அளவற்ற மகிழ்ச்சி எங்கள் இதயத்தை நிறைத்தது.'
                    },
                    short: {
                        title: 'Boarding a Flight at the Airport',
                        badge: '🌱 Beginner · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'We arrived at Chennai airport two hours before departure. The security officer checked our identity card and boarding pass. Soon we boarded the aircraft and found our window seats comfortably.',
                        ta: 'விமானம் புறப்படுவதற்கு இரண்டு மணி நேரத்திற்கு முன்பே நாங்கள் சென்னை விமான நிலையத்திற்கு வந்தடைந்தோம். பாதுகாப்பு அதிகாரி எங்கள் அடையாள அட்டையையும் போர்டிங் பாஸையும் சரிபார்த்தார்.'
                    }
                },
                intermediate: {
                    big: {
                        title: 'A Journey Through the Architectural Splendors of Madurai',
                        badge: '📚 Intermediate · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Exploring ancient heritage cities like Madurai offers travelers a deeply mesmerizing glimpse into monumental Dravidian architecture, sacred history, and enduring artistic traditions that have flourished for thousands of years. As you gaze upward at the colossal, multi-tiered gopurams of the historic Meenakshi Amman Temple, you are immediately captivated by thousands of intricately carved and vibrantly painted stone sculptures depicting legendary tales and celestial beings. Walking along the cool stone corridors of the Thousand Pillar Hall, the extraordinary craftsmanship of ancient master sculptors becomes apparent as sunlight filters through ornate pillars, creating an ethereal ambiance of spiritual serenity. Without question, immersing oneself in such timeless heritage not only awakens a profound appreciation for historic artistry, but also reminds us of the extraordinary engineering genius of our ancestors.',
                        ta: 'மதுரை போன்ற பழமையான வரலாற்று நகரங்களில் பயணம் செய்வது ஆயிரக்கணக்கான ஆண்டுகளாகத் தழைத்தோங்கிய பிரம்மாண்டமான திராவிடக் கட்டிடக்கலை, புனித வரலாறு மற்றும் பாரம்பரியக் கலைகளைப் பற்றிய வியத்தகு காட்சியைப் பயணிகளுக்கு வழங்குகிறது. வரலாற்று சிறப்புமிக்க மீனாட்சி அம்மன் கோவிலின் பிரம்மாண்டமான பல அடுக்கு கோபுரங்களை அண்ணாந்து பார்க்கும்போது, புராணக் கதைகளையும் தேவதூதர்களையும் சித்தரிக்கும் ஆயிரக்கணக்கான நுணுக்கமாகச் செதுக்கப்பட்ட, வண்ணமயமான கல் சிற்பங்கள் உடனே மனதைக் கவர்கின்றன. ஆயிரம் கால் மண்டபத்தின் குளிர்ந்த கல் மண்டபங்களில் நடக்கும்போது, அலங்கரிக்கப்பட்ட தூண்களின் வழியே சூரிய ஒளி பாய்ந்து ஆன்மீக அமைதியின் தெய்வீகச் சூழலை உருவாக்குவதைக் காணும்போது பழங்கால சிற்பக் கலைஞர்களின் அபார கைத்திறன் தெளிவாகத் தெரிகிறது. இத்தகைய காலத்தால் அழியாத பாரம்பரியத்தில் நம்மை ஈடுபடுத்திக் கொள்வது வரலாற்று கலை மீதான ஆழ்ந்த மரியாதையைத் தூண்டுவதோடு மட்டுமல்லாமல், நமது முன்னோர்களின் வியக்கத்தக்க பொறியியல் அறிவையும் நினைவூட்டுகிறது.'
                    },
                    short: {
                        title: 'Exploring the Heritage Temples of Madurai',
                        badge: '📚 Intermediate · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Traveling through historic cities offers a mesmerizing glimpse into ancient architecture and vibrant cultural traditions. The towering gopurams of the Meenakshi temple showcase thousands of intricate stone sculptures carved centuries ago.',
                        ta: 'வரலாற்று சிறப்புமிக்க நகரங்களில் பயணம் செய்வது பழங்கால கட்டிடக்கலை மற்றும் பாரம்பரிய கலாச்சாரத்தைப் பற்றிய வியக்கத்தக்க காட்சியை வழங்குகிறது.'
                    }
                },
                advanced: {
                    big: {
                        title: 'The Transformative Wisdom of Global Exploration and Cultural Immersion',
                        badge: '🚀 Advanced · 📜 Big Sentences',
                        est: '⏱️ ~3 min read · Click any word for Tamil meaning',
                        en: 'Traversing distant continents and immersing oneself in unfamiliar cultural landscapes inevitably expands intellectual horizons while systematically dismantling deeply entrenched regional prejudices. When an inquisitive traveler ventures beyond predictable tourist enclaves into remote ancestral villages, observing how distinct communities resolve ecological and societal challenges fosters a profound appreciation for human diversity. Furthermore, confronting linguistic barriers and navigating unforeseen transit obstacles sharpens adaptive resilience, emotional composure, and diplomatic problem-solving skills under stressful conditions. Ultimately, the true essence of transformative travel lies not merely in chronicling exotic destinations, but in returning home with a permanently refined perspective that cherishes our shared global humanity.',
                        ta: 'தொலைதூரக் கண்டங்களில் பயணம் செய்து பழக்கமில்லாத கலாச்சார நிலப்பரப்புகளில் நம்மை முழுமையாக ஈடுபடுத்திக் கொள்வது, அறிவு எல்லைகளை விரிவுபடுத்துவதோடு குறுகிய மனப்பான்மையையும் தகர்த்தெறிகிறது. ஒரு ஆர்வமுள்ள பயணி வழக்கமான சுற்றுலா பகுதிகளைத் தாண்டி தொலைதூரக் கிராமங்களுக்குச் சென்று, வெவ்வேறு மக்கள் சுற்றுச்சூழல் மற்றும் சமூக சவால்களை எவ்வாறு எதிர்கொள்கிறார்கள் என்பதைக் கவனிக்கும் போது, அது மனித பன்முகத்தன்மை மீதான ஆழ்ந்த மதிப்பை உருவாக்குகிறது. மேலும், மொழித் தடைகளை எதிர்கொள்வதும் எதிர்பாராத பயணத் தடைகளைத் தாண்டுவதும் மன உறுதியையும், அமைதியையும், இக்கட்டான சூழ்நிலைகளில் பிரச்சினைகளைத் தீர்க்கும் சாதுரியத்தையும் கூர்மைப்படுத்துகிறது. இறுதியில், உண்மையான பயணத்தின் சாராம்சம் கவர்ச்சிகரமான இடங்களைப் பார்ப்பதில் மட்டுமல்ல; ஒட்டுமொத்த மனிதகுலத்தின் ஒற்றுமையை உணர்ந்து பக்குவப்பட்ட மனநிலையோடு வீடு திரும்புவதிலேயே உள்ளது.'
                    },
                    short: {
                        title: 'Navigating Cross-Continental Expeditions',
                        badge: '🚀 Advanced · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Traversing distant continents broadens intellectual horizons and dispels cultural parochialism. Adapting swiftly to unfamiliar customs and idioms cultivates an adaptable, cosmopolitan worldview.',
                        ta: 'தொலைதூரக் கண்டங்களில் பயணம் செய்வது அறிவு எல்லைகளை விரிவுபடுத்துகிறது மற்றும் குறுகிய மனப்பான்மையை போக்குகிறது.'
                    }
                }
            },
            'story': {
                beginner: {
                    big: {
                        title: 'The Honest Woodcutter and the River Guardian Spirit',
                        badge: '🌱 Beginner · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'While diligently chopping firewood near the bank of a swift mountain stream, an impoverished woodcutter accidentally slipped on the mossy stones, causing his sole iron axe to tumble into the deep, turbulent water. Devastated because the lost tool was the only source of livelihood for his beloved family, the humble laborer sat on the rocky riverbank and wept bitterly in helpless despair. Suddenly, the swirling waters parted and a benevolent golden-haired river guardian emerged, offering the weeping man a glittering golden axe followed by a magnificent silver axe, both of which he resolutely declined, insisting that his lost tool was merely ordinary iron. Profoundly touched by his unwavering integrity and moral courage, the pleased spirit not only retrieved his original humble tool, but joyfully gifted him both precious metal axes as an enduring reward for his unblemished truthfulness.',
                        ta: 'ஒரு வேகமான மலை ஓடையின் கரையில் விறகு வெட்டிக் கொண்டிருந்த ஒரு ஏழை விறகுவெட்டி, பாசி பிடித்த பாறைகளில் தவறி விழுந்ததால், அவரது ஒரே இரும்புக் கோடரி ஆழமான ஆற்று நீரில் மூழ்கியது. தனது குடும்பத்தைக் காப்பாற்றும் ஒரே வாழ்வாதாரமான அந்தக் கருவியை இழந்துவிட்டதால் கலங்கிப்போன அந்த எளிய மனிதர் ஆற்றங்கரையில் அமர்ந்து மிகுந்த வேதனையுடன் அழுதார். திடீரென்று, சுழன்றோடும் நீர் விலகி ஒரு அழகான பொன்நிற நீர் தேவதை தோன்றி, அழுதவரிடம் மின்னும் தங்கக் கோடரியையும், பின்னர் ஒரு வெள்ளி கோடரியையும் காட்டியது; ஆனால் அந்த நேர்மையான மனிதன் தனது கருவி சாதாரண இரும்பு மட்டுமே என்று கூறி இரண்டையும் உறுதியாக மறுத்துவிட்டார். அவரது அசைக்க முடியாத நேர்மையையும் ஒழுக்கத்தையும் கண்டு உள்ளம் நெகிழ்ந்த தேவதை, அவரது பழைய இரும்புக் கோடரியை மீட்டுக் கொடுத்தது மட்டுமல்லாமல், அவரது உண்மையான நேர்மைக்குப் பரிசாக அந்த இரண்டு விலையுயர்ந்த கோடரிகளையும் அவருக்கே மகிழ்ச்சியுடன் அன்பளிப்பாக வழங்கியது.'
                    },
                    short: {
                        title: 'The Honest Woodcutter',
                        badge: '🌱 Beginner · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'A poor woodcutter dropped his iron axe into a deep river. A water spirit appeared and offered him a golden axe, but the honest man refused to take it. Pleased by his truthfulness, the spirit rewarded him with both axes.',
                        ta: 'ஓர் ஏழை விறகுவெட்டி தனது இரும்புக் கோடரியை ஆழமான ஆற்றில் தவறவிட்டார். நீர் தேவதை தோன்றி அவரிடம் ஒரு தங்கக் கோடரியைக் கொடுத்தது, ஆனால் அவர் மறுத்துவிட்டார். அவரது நேர்மையைக் கண்டு மகிழ்ந்த தேவதை இரண்டு கோடரிகளையும் பரிசாக அளித்தது.'
                    }
                },
                intermediate: {
                    big: {
                        title: 'The Whispering Bamboo and the Unyielding Oak Tree',
                        badge: '📚 Intermediate · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Standing proudly upon an exposed hilltop, an ancient, colossal oak tree continuously mocked the slender bamboo stalks growing below in the valley, ridiculing their delicate stems and fragile posture whenever a light breeze swept across the meadow. When an unprecedented hurricane struck the countryside with deafening fury, the rigid oak stubbornly dug its thick roots into the rocky soil, refusing to yield an inch to the ferocious gale until its massive trunk suddenly cracked under immense strain. In sharp contrast, the supple bamboo clusters bowed gracefully before the roaring tempest, swaying harmoniously with the howling winds without suffering even the slightest fracture. When dawn broke over the serene valley, the fallen giant lay shattered in the dust, while the resilient bamboo stood upright, offering all witnesses an unforgettable life lesson that adaptability constitutes far greater strength than rigid arrogance.',
                        ta: 'ஒரு உயரமான மலை உச்சியில் கம்பீரமாக நின்ற பழமையான பெரிய ஓக் மரம், பள்ளத்தாக்கில் வளர்ந்த மெல்லிய மூங்கில் மரங்களை எப்போதும் ஏளனம் செய்தது; புல்வெளியில் லேசான காற்று வீசும் போதெல்லாம் அவற்றின் மெல்லிய தண்டுகளையும் வளையும் தன்மையையும் பார்த்து எள்ளி நகையாடியது. ஒருநாள் முன்னெப்போதும் இல்லாத கொடூரமான சூறாவளி காற்று காட்டைத் தாக்கிய போது, இறுக்கமான ஓக் மரம் தனது தடிமனான வேர்களால் பாறையைப் பற்றிப் பிடித்துக் கொண்டு, முரட்டுத்தனமாக நின்று இறுதியில் காற்றின் கடுமையான அழுத்தத்தால் வேரோடு முறிந்து விழுந்தது. ஆனால் நெகிழ்வான மூங்கில் கூட்டங்களோ சீறிப்பாய்ந்த புயலுக்கு ஏற்ப அழகாக வளைந்து கொடுத்து, ஒரு சிறு சேதமும் இன்றி காற்றுடன் இசைவாக ஆடி நின்றன. மறுநாள் விடியலில் புயல் ஓய்ந்தபோது, வீழ்ந்த பெரிய மரம் மண்ணில் சிதைந்து கிடந்தது; ஆனால் தலைநிமிர்ந்து நின்ற மூங்கில்கள், முரட்டுத்தனமான அகந்தையை விட நெகிழ்வுத்தன்மையே உண்மையான வலிமை என்ற மறக்க முடியாத வாழ்வியல் பாடத்தை அனைவருக்கும் உணர்த்தின.'
                    },
                    short: {
                        title: 'The Bamboo and the Mighty Oak',
                        badge: '📚 Intermediate · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'During a violent hurricane, the rigid oak tree stood stubbornly against the gale until its trunk snapped. In contrast, the flexible bamboo bent gracefully with the wind and survived unscathed. Flexibility is often greater strength than brute resistance.',
                        ta: 'ஒரு கடுமையான புயலின் போது, விறைப்பான ஓக் மரம் பிடிவாதமாக நின்று இறுதியில் முறிந்து விழுந்தது. ஆனால் நெகிழ்வான மூங்கில் காற்றுக்கு ஏற்ப அழகாக வளைந்து சேதமின்றி தப்பியது.'
                    }
                },
                advanced: {
                    big: {
                        title: 'The Paradox of Fleeting Ambition and the Treasure of Simplicity',
                        badge: '🚀 Advanced · 📜 Big Sentences',
                        est: '⏱️ ~3 min read · Click any word for Tamil meaning',
                        en: 'In our relentless societal obsession with accumulating extrinsic accolades, financial dominion, and transient prestige, individuals frequently forfeit the tranquil serenity that blossoms within conscious simplicity and genuine self-awareness. Mesmerized by the intoxicating illusion that forthcoming accomplishments will finally bestow lasting gratification, ambitious strivers perpetually postpone their happiness, failing to realize that each milestone merely introduces new burdens of anxiety. When philosophical introspection prompts us to disentangle our self-worth from ephemeral status symbols, we instantly unlock an inexhaustible reservoir of inner contentment that external volatility cannot diminish. Consequently, genuine wisdom consists not in the insatiable pursuit of excess, but in the contemplative appreciation of life’s unadorned blessings unfolding here in this precious, ephemeral present.',
                        ta: 'வெளிப்புறப் புகழையும், செல்வ ஆதிக்கத்தையும், தற்காலிக கௌரவத்தையும் குவிப்பதில் வெறித்தனமாக இயங்கும் சமூகம், எளிமையிலும் சுய விழிப்புணர்விலும் மலரும் அமைதியை அடிக்கடி இழந்துவிடுகிறது. எதிர்கால சாதனைகள் மட்டுமே உண்மையான மகிழ்ச்சியைத் தரும் என்ற மாயையில் மயங்கி, லட்சியவாதிகள் தங்கள் நிகழ்கால அமைதியைத் தள்ளிப்போடுகிறார்கள்; ஆனால் ஒவ்வொரு மைல்கல்லும் புதிய கவலைகளை மட்டுமே உருவாக்குகிறது என்பதை அவர்கள் உணர்வதில்லை. தத்துவார்த்த சுயபரிசோதனை நமது சுயமதிப்பை ஆடம்பர மாயைகளிலிருந்து விடுவிக்கும் போது, வெளிப்புற மாற்றங்களால் அழிக்க முடியாத எல்லையற்ற மன அமைதியை நாம் உடனடியாகப் பெறுகிறோம். எனவே, உண்மையான ஞானம் என்பது முடிவில்லாத பேராசையில் இல்லை; மாறாக இந்த அருமையான நிகழ்கணத்தில் நம்மைச் சுற்றியுள்ள எளிய ஆசீர்வாதங்களை உணர்ந்து மனநிறைவோடு வாழ்வதிலேயே உள்ளது.'
                    },
                    short: {
                        title: 'The Paradox of Fleeting Ambition',
                        badge: '🚀 Advanced · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'In our relentless pursuit of extrinsic accolades, we frequently overlook the profound tranquility inherent in simplicity. True contentment is seldom derived from perpetual accumulation, but rather from the discerning appreciation of the present moment.',
                        ta: 'வெளிப்புறப் புகழையும் பாராட்டுகளையும் வெறித்தனமாகத் துரத்தும் நாம், எளிமையில் உள்ள ஆழ்ந்த அமைதியை அடிக்கடி தவறவிடுகிறோம். உண்மையான மனநிறைவு என்பது முடிவில்லாமல் குவிப்பதில் வருவதில்லை.'
                    }
                }
            },
            'tamil-culture': {
                beginner: {
                    big: {
                        title: 'The Rich Traditions and Heartwarming Spirit of Pongal',
                        badge: '🌱 Beginner · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Celebrated with boundless joy across the vibrant landscape of Tamil Nadu, the grand festival of Pongal marks an auspicious harvest season where grateful people offer heartfelt thanksgiving to nature, the Sun God, and diligent farm animals. Before early daybreak, women artfully decorate village courtyards with colorful rice flour kolams, while families assemble around new clay pots decorated with fresh turmeric and ginger sprigs to boil newly harvested sweet rice. As the fragrant mixture of jaggery, milk, and rice bubbles over the rim of the pot, cheerful shouts of "Pongalo Pongal" resound across neighborhoods, symbolizing prosperity, health, and endless blessings for the coming year. Beyond the delicious feast shared with cherished neighbors, this time-honored celebration reinforces our sacred connection with mother earth and pays tribute to the tireless farmers who feed our communities.',
                        ta: 'தமிழ்நாட்டின் பசுமையான கிராமங்களிலும் நகரங்களிலும் மிகுந்த உற்சாகத்துடன் கொண்டாடப்படும் பொங்கல் திருவிழா, இயற்கைக்கும், கதிரவனுக்கும், கால்நடைகளுக்கும் மக்கள் தங்களின் மனமார்ந்த நன்றியைச் செலுத்தும் உன்னதமான அறுவடைத் திருநாளாகும். விடியற்காலையிலேயே பெண்கள் வீட்டு வாசல்களில் வண்ண அரிசி மாவு கோலங்களால் அலங்கரிக்க, புதிய மண்பானையில் மஞ்சள், இஞ்சி கொத்துகள் கட்டி புது நெல் அரிசியுடன் சர்க்கரைப் பொங்கல் வைக்க குடும்பங்கள் ஒன்று கூடுகின்றன. பானையிலிருந்து பால் பொங்கி வழியும் போது, குடும்பத்தினர் அனைவரும் "பொங்கலோ பொங்கல்" என்று மகிழ்ச்சியுடன் முழக்கமிடுவது, வரவிருக்கும் ஆண்டிற்கான செழிப்பு, ஆரோக்கியம் மற்றும் ஆசீர்வாதங்களின் அடையாளமாக விளங்குகிறது. சுவையான பொங்கலை அண்டை வீட்டாருடன் பகிர்ந்து உண்பதைத் தாண்டி, இந்தப் பாரம்பரியத் திருவிழா பூமித்தாயுடனான நமது புனித உறவை உறுதிப்படுத்துவதோடு, நமக்கு உணவளிக்கும் உழவர்களின் கடின உழைப்பையும் போற்றுகிறது.'
                    },
                    short: {
                        title: 'Pongal Festival of Harvest',
                        badge: '🌱 Beginner · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Pongal is the grand harvest festival celebrated across Tamil Nadu. People cook sweet rice in a clay pot and thank the Sun God and farmers for their hard work and abundance.',
                        ta: 'பொங்கல் என்பது தமிழ்நாடு முழுவதும் கொண்டாடப்படும் அறுவடைத் திருவிழா ஆகும். மக்கள் மண்பானையில் சர்க்கரைப் பொங்கல் சமைத்து, சூரிய பகவானுக்கும் உழவர்களுக்கும் நன்றி செலுத்துகிறார்கள்.'
                    }
                },
                intermediate: {
                    big: {
                        title: 'The Mesmerizing Melodies of the Margazhi Music Festival in Chennai',
                        badge: '📚 Intermediate · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'During the cool, misty month of Margazhi, Chennai metamorphoses into the undisputed global epicenter of classical South Indian music and sacred devotion, drawing thousands of passionate connoisseurs and virtuoso artists from around the world. As morning temple processions echo with melodious Thiruppavai verses along Mylapore streets, prestigious cultural sabhas throw open their doors to host spellbinding vocal recitals and dynamic Bharatanatyam performances that stretch well into the evening. Concurrently, legendary canteen kitchens adjacent to these auditoriums serve piping-hot tiffin delicacies such as crispy vadas and fragrant filter coffee, generating a delightful sensory festival where sublime melody and culinary mastery merge effortlessly. In essence, attending this month-long cultural extravaganza not only enriches musical appreciation, but also provides a living testimony to the timeless heritage cherished across generations.',
                        ta: 'மார்கழி மாதத்தின் பனி படர்ந்த குளிர்ந்த நாட்களில், சென்னை நகரம் தென்னிந்திய பாரம்பரிய இசை மற்றும் பக்தி கலைகளின் சர்வதேசத் தலைநகராக உருவெடுத்து, உலகெங்கிலும் உள்ள ஆயிரக்கணக்கான இசை ஆர்வலர்களையும் முன்னணி கலைஞர்களையும் ஈர்க்கிறது. மயிலாப்பூர் கோவில் வீதிகளில் அதிகாலை திருப்பாவை பாசுரங்கள் இனிமையாக எதிரொலிக்க, வரலாற்று சிறப்புமிக்க சங்கீத சபாக்களில் மாலை வரை தொடரும் மயக்கும் குரலிசை மற்றும் பரதநாட்டிய நிகழ்ச்சிகள் அரங்கேறுகின்றன. அதே சமயம், சபாக்களின் உணவகங்களில் பரிமாறப்படும் மொறுமொறுப்பான வடை, சுவையான அசோகா அல்வா மற்றும் சூடான ஃபில்டர் காபி ஆகியவை இசை ரசனையோடு சுவை விருந்தையும் இணைக்கும் ஓர் அற்புத அனுபவத்தைத் தருகின்றன. சுருக்கமாகச் சொன்னால், இந்த மார்கழி இசைத் திருவிழாவில் பங்கேற்பது இசை அறிவை மேம்படுத்துவதோடு மட்டுமல்லாமல், தலைமுறை தலைமுறையாகப் போற்றப்படும் தமிழ் கலாச்சாரப் பெருமையின் வாழும் சான்றாகவும் திகழ்கிறது.'
                    },
                    short: {
                        title: 'The Melodies of Margazhi and Chennai Music',
                        badge: '📚 Intermediate · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'During the cool month of Margazhi, Chennai transforms into the global capital of Carnatic music and classical dance. Early morning bhajans echo through temple streets while sabhas host thousands of avid connoisseurs from around the globe.',
                        ta: 'மார்கழி மாதக் குளிர் காலத்தில் சென்னை நகரம் கர்நாடக இசை மற்றும் பரதநாட்டியத்தின் உலகத் தலைநகராக மாறுகிறது. சபாக்களில் உலகெங்கிலும் இருந்து வரும் ஆயிரக்கணக்கான இசை ஆர்வலர்கள் கூடுகிறார்கள்.'
                    }
                },
                advanced: {
                    big: {
                        title: 'The Linguistic Grandeur and Ethical Wisdom of Classical Tamil Literature',
                        badge: '🚀 Advanced · 📜 Big Sentences',
                        est: '⏱️ ~3 min read · Click any word for Tamil meaning',
                        en: 'Endowed with unparalleled antiquity, rigorous phonetic precision, and an astonishingly rich poetic corpus, classical Tamil represents one of humanity’s most monumental intellectual and philosophical treasures. From the passionate love and heroic warfare chronicles immortalized in ancient Sangam anthologies to the profound moral aphorisms distilled in Thiruvalluvar’s timeless Tirukkural, this venerable tongue synthesizes universal humanism with extraordinary poetic economy. Furthermore, unlike numerous archaic classical languages that ceased evolving and vanished into historical obscurity, Tamil has continuously adapted across centuries, thriving as a vibrant medium for cutting-edge digital discourse and global diplomacy. Thus, safeguarding and mastering this majestic literary heritage not only honors our civilizational roots, but also equips modern thinkers with an enduring ethical compass.',
                        ta: 'இணையற்ற தொன்மை, துல்லியமான ஒலிப்பு முறை மற்றும் அளப்பரிய கவிதை வளத்தைக் கொண்ட செம்மொழித் தமிழ், மனிதகுலத்தின் மிக உன்னதமான அறிவு மற்றும் தத்துவச் செல்வங்களில் ஒன்றாக விளங்குகிறது. சங்க இலக்கியங்களில் பதிவு செய்யப்பட்டுள்ள வீரம் மற்றும் காதல் வாழ்வியல் பதிவுகள் முதல், திருவள்ளுவரின் உலகப் பொதுமறையான திருக்குறளில் கூறப்பட்டுள்ள உலகளாவிய அறநெறிகள் வரை, இந்த தாய்மொழி மனிதநேயத்தை வியக்கத்தக்க சுருக்கத்தோடு விளக்குகிறது. மேலும், பல வரலாற்றுச் சிறப்புமிக்க பழங்கால மொழிகள் காலப்போக்கில் வழக்கற்றுப் போன நிலையில், தமிழ் மொழி நூற்றாண்டுகளைக் கடந்து நவீன டிஜிட்டல் களத்திலும் உலகளாவிய தளத்திலும் கம்பீரமாகத் தழைத்தோங்கி வருகிறது. எனவே, இந்த கம்பீரமான இலக்கிய மரபைப் போற்றுவதும் கற்பதும் நமது வரலாற்று வேர்களைக் கொண்டாடுவதோடு மட்டுமல்லாமல், நவீன தலைமுறைக்கு அழியாத வாழ்வியல் வழிகாட்டியாகவும் திகழ்கிறது.'
                    },
                    short: {
                        title: 'The Timeless Legacy of Classical Tamil',
                        badge: '🚀 Advanced · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Endowed with unparalleled antiquity and profound philosophical richness, classical Tamil literature stands as an enduring monument to human introspection. The aphorisms of Tirukkural synthesize universal ethics with astonishing conciseness.',
                        ta: 'இணையற்ற தொன்மையும் ஆழ்ந்த தத்துவ வளமும் கொண்ட செம்மொழித் தமிழ் இலக்கியம் மனித சிந்தனையின் அழியாத நினைவுச்சின்னமாக விளங்குகிறது.'
                    }
                }
            },
            'restaurant': {
                beginner: {
                    big: {
                        title: 'An Evening Feast at a Traditional South Indian Tiffin Shop',
                        badge: '🌱 Beginner · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Stepping into a brightly lit traditional south Indian vegetarian restaurant for evening tiffin, our senses were immediately greeted by the sizzling sound of hot iron tawa griddles and the mouthwatering smell of pure melting ghee. The courteous waiter promptly laid down fresh green banana leaves and skillfully served a golden, paper-thin ghee roast dosa alongside bowls of spicy piping-hot sambar and three distinct colorful chutneys. As we dipped each delicate, crispy piece into the creamy coconut chutney and tangy tomato gravy, every single bite burst with rich authentic spices that produced pure culinary satisfaction. Finishing the delightful meal with a frothy tumbler of authentic degree filter coffee, we left the lively eatery feeling thoroughly rejuvenated, already looking forward to our next visit.',
                        ta: 'மாலை நேர சிற்றுண்டிக்காக ஒரு பாரம்பரிய தென்னிந்திய சைவ உணவகத்திற்குள் நுழைந்தபோது, சூடான தோசைக் கல்லில் தோசை சுடும் சத்தமும், உருகும் நெய்யின் நாவில் நீர் ஊறவைக்கும் வாசனையும் எங்கள் உணர்வுகளை உடனடியாக வரவேற்றன. மரியாதையான பணியாளர் எங்கள் முன் புதிய வாழை இலைகளை விரித்து, தங்க நிறத்தில் மொறுமொறுப்பான நெய் ரோஸ்ட் தோசையுடன் சுடச்சுட சாம்பாரையும் மூன்று வகையான வண்ணமயமான சட்னிகளையும் திறமையாகப் பரிமாறினார். அந்த மொறுமொறுப்பான தோசையைத் தேங்காய் சட்னியிலும் தக்காளி சாம்பாரிலும் தொட்டுச் சுவைத்தபோது, ஒவ்வொரு கவளமும் பாரம்பரிய மசாலாக்களின் சுவையோடு அலாதியான திருப்தியை அளித்தது. இந்த இனிய விருந்தை நுரைபொங்கும் சுவையான டிகிரி ஃபில்டர் காபியுடன் நிறைவு செய்துவிட்டு, அடுத்த முறை எப்போது வரலாம் என்ற ஆவலோடு நாங்கள் மகிழ்ச்சியாகப் புறப்பட்டோம்.'
                    },
                    short: {
                        title: 'Crispy Dosa at the Tiffin Shop',
                        badge: '🌱 Beginner · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'We visited a popular south Indian restaurant for evening tiffin. The waiter served golden crispy ghee roast dosa with three flavorful chutneys and piping hot sambar. Every bite was heavenly.',
                        ta: 'மாலை நேர சிற்றுண்டிக்காக நாங்கள் ஒரு பிரபலமான தென்னிந்திய உணவகத்திற்குச் சென்றோம். பணியாளர் தங்க நிறத்தில் மொறுமொறுப்பான நெய் ரோஸ்ட் தோசையுடன் மூன்று சுவையான சட்னிகளையும் சூடான சாம்பாரையும் பரிமாறினார்.'
                    }
                },
                intermediate: {
                    big: {
                        title: 'The Irresistible Aromas of Heritage Seeraga Samba Biryani',
                        badge: '📚 Intermediate · 📜 Big Sentences',
                        est: '⏱️ ~2 min read · Click any word for Tamil meaning',
                        en: 'Gathering around a rustic wooden table inside a famous century-old family restaurant, the tantalizing fragrance of slow-cooked dum biryani prepared with aromatic seeraga samba rice, fresh mint leaves, and tender spices immediately stirred our deepest appetites. When the grand brass platter was unveiled before us with gentle steam rising into the air, the glistening rice grains infused with rich caramelized shallots and authentic ghee looked utterly magnificent. Paired with cooling onion raita and rich, tangy brinjal gravy, every mouthful offered an exquisite symphony of layered flavors that showcased generations of secret culinary craftsmanship. Sharing such a memorable, indulgent feast with cheerful companions not only satiates hunger, but also creates indelible memories of warmth and joyous togetherness.',
                        ta: 'நூற்றாண்டு பழமையான புகழ்பெற்ற பாரம்பரிய உணவகத்தில் ஒரு மர மேசையைச் சுற்றி அமர்ந்தபோது, சீரக சம்பா அரிசி, புதினா இலைகள் மற்றும் வாசனை மசாலாப் பொருட்களுடன் தம்மில் வெந்த பிரியாணியின் மனம் கவரும் வாசனை எங்கள் பசியை உடனடியாகத் தூண்டியது. மெல்லிய ஆவி பறக்க பிரம்மாண்டமான பித்தளைத் தட்டு எங்கள் முன் திறக்கப்பட்டபோது, நெய்யிலும் வதக்கிய சின்ன வெங்காயத்திலும் பளபளத்த சாதம் பார்ப்பதற்கே பிரமிப்பூட்டுவதாக இருந்தது. குளிர்ந்த வெங்காயத் தயிர்ப்பச்சடி மற்றும் காரசாரமான கத்திரிக்காய் தால்ச்சாவுடன் சேர்த்துச் சுவைத்தபோது, ஒவ்வொரு கவளமும் தலைமுறைகளாகப் பாதுகாக்கப்பட்ட சமையல் கைவண்ணத்தின் சுவையை அற்புதம் காட்டியது. இத்தகைய மறக்க முடியாத சுவையான உணவை அன்பான நண்பர்களோடு பகிர்ந்து உண்பது பசியைப் போக்குவதோடு மட்டுமல்லாமல், நெஞ்சில் என்றும் நிலைத்து நிற்கும் இனிய நினைவுகளையும் உருவாக்குகிறது.'
                    },
                    short: {
                        title: 'The Vibrant Flavors of Traditional Biryani',
                        badge: '📚 Intermediate · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Seated at a bustling heritage eatery, the aromatic fragrance of seeraga samba biryani infused with fresh mint and delicate spices immediately stimulated our appetite. Sharing a rich feast with family creates lasting joy.',
                        ta: 'பரபரப்பான பாரம்பரிய உணவகத்தில் அமர்ந்ததும், சீரக சம்பா அரிசியில் புதினா மற்றும் நறுமண மசாலா சேர்த்து சமைக்கப்பட்ட பிரியாணியின் வாசனை உடனே நாவில் எச்சில் ஊற வைத்தது.'
                    }
                },
                advanced: {
                    big: {
                        title: 'Gastronomy as an Expression of Cultural Heritage and Holistic Philosophy',
                        badge: '🚀 Advanced · 📜 Big Sentences',
                        est: '⏱️ ~3 min read · Click any word for Tamil meaning',
                        en: 'Indigenous culinary traditions encapsulate centuries of agrarian ingenuity, climatic adaptation, and holistic medical philosophy, transforming ordinary sustenance into a sophisticated art of community wellness. In traditional South Indian gastronomy, the deliberate orchestration of the six fundamental tastes—sweet, sour, salty, bitter, pungent, and astringent—reflects an ancient understanding of digestive equilibrium and seasonal vitality. When contemporary food historians analyze the meticulous fermentation of rice batters or the medicinal deployment of black pepper and turmeric, they uncover profound scientific wisdom passed down through generations. Consequently, preserving authentic regional cuisine transcends mere culinary nostalgia, serving instead as an essential defense against industrialized uniformity and a celebration of biocultural identity.',
                        ta: 'பாரம்பரிய உணவு முறைகள் என்பது பல நூற்றாண்டுகால விவசாய நுண்ணறிவு, பருவநிலை மாற்றங்களுக்கான ஏற்பாடுகள் மற்றும் முழுமையான மருத்துவத் தத்துவத்தின் சாரமாகும்; இது சாதாரண உணவை ஆரோக்கியத்திற்கான ஒரு கலை வடிவமாக மாற்றுகிறது. தென்னிந்திய உணவு மரபில் அறுசுவைகளான இனிப்பு, புளிப்பு, உப்பு, கசப்பு, காரம் மற்றும் துவர்ப்பு ஆகியவற்றை நுணுக்கமாக இணைக்கும் முறை செரிமான சமநிலை மற்றும் உடல் நலம் பற்றிய பழங்கால அறிவைப் பிரதிபலிக்கிறது. பாரம்பரிய தானியங்களை நொதிக்க வைக்கும் முறையையும், மிளகு, மஞ்சள் போன்ற மருத்துவப் பொருட்களின் பயன்பாட்டையும் நவீன ஆய்வாளர்கள் ஆராயும்போது, தலைமுறைகளாகக் கடத்தப்பட்ட ஆழ்ந்த அறிவியல் உண்மைகளை அவர்கள் காண்கிறார்கள். எனவே, நமது பாரம்பரிய உணவுப் பழக்கங்களைப் பாதுகாப்பது என்பது வெறும் கடந்த கால ஏக்கம் மட்டுமல்ல; நவீன பாக்கெட் உணவுகளின் தீமைகளிலிருந்து நம்மைப் பாதுகாக்கும் ஓர் அத்தியாவசிய கலாச்சாரக் கடமையாகும்.'
                    },
                    short: {
                        title: 'Gastronomy as an Expression of Heritage',
                        badge: '🚀 Advanced · Short Sentences',
                        est: '⏱️ ~1 min read · Click any word for Tamil meaning',
                        en: 'Culinary traditions encapsulate centuries of agrarian history, indigenous wisdom, and climatic adaptation. The meticulous orchestration of astringent, savory, and sweet flavors mirrors holistic wellness philosophy.',
                        ta: 'உணவுப் பாரம்பரியம் என்பது பல நூற்றாண்டுகால விவசாய வரலாறு, பூர்வகுடி அறிவு மற்றும் தட்பவெப்பநிலை மாற்றங்களின் சாரமாகும். அறுசுவைகளையும் நுணுக்கமாக இணைக்கும் முறை முழுமையான ஆரோக்கிய தத்துவத்தைப் பிரதிபலிக்கிறது.'
                    }
                }
            }
        },

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
            const topicGroup = readingManager.passages[topic] || readingManager.passages['daily-life'];
            const diffGroup = topicGroup[diff] || topicGroup['beginner'];
            const lengthMode = state.readingLength || 'big';
            let passage = null;
            if (diffGroup[lengthMode]) {
                passage = diffGroup[lengthMode];
            } else if (diffGroup.big) {
                passage = diffGroup.big;
            } else {
                passage = diffGroup;
            }
            state.readingPassage = passage;
            readingManager.renderPassage(passage);
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
            if (!dom.aiGenerateReadingBtn) return;
            const isBig = state.readingLength === 'big';
            dom.aiGenerateReadingBtn.disabled = true;
            dom.aiGenerateReadingBtn.textContent = isBig ? 'Generating Big Sentences...' : 'Generating with AI...';

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

                if (err.code === 'auth/unauthorized-domain') {
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
        wordsManager.renderVocabQuiz();
        wordsManager.initWordSearch();
        readingManager.init();
        authManagerUI.init();
        learningProgressManager.init();
        dom.vocabScoreBadge.textContent = `Score: ${state.vocabScore}`;
    }

    // Start App
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
