import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';
import searchQuery from '../utils/searchQuery';

const { Planet } = db;

export default {
  list(req, res) {
    this.search(req, res)
      .then((planet) => {
        if (planet.count && req.query.search) {
          // If user searches successfully, it will be saved in the database with query and model.
          searchController.saveSearch(
            req.originalUrl,
            req.query.search,
            'planet',
          );
        }
        return planet;
      })
      .then(planet => res.status(200).send(planet))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const {
      limit = 100,
      offset = 0,
      search,
      sortBy = 'id',
      order = 'asc',
    } = query;
    // If a user searches, it will be saved in the database with query and model.
    // const { saveSearch } = req.body;
    // if (saveSearch) searchController.saveSearch(search, 'people');
    return Planet.findAndCountAll({
      limit,
      offset,
      order: [[sortBy.toLowerCase(), order.toUpperCase()]],
      where: {
        [Op.or]: searchQuery(search, ['name', 'terrain', 'name']),
      },
    });
  },
};
