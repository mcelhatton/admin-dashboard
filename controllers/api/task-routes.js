const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Task, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Task.findAll({
    attributes: [
      'id',
      'task_url',
      'title',
      'created_at',
    ],
  })
    .then(dbTaskData => res.json(dbTaskData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'task_url',
      'title',
      'created_at',
    ],
  })
    .then(dbTaskData => {
      if (!dbTaskData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbTaskData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Task.create({
    title: req.body.title,
    task_url: req.body.task_url,
    user_id: req.session.user_id
  })
    .then(dbTaskData => res.json(dbTaskData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Task.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTaskData => {
      if (!dbTaskData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbTaskData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTaskData => {
      if (!dbTaskData) {
        res.status(404).json({ message: 'No task found with this id' });
        return;
      }
      res.json(dbTaskData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
