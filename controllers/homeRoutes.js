const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

// Retrieves all posts with associated comments and users, renders home view
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

// Renders login view if not logged in, otherwise redirects to home
router.get('/login', function(req, res) {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Renders signup view
router.get('/signup', function(req, res) {
    res.render('signup');
});

// Retrieves a specific post by ID with comments and user, renders newPost view
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
        res.render('newPost', { post, loggedIn: req.session.loggedIn });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Retrieves a specific post by ID with comments and user, renders posts-comments view
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
