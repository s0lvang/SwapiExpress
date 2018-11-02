import { planetController } from '../controllers/index';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to my dick!',
  }));

  app.post('/api/planets', planetController.create);
  app.get('/api/planets', planetController.list);
};
