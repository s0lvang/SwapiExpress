import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Starship, Transport } = db;

export default {

  list(req, res) {
    return this.search(req)
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const search = req.body.search || req.query.search;
    const searchString = `%${search}%`;
    const { limit, offset } = req.query;
    const { saveSearch } = req.body;
    if (saveSearch == null) searchController.saveSearch(search, 'people');
    // If a user searches, it will be saved in the database with query and model.
    return Starship.findAndCountAll({
      limit,
      offset,
      include: {
        model: Transport,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: searchString,
              },
            },
            {
              model: {
                [Op.iLike]: searchString,
              },
            },
            {
              manufacturer: {
                [Op.iLike]: searchString,
              },
            },
          ],
        },
      },
    });
  },
};
