const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const { withAuth } = require('../utils/authGuard');

// Retrieves posts created by the logged-in user and renders the dashboard view
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
        res.render('dashboard', { posts, loggedIn: true }); // Renders dashboard view with posts
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Retrieves a specific post by ID for editing and renders the edit post view
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
        res.render('editPost', { post, loggedIn: true }); // Renders edit post view with post data
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Renders the form for creating a new post
router.get('/new', function(req, res) {
    res.render('newPost'); // Renders new post form view
});

module.exports = router;
