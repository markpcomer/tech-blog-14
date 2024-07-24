const router = require('express').Router();
const { Comment } = require('../../models');

const { checkLogin, withAuth } = require('../../utils/authGuard');

router.get('/', function(req, res) {
  Comment.findAll({})
      .then(function(dbCommentData) {
          res.json(dbCommentData);
      })
      .catch(function(err) {
          console.error(err);
          res.status(500).json(err);
      });
});

router.get('/:id', function(req, res) {
  Comment.findAll({
      where: {
          id: req.params.id
      }
  })
  .then(function(dbCommentData) {
      res.json(dbCommentData);
  })
  .catch(function(err) {
      console.error(err);
      res.status(500).json(err);
  });
});

router.post('/', withAuth, function(req, res) {
  if (req.session) {
      Comment.create({
          comment_text: req.body.comment_text,
          post_id: req.body.post_id,
          user_id: req.session.user_id,
      })
      .then(function(dbCommentData) {
          res.json(dbCommentData);
      })
      .catch(function(err) {
          console.error(err);
          res.status(400).json(err);
      });
  }
});

router.put('/:id', withAuth, function(req, res) {
  Comment.update({
      comment_text: req.body.comment_text
  }, {
      where: {
          id: req.params.id
      }
  })
  .then(function(dbCommentData) {
      if (!dbCommentData[0]) {
          res.status(404).json({ message: 'No comment found' });
          return;
      }
      res.json(dbCommentData);
  })
  .catch(function(err) {
      console.error(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, function(req, res) {
  Comment.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(function(dbCommentData) {
      if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found' });
          return;
      }
      res.json(dbCommentData);
  })
  .catch(function(err) {
      console.error(err);
      res.status(500).json(err);
  });
});

module.exports = router;




// router.post('/', checkLogin, async (req, res) => {
//   console.log('commentRoute post / ');
//   try {
//     const { comment_text, post_id } = req.body;
//     const dbCommentData = await Comment.create({
//       comment_text,
//       post_id,
//       user_id: req.session.user_id
//     });
//     res.json(dbCommentData);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json(err);
//   }
// });

// router.get('/', async (req, res) => {
//   console.log('commentRoute get / ');
//   try {
//     const dbCommentData = await Comment.findAll({});
//     res.json(dbCommentData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   console.log('commentRoute get /:id ');
//   try {
//     const dbCommentData = await Comment.findAll({
//       where: { id: req.params.id }
//     });
//     res.json(dbCommentData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.put('/:id', withAuth, async (req, res) => {
//   console.log('commentRoute put /:id ');
//   try {
//     const { comment_text } = req.body;
//     const dbCommentData = await Comment.update(
//       { comment_text },
//       { where: { id: req.params.id } }
//     );
//     if (!dbCommentData[0]) {
//       res.status(404).json({ message: 'No comment found with this id' });
//       return;
//     }
//     res.json(dbCommentData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   console.log('commentRoute delete /:id ');
//   try {
//     const dbCommentData = await Comment.destroy({
//       where: { id: req.params.id }
//     });
//     if (!dbCommentData) {
//       res.status(404).json({ message: 'No comment found with this id' });
//       return;
//     }
//     res.json(dbCommentData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// module.exports = router;


