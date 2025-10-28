document.addEventListener('DOMContentLoaded', function() {
  // Existing code...
  
  // Language switcher
  const languageToggle = document.querySelector('.language-toggle');
  const languageOptions = document.querySelectorAll('.language-dropdown a');
  const currentLanguageText = document.getElementById('current-language');
  
  // Translations object
  const translations = {
      en: {
          tests: "Tests",
          games: "Games",
          courses: "Courses",
          about: "About Us",
          login: "Log In",
          register: "Sign Up",
          heroTitle: "Train your brain.<br>Develop skills.",
          heroSubtitle: "Interactive tests and games for cognitive abilities development",
          startFree: "Start for free",
          howItWorks: "How it works",
          popularTests: "Popular Tests",
          all: "All",
          memory: "Memory",
          attention: "Attention",
          logic: "Logic",
          speed: "Speed",
          viewAllTests: "View all tests",
          developingGames: "Brain Games",
          howItWorksTitle: "How it works",
          registration: "Registration",
          registrationDesc: "Create a free account to track your progress",
          diagnostics: "Diagnostics",
          diagnosticsDesc: "Take initial tests to determine your strengths and weaknesses",
          training: "Training",
          trainingDesc: "Regularly perform exercises tailored specifically for you",
          analysis: "Analysis",
          analysisDesc: "Track your progress and adjust your training program",
          aboutProject: "About BrainBoost",
          aboutDesc1: "BrainBoost is a platform for developing cognitive abilities through interactive tests and games. We combine a scientific approach to brain training with engaging gameplay.",
          aboutDesc2: "Our mission is to make the development of intellectual abilities accessible and engaging for everyone.",
          testsAndGames: "Tests and games",
          users: "Users",
          completedTests: "Completed tests",
          readyToStart: "Ready to start brain training?",
          joinUsers: "Join thousands of users who have already improved their cognitive abilities",
          developBrain: "Develop your brain every day",
          navigation: "Navigation",
          legalInfo: "Legal Information",
          termsOfUse: "Terms of Use",
          privacyPolicy: "Privacy Policy",
          cookiesPolicy: "Cookies Policy",
          contacts: "Contacts",
          allRightsReserved: "All rights reserved."
      },
      ru: {
          tests: "Тесты",
          games: "Игры",
          courses: "Курсы",
          about: "О нас",
          login: "Войти",
          register: "Регистрация",
          heroTitle: "Тренируй мозг.<br>Развивай навыки.",
          heroSubtitle: "Интерактивные тесты и игры для развития когнитивных способностей",
          startFree: "Начать бесплатно",
          howItWorks: "Как это работает",
          popularTests: "Популярные тесты",
          all: "Все",
          memory: "Память",
          attention: "Внимание",
          logic: "Логика",
          speed: "Скорость",
          viewAllTests: "Смотреть все тесты",
          developingGames: "Развивающие игры",
          howItWorksTitle: "Как это работает",
          registration: "Регистрация",
          registrationDesc: "Создайте бесплатный аккаунт для отслеживания прогресса",
          diagnostics: "Диагностика",
          diagnosticsDesc: "Пройдите начальные тесты для определения ваших сильных и слабых сторон",
          training: "Тренировки",
          trainingDesc: "Регулярно выполняйте упражнения, подобранные специально для вас",
          analysis: "Анализ",
          analysisDesc: "Отслеживайте свой прогресс и корректируйте программу тренировок",
          aboutProject: "О проекте BrainBoost",
          aboutDesc1: "BrainBoost — это платформа для развития когнитивных способностей через интерактивные тесты и игры. Мы объединяем научный подход к тренировке мозга с увлекательным игровым процессом.",
          aboutDesc2: "Наша миссия — сделать развитие интеллектуальных способностей доступным и увлекательным для каждого.",
          testsAndGames: "Тестов и игр",
          users: "Пользователей",
          completedTests: "Пройденных тестов",
          readyToStart: "Готовы начать тренировку мозга?",
          joinUsers: "Присоединяйтесь к тысячам пользователей, которые уже улучшили свои когнитивные способности",
          developBrain: "Развивай свой мозг каждый день",
          navigation: "Навигация",
          legalInfo: "Правовая информация",
          termsOfUse: "Условия использования",
          privacyPolicy: "Политика конфиденциальности",
          cookiesPolicy: "Политика cookies",
          contacts: "Контакты",
          allRightsReserved: "Все права защищены."
      }
  };
  
  // Function to switch language
  function switchLanguage(lang) {
      if (!translations[lang]) return;
      
      // Update active language in dropdown
      languageOptions.forEach(option => {
          if (option.getAttribute('data-lang') === lang) {
              option.classList.add('active');
          } else {
              option.classList.remove('active');
          }
      });
      
      // Update current language display
      currentLanguageText.textContent = lang.toUpperCase();
      
      // Update HTML lang attribute
      document.documentElement.setAttribute('lang', lang);
      
      // Save language preference
      localStorage.setItem('preferredLanguage', lang);
      
      // Update content based on translations
      updatePageContent(lang);
  }
  
  // Function to update page content with translations
  function updatePageContent(lang) {
      const t = translations[lang];
      
      // Update navigation
      document.querySelectorAll('.main-nav ul li a')[0].textContent = t.tests;
      document.querySelectorAll('.main-nav ul li a')[1].textContent = t.games;
      document.querySelectorAll('.main-nav ul li a')[2].textContent = t.courses;
      document.querySelectorAll('.main-nav ul li a')[3].textContent = t.about;
      
      // Update auth buttons
      document.querySelectorAll('.auth-buttons a')[0].textContent = t.login;
      document.querySelectorAll('.auth-buttons a')[1].textContent = t.register;
      
      // Update hero section
      document.querySelector('.hero-title').innerHTML = t.heroTitle;
      document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
      document.querySelectorAll('.hero-cta a')[0].textContent = t.startFree;
      document.querySelectorAll('.hero-cta a')[1].textContent = t.howItWorks;
      
      // Update tests section
      document.querySelector('#tests .section-title').textContent = t.popularTests;
      document.querySelectorAll('.category-btn')[0].textContent = t.all;
      document.querySelectorAll('.category-btn')[1].textContent = t.memory;
      document.querySelectorAll('.category-btn')[2].textContent = t.attention;
      document.querySelectorAll('.category-btn')[3].textContent = t.logic;
      document.querySelectorAll('.category-btn')[4].textContent = t.speed;
      document.querySelector('.view-all-container a').textContent = t.viewAllTests;
      
      // Update games section
      document.querySelector('#games .section-title').textContent = t.developingGames;
      
      // Update how it works section
      document.querySelector('#how-it-works .section-title').textContent = t.howItWorksTitle;
      document.querySelectorAll('.step-content h3')[0].textContent = t.registration;
      document.querySelectorAll('.step-content p')[0].textContent = t.registrationDesc;
      document.querySelectorAll('.step-content h3')[1].textContent = t.diagnostics;
      document.querySelectorAll('.step-content p')[1].textContent = t.diagnosticsDesc;
      document.querySelectorAll('.step-content h3')[2].textContent = t.training;
      document.querySelectorAll('.step-content p')[2].textContent = t.trainingDesc;
      document.querySelectorAll('.step-content h3')[3].textContent = t.analysis;
      document.querySelectorAll('.step-content p')[3].textContent = t.analysisDesc;
      
      // Update about section
      document.querySelector('#about .section-title').textContent = t.aboutProject;
      document.querySelectorAll('.about-content p')[0].textContent = t.aboutDesc1;
      document.querySelectorAll('.about-content p')[1].textContent = t.aboutDesc2;
      document.querySelectorAll('.stat-label')[0].textContent = t.testsAndGames;
      document.querySelectorAll('.stat-label')[1].textContent = t.users;
      document.querySelectorAll('.stat-label')[2].textContent = t.completedTests;
      
      // Update CTA section
      document.querySelector('.cta h2').textContent = t.readyToStart;
      document.querySelector('.cta p').textContent = t.joinUsers;
      document.querySelector('.cta .btn').textContent = t.startFree;
      
      // Update footer
      document.querySelector('.footer-logo p').textContent = t.developBrain;
      document.querySelectorAll('.footer-column h3')[0].textContent = t.navigation;
      document.querySelectorAll('.footer-column h3')[1].textContent = t.legalInfo;
      document.querySelectorAll('.footer-column h3')[2].textContent = t.contacts;
      document.querySelectorAll('.footer-column ul li a')[0].textContent = t.tests;
      document.querySelectorAll('.footer-column ul li a')[1].textContent = t.games;
      document.querySelectorAll('.footer-column ul li a')[2].textContent = t.courses;
      document.querySelectorAll('.footer-column ul li a')[3].textContent = t.about;
      document.querySelectorAll('.footer-column ul li a')[4].textContent = t.termsOfUse;
      document.querySelectorAll('.footer-column ul li a')[5].textContent = t.privacyPolicy;
      document.querySelectorAll('.footer-column ul li a')[6].textContent = t.cookiesPolicy;
      
      // Update copyright
      document.querySelector('.footer-bottom p').textContent = `© 2025 BrainBoost. ${t.allRightsReserved}`;
  }
  
  // Add event listeners to language options
  languageOptions.forEach(option => {
      option.addEventListener('click', function(e) {
          e.preventDefault();
          const lang = this.getAttribute('data-lang');
          switchLanguage(lang);
      });
  });
  
// Check for saved language
const savedLanguage = localStorage.getItem('preferredLanguage');
if (savedLanguage && translations[savedLanguage]) {
    switchLanguage(savedLanguage);
}

// Mobile menu language toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        // If mobile menu is active, clone the language toggle into it
        if (this.classList.contains('active')) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && !mobileMenu.querySelector('.language-toggle')) {
                const langToggleClone = languageToggle.cloneNode(true);
                mobileMenu.appendChild(langToggleClone);
                
                // Add event listeners to the cloned language options
                const mobileLanguageOptions = mobileMenu.querySelectorAll('.language-dropdown a');
                mobileLanguageOptions.forEach(option => {
                    option.addEventListener('click', function(e) {
                        e.preventDefault();
                        const lang = this.getAttribute('data-lang');
                        switchLanguage(lang);
                        
                        // Close mobile menu after language selection
                        if (mobileMenuToggle.classList.contains('active')) {
                            mobileMenuToggle.click();
                        }
                    });
                });
            }
        }
    });
}

