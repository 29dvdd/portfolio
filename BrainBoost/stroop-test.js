document.addEventListener('DOMContentLoaded', function() {
    const colorWord = document.getElementById('color-word');
    const colorButtons = document.querySelectorAll('.color-btn');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const accuracyElement = document.getElementById('accuracy');
    const resultsContainer = document.getElementById('results');
    const finalScoreElement = document.getElementById('final-score');
    const finalAccuracyElement = document.getElementById('final-accuracy');
    const avgReactionTimeElement = document.getElementById('avg-reaction-time');
    const correctAnswersElement = document.getElementById('correct-answers');
    const resultMessageElement = document.getElementById('result-message');
    const shareResultsBtn = document.getElementById('share-results');
    const languageToggle = document.getElementById('language-toggle');
    const languageOptions = document.querySelectorAll('.language-dropdown a');
    const currentLanguageText = document.getElementById('current-language');

    const translations = {
        en: {
            testTitle: "Stroop Effect Test",
            testDescription: "The Stroop effect demonstrates the interference in reaction time when the color of a word differs from the word's meaning.<br>Your task is to click the button that corresponds to the <strong>color</strong> of the text, not the word itself.",
            scoreLabel: "Score:",
            timeLabel: "Time:",
            accuracyLabel: "Accuracy:",
            startText: "Start Test",
            restartText: "Restart",
            resultsTitle: "Test Results",
            finalScoreLabel: "Final Score",
            finalAccuracyLabel: "Accuracy",
            reactionTimeLabel: "Avg. Reaction Time",
            correctAnswersLabel: "Correct Answers",
            shareText: "Share Results",
            colorRed: "Red",
            colorBlue: "Blue",
            colorGreen: "Green",
            colorYellow: "Yellow",
            colorPurple: "Purple",
            startWord: "START",
            doneWord: "DONE!",
            resultMessage1: "Outstanding! Your cognitive control is exceptional.",
            resultMessage2: "Great job! Your performance shows good cognitive processing speed.",
            resultMessage3: "Good effort! With practice, you can improve your cognitive control.",
            resultMessage4: "Keep practicing! The Stroop test is challenging for everyone.",
            quickLinksTitle: "Quick Links",
            gamesTitle: "Games",
            supportTitle: "Support",
            footerDescription: "Enhancing cognitive abilities through engaging brain training games and exercises.",
            copyright: "© 2023 BrainBoost. All rights reserved.",
            navHome: "Home",
            navGames: "Games",
            navAbout: "About Us",
            navContact: "Contact",
            navStroop: "Stroop Test",
            navMemory: "Memory Game",
            navReaction: "Reaction Time",
            navNumber: "Number Sequence",
            navFaq: "FAQ",
            navPrivacy: "Privacy Policy",
            navTerms: "Terms of Service",
            navHelp: "Help Center"
        },
        ru: {
            testTitle: "Тест Струпа",
            testDescription: "Эффект Струпа демонстрирует интерференцию во времени реакции, когда цвет слова отличается от его значения.<br>Ваша задача - нажать на кнопку, соответствующую <strong>цвету</strong> текста, а не самому слову.",
            scoreLabel: "Счет:",
            timeLabel: "Время:",
            accuracyLabel: "Точность:",
            startText: "Начать тест",
            restartText: "Начать заново",
            resultsTitle: "Результаты теста",
            finalScoreLabel: "Итоговый счет",
            finalAccuracyLabel: "Точность",
            reactionTimeLabel: "Ср. время реакции",
            correctAnswersLabel: "Правильные ответы",
            shareText: "Поделиться",
            colorRed: "Красный",
            colorBlue: "Синий",
            colorGreen: "Зеленый",
            colorYellow: "Желтый",
            colorPurple: "Фиолетовый",
            startWord: "СТАРТ",
            doneWord: "ГОТОВО!",
            resultMessage1: "Отлично! Ваш когнитивный контроль исключителен.",
            resultMessage2: "Хорошая работа! Ваши результаты показывают хорошую скорость когнитивной обработки.",
            resultMessage3: "Хорошая попытка! С практикой вы можете улучшить свой когнитивный контроль.",
            resultMessage4: "Продолжайте тренироваться! Тест Струпа сложен для всех.",
            quickLinksTitle: "Быстрые ссылки",
            gamesTitle: "Игры",
            supportTitle: "Поддержка",
            footerDescription: "Улучшение когнитивных способностей с помощью увлекательных игр для тренировки мозга.",
            copyright: "© 2023 BrainBoost. Все права защищены.",
            navHome: "Главная",
            navGames: "Игры",
            navAbout: "О нас",
            navContact: "Контакты",
            navStroop: "Тест Струпа",
            navMemory: "Игра на память",
            navReaction: "Время реакции",
            navNumber: "Числовые последовательности",
            navFaq: "ЧЗВ",
            navPrivacy: "Политика конфиденциальности",
            navTerms: "Условия использования",
            navHelp: "Центр помощи"
        }
    };

    const colorNames = {
        en: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'],
        ru: ['КРАСНЫЙ', 'СИНИЙ', 'ЗЕЛЕНЫЙ', 'ЖЕЛТЫЙ', 'ФИОЛЕТОВЫЙ']
    };

    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    const testDuration = 60; 
    let score = 0;
    let correctAnswers = 0;
    let totalAnswers = 0;
    let timeLeft = testDuration;
    let timer;
    let currentColorIndex;
    let currentTextIndex;
    let isTestRunning = false;
    let startTime;
    let reactionTimes = [];
    let currentLanguage = 'en';

    function init() {
        score = 0;
        correctAnswers = 0;
        totalAnswers = 0;
        timeLeft = testDuration;
        reactionTimes = [];
        
        scoreElement.textContent = score;
        timerElement.textContent = timeLeft;
        accuracyElement.textContent = '0%';
        
        colorWord.textContent = translations[currentLanguage].startWord;
        colorWord.style.color = 'black';
        
        resultsContainer.classList.add('hidden');
        
        startBtn.disabled = false;
        restartBtn.disabled = true;
        
        colorButtons.forEach(btn => {
            btn.disabled = true;
        });

        updateLanguageUI();
    }

    function startTest() {
        isTestRunning = true;
        startBtn.disabled = true;
        restartBtn.disabled = false;
        
        colorButtons.forEach(btn => {
            btn.disabled = false;
        });
        
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
        
        generateNewWord();
    }

    function generateNewWord() {
        colorWord.classList.remove('animate-word');
        
        void colorWord.offsetWidth;
        
        colorWord.classList.add('animate-word');
        
        currentColorIndex = Math.floor(Math.random() * colors.length);
        
        let textIndex;
        if (Math.random() < 0.7) {
            do {
                textIndex = Math.floor(Math.random() * colorNames[currentLanguage].length);
            } while (textIndex === currentColorIndex);
        } else {
            textIndex = currentColorIndex;
        }
        
        currentTextIndex = textIndex;

        colorWord.textContent = colorNames[currentLanguage][currentTextIndex];
        colorWord.style.color = colors[currentColorIndex];

        startTime = Date.now();
    }

    function handleColorButtonClick(event) {
        if (!isTestRunning) return;
        
        const selectedColor = event.target.getAttribute('data-color');
        const correctColor = colors[currentColorIndex];

        const endTime = Date.now();
        const reactionTime = endTime - startTime;
        reactionTimes.push(reactionTime);
        
        totalAnswers++;
        
        if (selectedColor === correctColor) {
            score += 10;
            correctAnswers++;
            
            if (reactionTime < 1000) {
                score += Math.floor((1000 - reactionTime) / 100);
            }
        } else {
            score = Math.max(0, score - 5);
        }

        scoreElement.textContent = score;
        const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
        accuracyElement.textContent = `${accuracy}%`;

        generateNewWord();
    }

    function endTest() {
        isTestRunning = false;
        clearInterval(timer);
        
        colorButtons.forEach(btn => {
            btn.disabled = true;
        });

        const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
        const avgReactionTime = reactionTimes.length > 0 ? 
            Math.round(reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length) : 0;

        finalScoreElement.textContent = score;
        finalAccuracyElement.textContent = `${accuracy}%`;
        avgReactionTimeElement.textContent = `${avgReactionTime}ms`;
        correctAnswersElement.textContent = correctAnswers;

        let message;
        if (accuracy >= 90) {
            message = translations[currentLanguage].resultMessage1;
        } else if (accuracy >= 75) {
            message = translations[currentLanguage].resultMessage2;
        } else if (accuracy >= 60) {
            message = translations[currentLanguage].resultMessage3;
        } else {
            message = translations[currentLanguage].resultMessage4;
        }
        
        resultMessageElement.textContent = message;

        resultsContainer.classList.remove('hidden');

        colorWord.textContent = translations[currentLanguage].doneWord;
        colorWord.style.color = "black";
    }

    function shareResults() {
        const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
        let text;
        
        if (currentLanguage === 'en') {
            text = `I scored ${score} points with ${accuracy}% accuracy on the Stroop Effect Test! Can you beat my score?`;
        } else {
            text = `Я набрал(а) ${score} очков с точностью ${accuracy}% в тесте Струпа! Сможете побить мой результат?`;
        }
        
        if (navigator.share) {
            navigator.share({
                title: currentLanguage === 'en' ? 'My Stroop Test Results' : 'Мои результаты теста Струпа',
                text: text,
                url: window.location.href
            })
            .catch(error => {
                console.log('Error sharing:', error);
                fallbackShare(text);
            });
        } else {
            fallbackShare(text);
        }
    }

    function fallbackShare(text) {
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);

        input.select();
        document.execCommand('copy');

        document.body.removeChild(input);
        
        alert(currentLanguage === 'en' ? 
            'Results copied to clipboard! You can now paste and share it.' : 
            'Результаты скопированы в буфер обмена! Теперь вы можете вставить и поделиться ими.');
    }

    function switchLanguage(lang) {
        if (lang === currentLanguage) return;
        
        currentLanguage = lang;
        currentLanguageText.textContent = lang.toUpperCase();
        
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        updateLanguageUI();

        if (isTestRunning) {
            colorWord.textContent = colorNames[currentLanguage][currentTextIndex];
        }
    }

    function updateLanguageUI() {
        document.getElementById('test-title').textContent = translations[currentLanguage].testTitle;
        document.getElementById('test-description').innerHTML = translations[currentLanguage].testDescription;
        
        document.getElementById('score-label').textContent = translations[currentLanguage].scoreLabel;
        document.getElementById('time-label').textContent = translations[currentLanguage].timeLabel;
        document.getElementById('accuracy-label').textContent = translations[currentLanguage].accuracyLabel;
        
                document.getElementById('start-text').textContent = translations[currentLanguage].startText;
                document.getElementById('restart-text').textContent = translations[currentLanguage].restartText;
                document.getElementById('share-text').textContent = translations[currentLanguage].shareText;
                
                document.getElementById('btn-red').textContent = translations[currentLanguage].colorRed;
                document.getElementById('btn-blue').textContent = translations[currentLanguage].colorBlue;
                document.getElementById('btn-green').textContent = translations[currentLanguage].colorGreen;
                document.getElementById('btn-yellow').textContent = translations[currentLanguage].colorYellow;
                document.getElementById('btn-purple').textContent = translations[currentLanguage].colorPurple;
                
                document.getElementById('results-title').textContent = translations[currentLanguage].resultsTitle;
                document.getElementById('final-score-label').textContent = translations[currentLanguage].finalScoreLabel;
                document.getElementById('final-accuracy-label').textContent = translations[currentLanguage].finalAccuracyLabel;
                document.getElementById('reaction-time-label').textContent = translations[currentLanguage].reactionTimeLabel;
                document.getElementById('correct-answers-label').textContent = translations[currentLanguage].correctAnswersLabel;
                
                document.getElementById('footer-description').textContent = translations[currentLanguage].footerDescription;
                document.getElementById('quick-links-title').textContent = translations[currentLanguage].quickLinksTitle;
                document.getElementById('games-title').textContent = translations[currentLanguage].gamesTitle;
                document.getElementById('support-title').textContent = translations[currentLanguage].supportTitle;
                document.getElementById('copyright').textContent = translations[currentLanguage].copyright;
                
                document.getElementById('nav-home').textContent = translations[currentLanguage].navHome;
                document.getElementById('nav-games').textContent = translations[currentLanguage].navGames;
                document.getElementById('nav-about').textContent = translations[currentLanguage].navAbout;
                document.getElementById('nav-contact').textContent = translations[currentLanguage].navContact;
                document.getElementById('nav-stroop').textContent = translations[currentLanguage].navStroop;
                document.getElementById('nav-memory').textContent = translations[currentLanguage].navMemory;
                document.getElementById('nav-reaction').textContent = translations[currentLanguage].navReaction;
                document.getElementById('nav-number').textContent = translations[currentLanguage].navNumber;
                document.getElementById('nav-faq').textContent = translations[currentLanguage].navFaq;
                document.getElementById('nav-privacy').textContent = translations[currentLanguage].navPrivacy;
                document.getElementById('nav-terms').textContent = translations[currentLanguage].navTerms;
                document.getElementById('nav-help').textContent = translations[currentLanguage].navHelp;
                
                if (!isTestRunning) {
                    colorWord.textContent = translations[currentLanguage].startWord;
                }
            }
        
            startBtn.addEventListener('click', startTest);
            restartBtn.addEventListener('click', init);
            shareResultsBtn.addEventListener('click', shareResults);
            
            colorButtons.forEach(button => {
                button.addEventListener('click', handleColorButtonClick);
            });
            
            languageOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.getAttribute('data-lang');
                    switchLanguage(lang);
                });
            });
        
            const savedLanguage = localStorage.getItem('preferredLanguage');
            if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
                switchLanguage(savedLanguage);
            }
        
            function saveLanguagePreference(lang) {
                localStorage.setItem('preferredLanguage', lang);
            }
        
            languageOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.getAttribute('data-lang');
                    switchLanguage(lang);
                    saveLanguagePreference(lang);
                });
            });
        
            init();
        });
        
