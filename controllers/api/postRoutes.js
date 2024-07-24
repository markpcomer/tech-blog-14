const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const { withAuth } = require('../../utils/authGuard');

// Retrieves all posts with user and comment details, ordered by creation date
router.get('/', (req, res) => {
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
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => res.status(500).json(err));
});

// Retrieves a specific post by ID with user and comment details
router.get('/:id', (req, res) => {
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
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});

// Creates a new post with title, content, and associated user ID (requires authentication)
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

// Updates an existing post by ID with new title and content (requires authentication)
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: { id: req.params.id }
    })
    .then(dbPostData => {
        if (!dbPostData[0]) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});

// Deletes a post by ID (requires authentication)
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: { id: req.params.id }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
