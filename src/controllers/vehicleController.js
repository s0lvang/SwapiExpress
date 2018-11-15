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
    const { sortBy, order } = req.query;
    return Vehicle.all({
      order: [
        [sortBy.toLowerCase(), order.toUpperCase()],
      ],
      include: Transport,
    })
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    const {
      sortBy, order, limit, offset,
    } = req.query;
    const { saveSearch } = req.body;
    if (saveSearch == null) searchController.saveSearch(search, 'people');
    // If a user searches, it will be saved in the database with query and model.
    return Vehicle.findAndCountAll({
      order: [ // Sorting by attribute and type
        [sortBy.toLowerCase(), order.toUpperCase()],
      ],
      limit,
      offset,
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
      .then(vehicle => res.status(201).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
};
