async function commentFormHandler(event) {
    try {
      event.preventDefault();
  
      const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
  
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
        document.location.replace('/login');
      }
    } catch (error) {
      alert(`Error submitting comment: ${error.message}`);
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  
  function getLastSegmentFromUrl() {
    const urlSegments = window.location.toString().split('/');
    return urlSegments[urlSegments.length - 1];
  }
  


  
