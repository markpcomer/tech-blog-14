// Handles form submission for posting comments
async function commentFormHandler(event) {
  event.preventDefault();

  // Get comment text and post ID from the form
  const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  // Send POST request to create a new comment
  const response = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({
      post_id,
      comment_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Reload the page if comment creation is successful; otherwise, display error
  if(response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
    document.querySelector('#comment-form').style.display = "block";
  }
};

// Event listener for comment form submission
document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);
