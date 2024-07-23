// Define deleteFormHandler function
async function deleteFormHandler(event) {
    try {
      event.preventDefault();
  
      const id = getLastSegmentFromUrl();
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ post_id: id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert(`Error deleting post: ${error.message}`);
    }
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
  
  function getLastSegmentFromUrl() {
    const urlSegments = window.location.toString().split('/');
    return urlSegments[urlSegments.length - 1];
  }
  

