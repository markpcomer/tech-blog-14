const signupFormHandler = async (event) => {
  event.preventDefault();
 console.log("clicked");

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


  if (!username || !email || !password) {
    return; 
  }

  try {
    const userData = {
      username: username,
      email: email,
      password: password
    };
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(
        userData
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
      throw new Error(response.statusText);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
    alert('Signup problem');
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);

