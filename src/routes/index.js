import {
  planetController,
  filmController,
  personController,
  speciesController,
  starshipController,
  vehicleController,
  transportController,
  massQueryController,
} from '../controllers/index';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to my dick!',
  }));

  app.post('/api/planets', planetController.create);
  app.get('/api/planets', planetController.list.bind(planetController));

  app.post('/api/films', filmController.create);
  app.get('/api/films', filmController.list.bind(filmController));

  app.post('/api/people', personController.create);
  app.get('/api/people', personController.list.bind(personController));

  app.post('/api/species', speciesController.create);
  app.get('/api/species', speciesController.list.bind(speciesController));

  app.post('/api/starships', starshipController.create);
  app.get('/api/starships', starshipController.list.bind(starshipController));

  app.post('/api/vehicles', vehicleController.create);
  app.get('/api/vehicles', vehicleController.list.bind(vehicleController));

  app.post('/api/transport', transportController.create);
  app.get('/api/transport', transportController.list);

  app.get('/api/all', massQueryController.list);
};
