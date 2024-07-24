// Defines signupFormHandler function to handle submission of signup form
const signupFormHandler = async (event) => {
  try {
    event.preventDefault();

    // Retrieves username, email, and password from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Returns if username, email, or password is empty
    if (!username || !email || !password) {
      return;
    }

    // Constructs the userData object with username, email, and password
    const userData = {
      username: username,
      email: email,
      password: password
    };

    // Sends POST request to create a new user
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Redirects to the dashboard if signup is successful; otherwise, displays an error
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
      throw new Error(response.statusText);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

// Event listener for submitting the signup form
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
