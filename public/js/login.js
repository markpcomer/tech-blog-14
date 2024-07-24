// Handles form submission for user login
async function loginFormHandler(event) {
  event.preventDefault();

  // Retrieves username and password from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      // Sends POST request to log in the user
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      // Redirects to the dashboard if login is successful; otherwise, displays an error
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
}

// Event listener for submitting the login form
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
