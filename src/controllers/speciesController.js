import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Species } = db;

export default {

  list(req, res) {
    return this.search(res)
      .then(species => res.status(200).send(species))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const { limit, offset, search } = query;
    const searchString = `%${search}%`;
    console.log(limit || 0);
    // If a user searches, it will be saved in the database with query and model.
    // const { saveSearch } = req.body;
    // if (saveSearch == null) searchController.saveSearch(search, 'people');
    return Species
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
              classification: {
                [Op.iLike]: searchString,
              },
            },
            {
              designation: {
                [Op.iLike]: searchString,
              },
            },
            {
              language: {
                [Op.iLike]: searchString,
              },
            },
          ],
        },
      });
  },
};
