const newPostFormHandler = async (event) => {
  try {
    event.preventDefault();

    const titleInput = document.querySelector('input[name="post-title"]');
    const contentInput = document.querySelector('input[name="content"]');
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      throw new Error('Please enter both title & content.');
    }

    const postData = {
      title,
      content
    };

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    document.location.replace('/dashboard');
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);

