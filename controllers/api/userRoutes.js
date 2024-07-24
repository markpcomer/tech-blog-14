const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');

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

router.post('/logout', function(req, res) {
    if (req.session.loggedIn) {
        req.session.destroy(function() {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

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




// const router = require('express').Router();
// const { Sequelize } = require('sequelize');
// const { User, Post, Comment } = require('../../models');
// const bcrypt = require('bcrypt'); 

// router.get('/', async (req, res) => {
//   try {
//     const dbUserData = await User.findAll({
//       attributes: { exclude: ['password'] }
//     });
//     res.json(dbUserData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const dbUserData = await User.findOne({
//       where: { id: req.params.id },
//       attributes: { exclude: ['password'] },
//       include: [
//         { model: Post, attributes: ['id', 'title', 'content', 'created_at'] },
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'created_at'],
//           include: { model: Post, attributes: ['title'] }
//         }
//       ]
//     });

//     if (!dbUserData) {
//       res.status(404).json({ message: 'No user found with this id' });
//       return;
//     }

//     res.json(dbUserData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if all required fields are present
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'Username, email, and password are required.' });
//     }

//     const dbUserData = await User.create({
//       username: username,
//       email: email,
//       password: password,
//     });

//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;
//       res.status(201).json(dbUserData);
//     });

//   } catch(err) {
//     if (err instanceof Sequelize.ValidationError) {
//       const errors = err.errors.map(error => error.message);
//       return res.status(400).json({ error: errors.join(', ')});
//     } else {
//       console.error(err);
//       res.status(500).json({ error: 'Server error'});
//     }
//   }
//   // } catch (err) {
//   //   console.error(err);
//   //   res.status(500).json(err);
//   // }
// });



// router.post('/', async (req, res) => {
//   try {
//     const dbUserData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;
//       res.json(dbUserData);
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const dbUserData = await User.findOne({
//       where: { username: req.body.username }
//     });

//     if (!dbUserData) {
//       res.status(400).json({ message: 'No user with that username!' });
//       return;
//     }

//     const validPassword = await bcrypt.compare(req.body.password, dbUserData.password);

//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect password!' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;
//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const dbUserData = await User.update(req.body, {
//       individualHooks: true,
//       where: { id: req.params.id }
//     });

//     if (!dbUserData[0]) {
//       res.status(404).json({ message: 'No user found with this id' });
//       return;
//     }

//     res.json(dbUserData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const dbUserData = await User.destroy({
//       where: { id: req.params.id }
//     });

//     if (!dbUserData) {
//       res.status(404).json({ message: 'No user found with this id' });
//       return;
//     }

//     res.json(dbUserData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// module.exports = router;



