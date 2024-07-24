const router = require('express').Router();
const { Comment } = require('../../models');
const { withAuth } = require('../../utils/authGuard');

// Route to get all comments
router.get('/', (req, res) => {
  Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

// Route to get a specific comment by ID
router.get('/:id', (req, res) => {
  Comment.findAll({ where: { id: req.params.id } })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

// Route to create a new comment (requires authentication)
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(400).json(err));
  }
});

// Route to update a comment by ID (requires authentication)
router.put('/:id', withAuth, (req, res) => {
  Comment.update({ comment_text: req.body.comment_text }, { where: { id: req.params.id } })
    .then(dbCommentData => {
      if (!dbCommentData[0]) res.status(404).json({ message: 'No comment found' });
      else res.json(dbCommentData);
    })
    .catch(err => res.status(500).json(err));
});

// Route to delete a comment by ID (requires authentication)
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(dbCommentData => {
      if (!dbCommentData) res.status(404).json({ message: 'No comment found' });
      else res.json(dbCommentData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
