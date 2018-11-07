import { 
  planetController,
  filmController,
  personController,
  speciesController,
  starshipController,
  vehicleController,
} from '../controllers/index';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to my dick!',
  }));

  app.post('/api/planets', planetController.create);
  app.get('/api/planets', planetController.list);

  app.post('/api/films', filmController.create);
  app.get('/api/films', filmController.list);

  app.post('/api/people', personController.create);
  app.get('/api/people', personController.list);

  app.post('/api/species', speciesController.create);
  app.get('/api/species', speciesController.list);

  app.post('/api/starships', starshipController.create);
  app.get('/api/starships', starshipController.list);

  app.post('/api/vehicles', vehicleController.create);
  app.get('/api/vehicles', vehicleController.list);
};
