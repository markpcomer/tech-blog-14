// Defines deleteFormHandler function to handle post deletion
async function deleteFormHandler(event) {
  try {
    event.preventDefault();

    // Retrieves the ID of the post to be deleted
    const id = getLastSegmentFromUrl();

    // Sends DELETE request to delete the post
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        post_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Redirects to the dashboard if deletion is successful; otherwise, throws an error
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    alert(`Error deleting post: ${error.message}`);
  }
}

// Event listener for clicking the delete post button
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);

// Function to get the last segment (ID) from the current URL
function getLastSegmentFromUrl() {
  const urlSegments = window.location.toString().split('/');
  return urlSegments[urlSegments.length - 1];
}