// Update test card content based on language
function updateTestCards(lang) {
    const t = translations[lang];
    
    // Memory test card
    const memoryCard = document.querySelector('.test-card[data-category="memory"]');
    if (memoryCard) {
        memoryCard.querySelector('h3').textContent = lang === 'en' ? 
            'Short-term Memory Test' : 'Тест на кратковременную память';
        memoryCard.querySelector('p').textContent = lang === 'en' ? 
            'Check how well you remember information for a short period of time.' : 
            'Проверьте, насколько хорошо вы запоминаете информацию за короткий промежуток времени.';
        memoryCard.querySelector('.btn').textContent = lang === 'en' ? 'Take the test' : 'Пройти тест';
    }
    
    // Stroop test card
    const stroopCard = document.querySelector('.test-card[data-category="attention"]');
    if (stroopCard) {
        stroopCard.querySelector('h3').textContent = lang === 'en' ? 
            'Stroop Test' : 'Тест Струпа';
        stroopCard.querySelector('p').textContent = lang === 'en' ? 
            'Evaluate your ability to concentrate and ignore distractions.' : 
            'Оцените свою способность концентрироваться и игнорировать отвлекающие факторы.';
        stroopCard.querySelector('.btn').textContent = lang === 'en' ? 'Take the test' : 'Пройти тест';
    }
    
    // Logic test card
    const logicCard = document.querySelector('.test-card[data-category="logic"]');
    if (logicCard) {
        logicCard.querySelector('h3').textContent = lang === 'en' ? 
            'Logic Puzzles' : 'Логические головоломки';
        logicCard.querySelector('p').textContent = lang === 'en' ? 
            'Solve problems that require non-standard thinking and logical analysis.' : 
            'Решайте задачи, требующие нестандартного мышления и логического анализа.';
        logicCard.querySelector('.btn').textContent = lang === 'en' ? 'Take the test' : 'Пройти тест';
    }
    
    // Reaction test card
    const reactionCard = document.querySelector('.test-card[data-category="speed"]');
    if (reactionCard) {
        reactionCard.querySelector('h3').textContent = lang === 'en' ? 
            'Reaction Speed Test' : 'Тест на скорость реакции';
        reactionCard.querySelector('p').textContent = lang === 'en' ? 
            'Check how quickly you can react to visual stimuli.' : 
            'Проверьте, насколько быстро вы можете реагировать на визуальные стимулы.';
        reactionCard.querySelector('.btn').textContent = lang === 'en' ? 'Take the test' : 'Пройти тест';
    }
}

