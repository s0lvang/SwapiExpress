import {
  planetController,
  filmController,
  personController,
  speciesController,
  starshipController,
  vehicleController,
  massQueryController,
  searchController,
} from '../controllers/index';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to our Star Wars API!',
  }));

  app.get('/api/planets', planetController.list.bind(planetController));
  app.get('/api/films', filmController.list.bind(filmController));
  app.get('/api/people', personController.list.bind(personController));
  app.get('/api/species', speciesController.list.bind(speciesController));
  app.get('/api/starships', starshipController.list.bind(starshipController));
  app.get('/api/vehicles', vehicleController.list.bind(vehicleController));

  app.post('/api/all', massQueryController.search);

  app.get('/api/search', searchController.list);
  app.get('/api/search/count', searchController.countAll);
  app.get('/api/search/:model', searchController.filterModels);
};
