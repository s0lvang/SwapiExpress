import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';
import searchQuery from '../utils/searchQuery';

const { Vehicle, Transport } = db;

export default {
  list(req, res) {
    return this.search(req)
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
  async search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const { limit, offset, search } = query;
    // const { saveSearch } = req.query || req.body;
    // if (saveSearch === null) searchController.saveSearch(search, 'people');
    // If a user searches, it will be saved in the database with query and model.
    return Vehicle.findAndCountAll({
      limit: limit || 100,
      offset: offset || 0,
      raw: true,
      include: {
        model: Transport,
        where: {
          [Op.or]: searchQuery(search, ['name', 'model', 'manufacturer']),
        },
      },
    });
  },
};
