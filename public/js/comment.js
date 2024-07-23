async function commentFormHandler(event) {
    try {
      event.preventDefault();
  
      const commentInput = document.querySelector('input[name="comment-body"]');
      const comment_text = commentInput.value.trim();
  
      const post_id = getLastSegmentFromUrl();
  
      if (!comment_text) {
        return; 
      }
  
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id, comment_text }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload(); 
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      alert(`Error submitting comment: ${error.message}`);
      document.querySelector('#comment-form').style.display = "block"; // Show comment form again on error
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  
  function getLastSegmentFromUrl() {
    const urlSegments = window.location.toString().split('/');
    return urlSegments[urlSegments.length - 1];
  }
  
