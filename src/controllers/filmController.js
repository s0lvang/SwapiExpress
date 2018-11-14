import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Film } = db;

export default {
  list(req, res) {
    return this.search(req, res)
      .then(film => res.status(200).send(film))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const search = req.body.search || req.query.search;
    const searchString = `%${search}%`;
    const { limit, offset } = req.query;
    // If a user searches, it will be saved in the database with query and model.
    const { saveSearch } = req.body;
    if (saveSearch == null) searchController.saveSearch(search, 'people');
    return Film
      .findAndCountAll({
        limit,
        offset,
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: searchString,
              },
            },
            {
              producer: {
                [Op.iLike]: searchString,
              },
            },
            {
              director: {
                [Op.iLike]: searchString,
              },
            },
            {
              opening_crawl: {
                [Op.iLike]: searchString,
              },
            },
          ],
        },
      });
  },
};
