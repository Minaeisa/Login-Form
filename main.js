const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let valid = true;

  // تحقق من اسم المستخدم
  if (username.value.trim() === '') {
    setError(username, 'Username is required');
    valid = false;
  } else {
    setSuccess(username);
  }

  // تحقق من البريد الإلكتروني
  if (email.value.trim() === '') {
    setError(email, 'Email is required');
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    setError(email, 'Invalid email format');
    valid = false;
  } else {
    setSuccess(email);
  }

  // تحقق من كلمة المرور
  if (password.value.trim() === '') {
    setError(password, 'Password is required');
    valid = false;
  } else if (password.value.trim().length < 6) {
    setError(password, 'Password must be at least 6 characters');
    valid = false;
  } else {
    setSuccess(password);
  }

  // تأكيد كلمة المرور
  if (confirmPassword.value.trim() === '') {
    setError(confirmPassword, 'Please confirm your password');
    valid = false;
  } else if (confirmPassword.value.trim() !== password.value.trim()) {
    setError(confirmPassword, 'Passwords do not match');
    valid = false;
  } else {
    setSuccess(confirmPassword);
  }

  if (valid) {
    alert('Registration successful!');
    form.reset();
    clearStyles();
  }
});

function setError(input, message) {
  input.style.border = '2px solid red';
  if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-msg')) {
    const small = document.createElement('small');
    small.classList.add('error-msg');
    small.textContent = message;
    small.style.color = 'red';
    small.style.display = 'block';
    small.style.marginTop = '5px';
    input.parentElement.appendChild(small);
  }
}

function setSuccess(input) {
  input.style.border = '2px solid limegreen';
  const error = input.parentElement.querySelector('.error-msg');
  if (error) error.remove();
}

function clearStyles() {
  [username, email, password, confirmPassword].forEach(input => {
    input.style.border = '';
    const error = input.parentElement.querySelector('.error-msg');
    if (error) error.remove();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
