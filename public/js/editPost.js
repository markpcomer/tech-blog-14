// Defines editFormHandler function to handle post editing
const editFormHandler = async (event) => {
  event.preventDefault();

  // Retrieves title, content, and post ID from the form
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;
  const id = getIdFromUrl();

  try {
    // Sends PUT request to update the post
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }), // Corrected body format to send an object with title and content
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Redirects to the dashboard if update is successful; otherwise, throws an error
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

// Event listener to handle form submission for editing a post
document.body.addEventListener('submit', (event) => {
  if (event.target.id === 'edit-post-form') {
    editFormHandler(event);
  }
});

// Function to extract the ID from the current URL
const getIdFromUrl = () => {
  const urlParts = window.location.toString().split('/');
  return urlParts[urlParts.length - 1];
};
