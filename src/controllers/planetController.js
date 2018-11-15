import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Planet } = db;

export default {
  list(req, res) {
    this.search(req, res)
      .then(planet => res.status(200).send(planet))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const { limit, offset, search } = query;
    const searchString = `%${search}%`;
    // If a user searches, it will be saved in the database with query and model.
    // const { saveSearch } = req.body;
    // if (saveSearch) searchController.saveSearch(search, 'people');
    return Planet
      .findAndCountAll({
        limit: limit || 0,
        offset: offset || 0,
        raw: true,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: searchString,
              },
            },
            {
              climate: {
                [Op.iLike]: searchString,
              },
            },
            {
              terrain: {
                [Op.iLike]: searchString,
              },
            },
          ],
        },
      });
  },
};
