async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}


document.querySelector('#login-form').addEventListener('submit', loginFormHandler);


// // Define loginFormHandler function
// const loginFormHandler = async (event) => {
//   event.preventDefault();
//   console.log("loginFormHandler");

//   const username = document.querySelector('#username-login').value.trim();
//   const password = document.querySelector('#password-login').value.trim();


//   if (!username || !password) {
//     alert('Please enter both username and password.');
//     return; 
//   }

//   try {
//     const response = await fetch('/api/users/login', {
//       method: 'post',
//       body: JSON.stringify({ username, password }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       throw new Error(response.statusText);
//     }
//   } catch (err) {
//     alert(`Login error: ${err.message}`);
//   }
// };

// document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

