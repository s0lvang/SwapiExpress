import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';
import searchQuery from '../utils/searchQuery';

const { Species } = db;

export default {
  list(req, res) {
    return this.search(req).then((species) => {
      if (species && species.count > 0) {
        // If user searches successfully, it will be saved in the database with query and model.
        searchController.saveSearch(req.originalUrl, req.query.search, 'species');
      }
      return species;
    })
      .then(species => res.status(200).send(species))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const {
      sortBy = 'id', order = 'asc', limit = 100, offset = 0, search = '',
    } = query;

    return Species.findAndCountAll({
      order: [ // Sorting by attribute and type
        [sortBy.toLowerCase(), order.toUpperCase()],
      ],
      limit,
      offset,
      raw: true,
      where: {
        [Op.or]: searchQuery(search, [
          'name',
          'classification',
          'designation',
          'language',
        ]),
      },
    });
  },
};
