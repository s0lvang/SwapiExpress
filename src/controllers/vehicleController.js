import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

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
    if (req.query.search || req.body.search) return this.search(req, res);
    return Vehicle.all()
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    // If a user searches, it will be saved in the database with query and model.
    searchController.saveSearch(search, 'vehicles');
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
