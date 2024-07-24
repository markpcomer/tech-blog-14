const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const {withAuth} = require('../utils/authGuard');

router.get('/', withAuth, function(req, res) {
    Post.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            },
            { model: User, attributes: ['username'] }
        ]
    })
    .then(function(dbPostData) {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, function(req, res) {
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
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });
        res.render('editPost', { post, loggedIn: true });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/new', function(req, res) {
    res.render('newPost');
});

module.exports = router;



// const router = require('express').Router();
// const { Post, User, Comment } = require('../models');
// const { withAuth } = require('../utils/authGuard');

// router.get('/', withAuth, async (req, res) => {
//   console.log('dashBoardRoute get / ');
//   try {
//     const dbPostData = await Post.findAll({
//       where: { user_id: req.session.user_id },
//       attributes: ['id', 'title', 'content', 'created_at'],
//       include: [
//         { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: { model: User, attributes: ['username'] }
//         },
//         { model: User, attributes: ['username'] }
//       ],
//     });

//     const posts = dbPostData.map(post => post.get({ plain: true }));
//     res.render('dashboard', { posts, loggedIn: true });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/new', (req, res) => {
//   console.log('dashBoardRoute get /new ');
//     res.render('newPost');
//   });
  

// router.get('/edit/:id', withAuth, async (req, res) => {
//   console.log('dashBoardRoute get /edit/:id');
//   try {
//     const dbPostData = await Post.findOne({
//       where: { id: req.params.id },
//       attributes: ['id', 'title', 'content', 'created_at'],
//       include: [
//         { model: User, attributes: ['username'] },
//         { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: { model: User, attributes: ['username'] }
//         }
//       ],
//     });

//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }

//     const post = dbPostData.get({ plain: true });
//     res.render('editPost', { post, loggedIn: true });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


// module.exports = router;


