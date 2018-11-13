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
    if (req.query.search) return this.search(req, res);
    return Vehicle.all({ include: Transport })
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const { search } = req.query;
    const searchString = `%${search}%`;
    searchController.saveSearch(search, 'vehicles');
    // If a user searches, it will be saved in the database with query and model.
    return Vehicle.findAll({
      include: {
        model: Transport,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: searchString,
              },
            },
            {
              model: {
                [Op.iLike]: searchString,
              },
            },
            {
              manufacturer: {
                [Op.iLike]: searchString,
              },
            },
          ],
        },
      },
    })
      .then(vehicle => res.status(201).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
};
