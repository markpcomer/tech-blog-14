// Defines newPostFormHandler function to handle submission of new post form
const newPostFormHandler = async (event) => {
  try {
    event.preventDefault();

    // Retrieves title and content from the new post form
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();

    // Throws an error if title or content is empty
    if (!title || !content) {
      throw new Error('Please enter both title & content.');
    }

    // Constructs the postData object with title and content
    const postData = {
      title: title,
      content: content
    };

    // Sends POST request to create a new post
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Redirects to the dashboard if post creation is successful; otherwise, displays an error
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    document.location.replace('/dashboard');
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

// Event listener for submitting the new post form
document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);
