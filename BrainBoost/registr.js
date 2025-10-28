document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('registration-form');
    const steps = document.querySelectorAll('.step');
    const stepPanes = document.querySelectorAll('.step-pane');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordButton = document.querySelector('.toggle-password');
    const strengthIndicator = document.querySelector('.strength-indicator');
    const strengthText = document.querySelector('.strength-text');
    
    // Current step
    let currentStep = 1;
    
    // Initialize form
    function initForm() {
      // Password visibility toggle
      if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function() {
          const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordInput.setAttribute('type', type);
          
          // Toggle icon
          const icon = this.querySelector('i');
          icon.classList.toggle('fa-eye');
          icon.classList.toggle('fa-eye-slash');
        });
      }
      
      // Password strength meter
      if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
      }
      
      // Next button click
      nextButtons.forEach(button => {
        button.addEventListener('click', function() {
          if (validateCurrentStep()) {
            goToNextStep();
          }
        });
      });
      
      // Previous button click
      prevButtons.forEach(button => {
        button.addEventListener('click', goToPrevStep);
      });
      
      // Form submission
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          if (validateCurrentStep()) {
            // Here you would typically send the form data to your server
            // For demo purposes, we'll just show a success message
            showSuccessMessage();
          }
        });
      }
    }
    
    // Go to next step
    function goToNextStep() {
      if (currentStep < 3) {
        // Update current step
        currentStep++;
        
        // Update UI
        updateStepUI();
      }
    }
    
    // Go to previous step
    function goToPrevStep() {
      if (currentStep > 1) {
        // Update current step
        currentStep--;
        
        // Update UI
        updateStepUI();
      }
    }
    
    // Update step UI
    function updateStepUI() {
      // Update step indicators
      steps.forEach(step => {
        const stepNumber = parseInt(step.dataset.step);
        
        if (stepNumber === currentStep) {
          step.classList.add('active');
        } else if (stepNumber < currentStep) {
          step.classList.add('completed');
          step.classList.remove('active');
        } else {
          step.classList.remove('active', 'completed');
        }
      });
      
      // Update step panes
      stepPanes.forEach(pane => {
        const paneNumber = parseInt(pane.dataset.step);
        
        if (paneNumber === currentStep) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    }
    
    // Validate current step
    function validateCurrentStep() {
      let isValid = true;
      
      // Clear previous error messages
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(message => {
        message.textContent = '';
      });
      
      // Validate based on current step
      if (currentStep === 1) {
        // Validate email
        const email = document.getElementById('email');
        if (!email.value.trim()) {
          document.getElementById('email-error').textContent = 'Пожалуйста, введите email';
          isValid = false;
        } else if (!isValidEmail(email.value)) {
          document.getElementById('email-error').textContent = 'Пожалуйста, введите корректный email';
          isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
          document.getElementById('password-error').textContent = 'Пожалуйста, введите пароль';
          isValid = false;
        } else if (passwordInput.value.length < 8) {
          document.getElementById('password-error').textContent = 'Пароль должен содержать минимум 8 символов';
          isValid = false;
        }
        
        // Validate confirm password
        if (!confirmPasswordInput.value) {
          document.getElementById('confirm-password-error').textContent = 'Пожалуйста, подтвердите пароль';
          isValid = false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
          document.getElementById('confirm-password-error').textContent = 'Пароли не совпадают';
          isValid = false;
        }
      } else if (currentStep === 2) {
        // Validate full name
        const fullname = document.getElementById('fullname');
        if (!fullname.value.trim()) {
          document.getElementById('fullname-error').textContent = 'Пожалуйста, введите ваше имя';
          isValid = false;
        }
        
        // Validate birthdate
        const birthdate = document.getElementById('birthdate');
        if (!birthdate.value) {
          document.getElementById('birthdate-error').textContent = 'Пожалуйста, укажите дату рождения';
          isValid = false;
        }
        
        // Validate interests (at least one should be selected)
        const interests = document.querySelectorAll('input[name="interests"]:checked');
        if (interests.length === 0) {
          document.getElementById('interests-error').textContent = 'Пожалуйста, выберите хотя бы одно направление';
          isValid = false;
        }
      } else if (currentStep === 3) {
        // Validate terms acceptance
        const terms = document.querySelector('input[name="terms"]');
        if (!terms.checked) {
          document.getElementById('terms-error').textContent = 'Вы должны принять условия использования';
          isValid = false;
        }
      }
      
      return isValid;
    }
    
    // Check password strength
    function checkPasswordStrength() {
      const password = passwordInput.value;
      let strength = 0;
      
      // Length check
      if (password.length >= 8) {
        strength += 1;
      }
      
      // Contains lowercase letters
      if (/[a-z]/.test(password)) {
        strength += 1;
      }
      
      // Contains uppercase letters
      if (/[A-Z]/.test(password)) {
        strength += 1;
      }
      
      // Contains numbers
      if (/[0-9]/.test(password)) {
        strength += 1;
      }
      
      // Contains special characters
      if (/[^A-Za-z0-9]/.test(password)) {
        strength += 1;
      }
      
      // Update UI based on strength
      let width = (strength / 5) * 100;
      let color = '';
      let text = '';
      
      if (strength === 0) {
        color = '#e74c3c';
        text = 'Очень слабый пароль';
      } else if (strength <= 2) {
        color = '#e74c3c';
        text = 'Слабый пароль';
      } else if (strength <= 3) {
        color = '#f39c12';
        text = 'Средний пароль';
      } else if (strength <= 4) {
        color = '#3498db';
        text = 'Хороший пароль';
      } else {
        color = '#2ecc71';
        text = 'Отличный пароль';
      }
      
      strengthIndicator.style.width = `${width}%`;
      strengthIndicator.style.backgroundColor = color;
      strengthText.textContent = text;
      strengthText.style.color = color;
    }
    
    // Show success message
    function showSuccessMessage() {
      // Hide form
      form.style.display = 'none';
      
      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>Регистрация успешно завершена!</h2>
        <p>Спасибо за регистрацию на BrainBoost. На ваш email отправлено письмо с подтверждением.</p>
        <a href="main.html" class="btn btn-primary">Вернуться на главную</a>
      `;
      
      // Add success message to the page
      form.parentNode.insertBefore(successMessage, form);
      
      // Add CSS for success message
      const style = document.createElement('style');
      style.textContent = `
        .success-message {
          text-align: center;
          animation: fadeIn 0.5s ease;
        }
        
        .success-icon {
          font-size: 5rem;
          color: #2ecc71;
          margin-bottom: 1.5rem;
        }
        
        .success-message h2 {
          margin-bottom: 1rem;
          color: var(--text-color);
        }
        
        .success-message p {
          color: var(--text-light);
          margin-bottom: 2rem;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Initialize the form
    initForm();
  });
  