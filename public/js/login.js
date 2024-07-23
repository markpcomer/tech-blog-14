// Define loginFormHandler function
const loginFormHandler = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector('#email-login');
  const passwordInput = document.querySelector('#password-login');
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert('Please enter both username and password.');
    return; 
  }

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    alert(`Login error: ${err.message}`);
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

