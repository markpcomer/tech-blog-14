const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

router.get('/', function(req, res) {
    Post.findAll({
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
        res.render('home', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/login', function(req, res) {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.get('/post/:id', function(req, res) {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'content', 'title', 'created_at'],
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('newPost', { post, loggedIn: req.session.loggedIn });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/posts-comments', function(req, res) {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'content', 'title', 'created_at'],
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;



// const router = require('express').Router();
// const { Post, User, Comment } = require('../models');
// const { withAuth, withoutAuth } = require('../utils/authGuard');

// router.get('/',  withAuth, async (req, res) => {
//   console.log('homeroute get / ');
//   try {
//     const dbPostData = await Post.findAll({
//       attributes: ['id', 'title', 'content', 'created_at'],
//       include: [
//         { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: { model: User, attributes: ['username'] }
//         },
//         { model: User, attributes: ['username'] }
//       ],
//     });

//     const posts = dbPostData.map(post => post.get({ plain: true }));
//     res.render('home', { posts, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/new', withAuth, (req, res) => {
//   console.log('homeroute get /new ');
//   res.render('newPost', {
//     dashboard: true,
//     loggedIn: req.session.logged_in
//   });
// });


// router.get('/post/:id', async (req, res) => {
//   console.log('homeroute get /post/:id ');
//   try {
//     const dbPostData = await Post.findOne({
//       where: { id: req.params.id },
//       attributes: ['id','content', 'title',  'created_at'],
//       include: [
//         { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: { model: User, attributes: ['username'] }
//         },
//         { model: User, attributes: ['username'] }
//       ],
//     });

//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }

//     const post = dbPostData.get({ plain: true });
//     res.render('post', { post, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/login', withoutAuth, (req, res) => {
//   console.log('homeroute get /login ');
//   try {
//     res.render('login');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/signup', withoutAuth, (req, res) => {
//   console.log('homeroute get /signup ');
//   res.render('signup');
// });

// router.get('/edit/:id', withAuth, async (req, res) => {
//   console.log('homeroute get /edit/:id ');
//   try {
//     const postData = await Post.findByPk(req.params.id);

//     if (postData) {
//       const post = postData.get({ plain: true });

//       res.render('editPost', {
//         dashboard: true,
//         post,
//         loggedIn: req.session.logged_in,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// module.exports = router;

