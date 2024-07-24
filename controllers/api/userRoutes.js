const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');

// Retrieves all users excluding password attribute
router.get('/', function(req, res) {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(function(dbUserData) {
        res.json(dbUserData);
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Retrieves a specific user by ID with associated posts and comments
router.get('/:id', function(req, res) {
    User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] },
        include: [
            { model: Post, attributes: ['id', 'title', 'content', 'created_at'] },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: { model: Post, attributes: ['title'] }
            },
            { model: Post, attributes: ['title'] }
        ]
    })
    .then(function(dbUserData) {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Creates a new user with username, email, and password
router.post('/', function(req, res) {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(function(dbUserData) {
        req.session.save(function() {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Logs in a user with username and password
router.post('/login', function(req, res) {
    User.findOne({
        where: { username: req.body.username }
    })
    .then(function(dbUserData) {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user located' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        req.session.save(function() {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'Logged in' });
        });
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Logs out the currently logged-in user
router.post('/logout', function(req, res) {
    if (req.session.loggedIn) {
        req.session.destroy(function() {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Updates a user by ID
router.put('/:id', function(req, res) {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(function(dbUserData) {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

// Deletes a user by ID
router.delete('/:id', function(req, res) {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(function(dbUserData) {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(function(err) {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;
