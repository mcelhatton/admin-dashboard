const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const taskRoutes = require('./task-routes.js');


router.use('/users', userRoutes);
router.use('/task', taskRoutes);


module.exports = router;