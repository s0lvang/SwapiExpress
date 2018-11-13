import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Planet } = db;

export default {
  create(req, res) {
    return Planet
      .create({
        id: req.body.id,
        ...req.body,
      })
      .then(planet => res.status(201).send(planet))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search || req.body.search) return this.search(req, res);
    return Planet
      .all()
      .then(planet => res.status(200).send(planet))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    // If a user searches, it will be saved in the database with query and model.
    searchController.saveSearch(search, 'planets');
    return Planet
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              climate: {
                [Op.iLike]: search,
              },
            },
            {
              terrain: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(planet => res.status(201).send(planet))
      .catch(error => res.status(400).send(error));
  },
};
