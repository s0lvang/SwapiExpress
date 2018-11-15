import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Species } = db;

export default {
  create(req, res) {
    return Species
      .create({
        id: req.body.id,
        ...req.body,
      })
      .then(species => res.status(201).send(species))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search || req.body.search) return this.search(req, res);
    const { sortBy, order } = req.query;
    return Species
      .all({
        order: [
          [sortBy.toLowerCase(), order.toUpperCase()],
        ],
      })
      .then(species => res.status(200).send(species))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    const {
      sortBy, order, limit, offset,
    } = req.query;
    // If a user searches, it will be saved in the database with query and model.
    const { saveSearch } = req.body;
    if (saveSearch == null) searchController.saveSearch(search, 'people');
    return Species
      .findAndCountAll({
        order: [ // Sorting by attribute and type
          [sortBy.toLowerCase(), order.toUpperCase()],
        ],
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              classification: {
                [Op.iLike]: search,
              },
            },
            {
              designation: {
                [Op.iLike]: search,
              },
            },
            {
              language: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(species => res.status(201).send(species))
      .catch(error => res.status(400).send(error));
  },
};
