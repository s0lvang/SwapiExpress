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
    const query = Object.keys(req.body).length ? req.body : req.query;
    const { search, limit, offset } = query;
    const searchString = `%${search}%`;
    // const { saveSearch } = req.body;
    // if (saveSearch == null) searchController.saveSearch(search, 'people');
    // If a user searches, it will be saved in the database with query and model.
    return Starship.findAndCountAll({
      limit: limit || 0,
      offset: offset || 1,
      raw: true,
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
