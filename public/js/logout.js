// Defines logout function to handle user logout
const logout = async () => {
  try {
    // Sends POST request to log the user out
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Redirects to the homepage if logout is successful; otherwise, displays an error
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    document.location.replace('/');
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

// Event listener for clicking the logout button
document.querySelector('#logout').addEventListener('click', logout);
