import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Character, Planet } = db;

export default {

  list(req, res) {
    return this.search(req)
      .then((person) => {
        if (person.count && req.query.search) {
          // If user searches successfully, it will be saved in the database with query and model.
          searchController.saveSearch(req.originalUrl, req.query.search, 'people');
        }
        return res.status(200).send(person);
      })

      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const {
      limit = 100,
      offset = 0,
      exclude = '',
      search,
      sortBy = 'id',
      order = 'asc',
    } = query;
    // Gets the search query from either POST or GET
    const searchString = `%${search}%`;
    return Character.findAndCountAll({
      limit,
      offset,
      order: [ // Sorting by attribute and type
        [sortBy.toLowerCase(), order.toUpperCase()],
      ],
      where: {
        [Op.and]: [
          {
            name: {
              [Op.iLike]: searchString,
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
    });
  },
};
