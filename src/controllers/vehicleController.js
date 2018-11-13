import { Op } from 'sequelize';
import db from '../models/index';

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
    if (req.query.search) return this.search(req, res);
    return Vehicle.all()
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const { search } = req.query;
    return Vehicle
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              model: {
                [Op.iLike]: search,
              },
            },
            {
              manufacturer: {
                [Op.iLike]: search,
              },
            },
            {
              vehicle_class: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(vehicle => res.status(201).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
};
