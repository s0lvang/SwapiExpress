const planetsController = require('../controllers').planets;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Planets API!',
  }));

  app.post('/api/planets', planetsController.create);
  app.get('/api/planets', planetsController.list);
};
