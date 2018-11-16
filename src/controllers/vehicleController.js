import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';
import searchQuery from '../utils/searchQuery';

const { Vehicle, Transport } = db;

export default {
  list(req, res) {
    return this.search(req)
      .then((vehicle) => {
        if (vehicle.count && req.query.search) {
          // If user searches successfully, it will be saved in the database with query and model.
          searchController.saveSearch(req.originalUrl, req.query.search, 'vehicles');
        }
        return vehicle;
      })
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
  async search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const {
      sortBy = 'id', order = 'asc', limit = 100, offset = 0, search,
    } = query;
    return Vehicle.findAndCountAll({
      limit,
      offset,
      order: [
        [{
          model: Transport,
          foreignKey: 'transportId',
        },
        sortBy.toLowerCase(), order.toUpperCase()],
      ],
      include: {
        model: Transport,
        where: {
          [Op.or]: searchQuery(search, ['name', 'model', 'manufacturer']),
        },
      },
    });
  },
};
