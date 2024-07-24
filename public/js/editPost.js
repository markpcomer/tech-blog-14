// Define the editFormHandler function
const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="content"]').value;
  const id = getIdFromUrl(); 

  // const postData = {
  //   post_id: id,
  //   title: title.value.trim(),
  //   content: contentInput.value.trim()
  // };

  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(
        title,
        content
      ),
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


// document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
document.body.addEventListener('submit', (event) => {
  if (event.target.id === 'edit-post-form') {
    editFormHandler(event);
  }
});


const getIdFromUrl = () => {
  const urlParts = window.location.toString().split('/');
  return urlParts[urlParts.length - 1];
};


