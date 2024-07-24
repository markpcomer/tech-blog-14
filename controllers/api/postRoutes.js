const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const {withAuth, c} = require('../../utils/authGuard');

router.get('/', function(req, res) {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            { model: User, attributes: ['username'] },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            }
        ]
    })
    .then(function(dbPostData) {
        res.json(dbPostData.reverse());
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/:id', function(req, res) {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            { model: User, attributes: ['username'] },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            }
        ]
    })
    .then(function(dbPostData) {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, function(req, res) {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(function(dbPostData) {
        res.json(dbPostData);
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// router.put('/:id', withAuth, function(req, res) {
//     Post.update({
//         title: req.body.title,
//         content: req.body.content
//     }, {
//         where: { id: req.params.id }
//     })
//     .then(function(dbPostData) {
//         if (!dbPostData[0]) {
//             res.status(404).json({ message: 'No post found' });
//             return;
//         }
//         res.json(dbPostData);
//     })
//     .catch(function(err) {
//         console.error(err);
//         res.status(500).json(err);
//     });
// });

router.put('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, function(req, res) {
    Post.destroy({
        where: { id: req.params.id }
    })
    .then(function(dbPostData) {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;



// const router = require('express').Router();
// const { Post, User, Comment } = require('../../models');
// const { checkLogin } = require('../../utils/authGuard');

// router.post('/', checkLogin, async (req, res) => {
//   console.log('postRoute post / ');
//   try {
//     const dbPostData = await Post.create({
//       title: req.body.title,
//       content: req.body.content,
//       user_id: req.session.user_id
//     });

//     res.json(dbPostData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.put('/:id', checkLogin, async (req, res) => {
//   console.log('postRoute put /:id ');
//   try {
//     const dbPostData = await Post.update(
//       { title: req.body.title, content: req.body.content },
//       { where: { id: req.params.id } }
//     );

//     if (!dbPostData[0]) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }

//     res.json(dbPostData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.delete('/:id', checkLogin, async (req, res) => {
//   console.log('postRoute delete /:id ');
//   try {
//     const dbPostData = await Post.destroy({
//       where: { id: req.params.id }
//     });

//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }

//     res.json(dbPostData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });




// router.get('/', async (req, res) => {
//   console.log('postRoute get / ');
//   try {
//     const dbPostData = await Post.findAll({
//       attributes: ['id', 'title', 'content', 'created_at'],
//       order: [['created_at', 'DESC']],
//       include: [
//         { model: User, attributes: ['username'] },
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: { model: User, attributes: ['username'] }
//         }
//       ]
//     });

//     res.json(dbPostData.reverse());
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   console.log('postRoute get /:id ');
//   try {
//     const dbPostData = await Post.findOne({
//       where: { id: req.params.id },
//       attributes: ['id', 'content', 'title', 'created_at'],
//       include: [
//         { model: User, attributes: ['username'] },
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: { model: User, attributes: ['username'] }
//         }
//       ]
//     });

//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }

//     res.json(dbPostData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });


// module.exports = router;


