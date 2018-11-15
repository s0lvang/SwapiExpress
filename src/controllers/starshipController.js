import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Starship, Transport } = db;

export default {
  create(req, res) {
    return Starship.create({
      ...req.body,
    })
      .then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search || req.body.search) return this.search(req, res);
    const { sortBy = 'id', order = 'asc' } = req.query;
    return Starship
      .findAll({
        order: [
          [sortBy.toLowerCase(), order.toUpperCase()],
        ],
        include: Transport,
      })
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    const {
      sortBy = 'id', order = 'asc', limit, offset,
    } = req.query;
    const { saveSearch } = req.body;
    return Starship.findAndCountAll({
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
      .then((starship) => {
        if (starship && starship.count > 0) {
          if (saveSearch == null) {
            // If user searches successfully, it will be saved in the database with query and model.
            const saveUrl = `${req.originalUrl}`;
            searchController.saveSearch(saveUrl, req.query.search, 'starships');
          }
        }
        return res.status(200).send(starship);
      })
      .catch(error => res.status(400).send(error));
  },
};
