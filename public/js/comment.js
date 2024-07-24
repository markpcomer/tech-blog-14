async function commentFormHandler(event) {
  event.preventDefault();

  // const title = document.querySelector('input[name="post-title"]').value;
  // const content = document.querySelector('input[name="content"]').value;
    const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

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

  if(response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
    document.querySelector('#comment-form').style.display = "block";
  }
};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);


// async function commentFormHandler(event) {
//     try {
//       event.preventDefault();
  
//       const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
  
//       const post_id = getLastSegmentFromUrl();
  
//       if (!comment_text) {
//         return; 
//       }
  
//       const response = await fetch('/api/comments', {
//         method: 'POST',
//         body: JSON.stringify({ post_id, comment_text }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       if (response.ok) {
//         document.location.reload(); 
//       } else {
//         document.location.replace('/login');
//       }
//     } catch (error) {
//       alert(`Error submitting comment: ${error.message}`);
//     }
//   }
  
//   document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  
//   function getLastSegmentFromUrl() {
//     const urlSegments = window.location.toString().split('/');
//     return urlSegments[urlSegments.length - 1];
//   }
  


  
