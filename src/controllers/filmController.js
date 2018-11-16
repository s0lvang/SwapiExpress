import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';
import searchQuery from '../utils/searchQuery';

const { Film } = db;

export default {
  list(req, res) {
    return this.search(req, res).then((film) => {
      if (film && film.count > 0) {
        // If user searches successfully, it will be saved in the database with query and model.
        searchController.saveSearch(req.originalUrl, req.query.search, 'films');
      }
      return film;
    })
      .then(film => res.status(200).send(film))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const {
      sortBy = 'id', order = 'asc', limit = 100, offset = 0, search = '',
    } = query;
    return Film
      .findAndCountAll({
        limit,
        offset,
        order: [ // Sorting by attribute and type
          [sortBy.toLowerCase(), order.toUpperCase()],
        ],
        where: {
          [Op.or]: searchQuery(search, ['title', 'producer', 'director', 'opening_crawl']),
        },
      });
  },
};
