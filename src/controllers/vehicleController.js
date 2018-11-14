import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Vehicle, Transport } = db;

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
    return Vehicle.all({ include: Transport })
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    return Vehicle.findAll({
      include: {
        model: Transport,
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
          ],
        },
      },
    })
      .then((vehicle) => {
        if (vehicle || vehicle.length > 0) {
          // If a user searches successfully, it will be saved in the database with query and model.
          const saveUrl = `${req.originalUrl}`;
          searchController.saveSearch(saveUrl, req.query.search, 'vehicles');
        }
        return res.status(200).send(vehicle);
      })
      .catch(error => res.status(400).send(error));
  },
};