// Update game cards based on language
function updateGameCards(lang) {
    const t = translations[lang];
    const gameCards = document.querySelectorAll('.game-card');
    
    if (gameCards.length >= 4) {
        // Memory game
        gameCards[0].querySelector('h3').textContent = lang === 'en' ? 'Memory' : 'Мемори';
        gameCards[0].querySelector('p').textContent = lang === 'en' ? 
            'Train your memory by finding pairs of identical cards' : 
            'Тренируйте память, находя пары одинаковых карточек';
        gameCards[0].querySelector('.btn').textContent = lang === 'en' ? 'Play' : 'Играть';
        
        // Sudoku game
        gameCards[1].querySelector('h3').textContent = lang === 'en' ? 'Sudoku' : 'Судоку';
        gameCards[1].querySelector('p').textContent = lang === 'en' ? 
            'Develop logical thinking with number puzzles' : 
            'Развивайте логическое мышление с помощью числовых головоломок';
        gameCards[1].querySelector('.btn').textContent = lang === 'en' ? 'Play' : 'Играть';
        
        // Math trainer
        gameCards[2].querySelector('h3').textContent = lang === 'en' ? 'Math Trainer' : 'Математический тренажер';
        gameCards[2].querySelector('p').textContent = lang === 'en' ? 
            'Improve mental arithmetic skills and thinking speed' : 
            'Улучшайте навыки устного счета и скорость мышления';
        gameCards[2].querySelector('.btn').textContent = lang === 'en' ? 'Play' : 'Играть';
        
        // Word associations
        gameCards[3].querySelector('h3').textContent = lang === 'en' ? 'Word Associations' : 'Словесные ассоциации';
        gameCards[3].querySelector('p').textContent = lang === 'en' ? 
            'Expand your vocabulary and train associative thinking' : 
            'Расширяйте словарный запас и тренируйте ассоциативное мышление';
        gameCards[3].querySelector('.btn').textContent = lang === 'en' ? 'Play' : 'Играть';
    }
}

