import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Character, Planet } = db;

export default {
  create(req, res) {
    return Character.create({
      id: req.body.id,
      ...req.body,
    })
      .then(person => res.status(201).send(person))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  list(req, res) {
    const exclude = req.query.exclude || '';
    if (req.query.search || req.body.search) {
      return this.search(req, res, exclude);
    }
    const { sortBy, order } = req.query;
    return Character.findAll({
      order: [
        [sortBy.toLowerCase(), order.toUpperCase()],
      ],
      where: {
        [Op.not]: {
          gender: {
            [Op.or]: exclude.split(','),
          },
        },
      },
      include: {
        model: Planet,
      },
    })
      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  },
  search(req, res, exclude) {
    // Gets the search query from either POST or GET
    const search = `%${req.query.search || req.body.search}%`;
    const { saveSearch } = req.body;
    // If there is a GET query, take these values
    const {
      sortBy, order, limit, offset,
    } = req.query;
    // Stops the mass post query from posting to the Search table, works for GET queries
    // If a user searches, it will be saved in the database with query and model.
    if (saveSearch == null) searchController.saveSearch(search, 'people');
    return Character.findAndCountAll({
      order: [ // Sorting by attribute and type
        [sortBy.toLowerCase(), order.toUpperCase()],
      ],
      limit,
      offset,
      where: {
        [Op.and]: [
          {
            name: {
              [Op.iLike]: search,
            },
          },
          {
            [Op.not]: {
              gender: {
                [Op.or]: exclude.split(','),
              },
            },
          },
        ],
      },
      include: Planet,
    })
      .then(person => res.status(201).send(person))
      .catch(error => res.status(400).send(error));
  },
};
