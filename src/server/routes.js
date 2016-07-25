var controllers = require('./controllers');

module.exports = [
  {
    method: 'GET',
    path: '/salute/{name}',
    handler: controllers.users.salute
  }
];
