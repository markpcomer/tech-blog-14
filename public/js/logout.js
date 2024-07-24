const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    document.location.replace('/');
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

document.querySelector('#logout').addEventListener('click', logout);

