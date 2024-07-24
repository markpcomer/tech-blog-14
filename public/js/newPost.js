const newPostFormHandler = async (event) => {
  console.log("newPost");
  try {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();
  

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

