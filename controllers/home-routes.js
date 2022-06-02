const router = require('express').Router();
const sequelize = require('../config/connection');
const { Task, User } = require('../models');

// get all tasks for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Task.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'created_at',
    ],
  })
    .then(dbTaskData => {
      const tasks = dbTaskData.map(task => task.get({ plain: true }));

      res.render('homepage', {
        tasks,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'description',
      'created_at',
    ],
    include: [
      {
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbTaskData => {
      if (!dbTaskData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbTaskData.get({ plain: true });

      res.render('single-task', {
        task,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
