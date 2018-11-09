import db from '../models/index';

const { Vehicle } = db;

export default {
  create(req, res) {
    return Vehicle.create({
      ...req.body,
    })
      .then(vehicle => res.status(201).send(vehicle))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  list(req, res) {
    return Vehicle.all()
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
};