// Update all content when language changes
function updatePageContent(lang) {
    const t = translations[lang];
    
    // Update navigation
    document.querySelectorAll('.main-nav ul li a')[0].textContent = t.tests;
    document.querySelectorAll('.main-nav ul li a')[1].textContent = t.games;
    document.querySelectorAll('.main-nav ul li a')[2].textContent = t.courses;
    document.querySelectorAll('.main-nav ul li a')[3].textContent = t.about;
    
    // Update auth buttons
    document.querySelectorAll('.auth-buttons a')[0].textContent = t.login;
    document.querySelectorAll('.auth-buttons a')[1].textContent = t.register;
    
    // Update hero section
    document.querySelector('.hero-title').innerHTML = t.heroTitle;
    document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
    document.querySelectorAll('.hero-cta a')[0].textContent = t.startFree;
    document.querySelectorAll('.hero-cta a')[1].textContent = t.howItWorks;
    
    // Update tests section
    document.querySelector('#tests .section-title').textContent = t.popularTests;
    document.querySelectorAll('.category-btn')[0].textContent = t.all;
    document.querySelectorAll('.category-btn')[1].textContent = t.memory;
    document.querySelectorAll('.category-btn')[2].textContent = t.attention;
    document.querySelectorAll('.category-btn')[3].textContent = t.logic;
    document.querySelectorAll('.category-btn')[4].textContent = t.speed;
    document.querySelector('.view-all-container a').textContent = t.viewAllTests;
    
    // Update test cards
    updateTestCards(lang);
    
    // Update games section
    document.querySelector('#games .section-title').textContent = t.developingGames;
    
    // Update game cards
    updateGameCards(lang);
    
    // Update how it works section
    document.querySelector('#how-it-works .section-title').textContent = t.howItWorksTitle;
    document.querySelectorAll('.step-content h3')[0].textContent = t.registration;
    document.querySelectorAll('.step-content p')[0].textContent = t.registrationDesc;
    document.querySelectorAll('.step-content h3')[1].textContent = t.diagnostics;
    document.querySelectorAll('.step-content p')[1].textContent = t.diagnosticsDesc;
    document.querySelectorAll('.step-content h3')[2].textContent = t.training;
    document.querySelectorAll('.step-content p')[2].textContent = t.trainingDesc;
    document.querySelectorAll('.step-content h3')[3].textContent = t.analysis;
    document.querySelectorAll('.step-content p')[3].textContent = t.analysisDesc;
    
    // Update about section
    document.querySelector('#about .section-title').textContent = t.aboutProject;
    document.querySelectorAll('.about-content p')[0].textContent = t.aboutDesc1;
    document.querySelectorAll('.about-content p')[1].textContent = t.aboutDesc2;
    document.querySelectorAll('.stat-label')[0].textContent = t.testsAndGames;
    document.querySelectorAll('.stat-label')[1].textContent = t.users;
    document.querySelectorAll('.stat-label')[2].textContent = t.completedTests;
    
    // Update CTA section
    document.querySelector('.cta h2').textContent = t.readyToStart;
    document.querySelector('.cta p').textContent = t.joinUsers;
    document.querySelector('.cta .btn').textContent = t.startFree;
    
    // Update footer
    document.querySelector('.footer-logo p').textContent = t.developBrain;
    document.querySelectorAll('.footer-column h3')[0].textContent = t.navigation;
    document.querySelectorAll('.footer-column h3')[1].textContent = t.legalInfo;
    document.querySelectorAll('.footer-column h3')[2].textContent = t.contacts;
    document.querySelectorAll('.footer-column ul li a')[0].textContent = t.tests;
    document.querySelectorAll('.footer-column ul li a')[1].textContent = t.games;
    document.querySelectorAll('.footer-column ul li a')[2].textContent = t.courses;
    document.querySelectorAll('.footer-column ul li a')[3].textContent = t.about;
    document.querySelectorAll('.footer-column ul li a')[4].textContent = t.termsOfUse;
    document.querySelectorAll('.footer-column ul li a')[5].textContent = t.privacyPolicy;
    document.querySelectorAll('.footer-column ul li a')[6].textContent = t.cookiesPolicy;
    
    // Update copyright
    document.querySelector('.footer-bottom p').textContent = `© 2025 BrainBoost. ${t.allRightsReserved}`;
}
});
