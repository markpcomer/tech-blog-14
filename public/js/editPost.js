// Define the editFormHandler function
const editFormHandler = async (event) => {
  event.preventDefault();

  const titleInput = document.querySelector('input[name="post-title"]');
  const contentInput = document.querySelector('input[name="content"]');
  const id = getIdFromUrl(); 

  const postData = {
    post_id: id,
    title: titleInput.value.trim(),
    content: contentInput.value.trim()
  };

  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

const getIdFromUrl = () => {
  const urlParts = window.location.toString().split('/');
  return urlParts[urlParts.length - 1];
};
