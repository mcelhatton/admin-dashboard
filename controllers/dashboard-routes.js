const router = require('express').Router();
const sequelize = require('../config/connection');
const { Task, User } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Task.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'description',
      'created_at',
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE task.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbTaskData => {
      const tasks = dbTaskData.map(task => task.get({ plain: true }));
      res.render('dashboard', { tasks, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Task.findByPk(req.params.id, {
    attributes: [
      'id',
      'description',
      'title',
      'created_at',
      //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbTaskData => {
      if (dbTaskData) {
        const task = dbTaskData.get({ plain: true });
        
        res.render('edit-task', {
          task,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
