import db from '../models/index';
import vehicle from '../models/vehicle';

const { Vehicle } = db;

export default {
  create(req, res) {
    return Vehicle.create({
      id: req.body.id,
      vehicle_class: req.body.vehicle_class,
    })
      .then(starship => res.status(201).send(starship))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  list(req, res) {
    return Vehicle.all()
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
};
