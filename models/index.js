const User = require('./User');
const Task = require('./Task');

Task.belongsTo(User);
User.hasMany(Task);


module.exports = {
  User,
  Task
};