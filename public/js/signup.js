const signupFormHandler = async (event) => {
  event.preventDefault();
 console.log("clicked");
  const formData = {
    username: document.querySelector('#username-signup').value.trim(),
    email: document.querySelector('#email-signup').value.trim(),
    password: document.querySelector('#password-signup').value.trim()
  };

  if (!formData.username || !formData.email || !formData.password) {
    return; 
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up');
      throw new Error(response.statusText);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);

