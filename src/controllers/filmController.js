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
    const query = Object.keys(req.body).length ? req.body : req.query;
    console.log(query);
    const { limit, offset, search } = query;
    const searchString = `%${search}%`;
    // If a user searches, it will be saved in the database with query and model.
    // const { saveSearch } = req.body;
    // if (saveSearch == null) searchController.saveSearch(search, 'people');
    return Film
      .findAndCountAll({
        limit: limit || 0,
        offset: offset || 0,
        raw: true,
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
