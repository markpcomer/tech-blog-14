const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../../tech-blog-14/utils/authGuard');

router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      where: { id: req.params.id }
    });
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const { comment_text, post_id } = req.body;
    const dbCommentData = await Comment.create({
      comment_text,
      post_id,
      user_id: req.session.user_id
    });
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const { comment_text } = req.body;
    const dbCommentData = await Comment.update(
      { comment_text },
      { where: { id: req.params.id } }
    );
    if (!dbCommentData[0]) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: { id: req.params.id }
    });
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;


