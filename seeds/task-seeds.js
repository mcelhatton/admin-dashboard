const { Task } = require('../models');

const taskdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    description: 'I have some much work to do.',
    user_id: 10
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    description: 'I have some much work to do.',
    user_id: 8
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    description: 'I have some much work to do.',
    user_id: 1
  },
  {
    title: 'Nunc purus.',
    description: 'I have some much work to do.',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    description: 'I have some much work to do.',
    user_id: 7
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    description: 'I have some much work to do.',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    description: 'I have some much work to do.',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    description: 'I have some much work to do.',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    description: 'I have some much work to do.',
    user_id: 9
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    description: 'I have some much work to do.',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    description: 'I have some much work to do.',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    description: 'I have some much work to do.',
    user_id: 10
  },
  {
    title: 'Donec dapibus.',
    description: 'I have some much work to do.',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    description: 'I have some much work to do.',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    description: 'I have some much work to do.',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
      description: 'I have some much work to do.',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    description: 'I have some much work to do.',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    description: 'I have some much work to do.',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    description: 'I have some much work to do.',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    description: 'I have some much work to do.',
    user_id: 7
  }
];

const seedTasks = () => Task.bulkCreate(taskdata);

module.exports = seedTasks;
