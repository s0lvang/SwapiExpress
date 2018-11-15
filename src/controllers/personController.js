import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Character, Planet } = db;

export default {

  list(req, res) {
    return this.search(req)
      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  },
  search(req) {
    const query = Object.keys(req.body).length ? req.body : req.query;
    const {
      limit,
      offset,
      column,
      value,
      exclude,
      search,
    } = query;
    const excludeString = exclude || '';
    // Gets the search query from either POST or GET
    const searchString = `%${search}%`;
    // const { saveSearch } = req.body;
    // If there is a GET query, take these values
    // Sets default order by values
    const orderColumn = column || 'id';
    const orderValue = value || 'ASC';
    // Stops the mass post query from posting to the Search table, works for GET queries
    // If a user searches, it will be saved in the database with query and model.
    // if (saveSearch) searchController.saveSearch(search, 'people');
    return Character.findAndCountAll({
      limit: limit || 0,
      offset: offset || 0,
      order: [[orderColumn, orderValue]],
      raw: true,
      where: {
        [Op.and]: [
          {
            name: {
              [Op.iLike]: searchString,
            },
          },
          {
            [Op.not]: {
              gender: {
                [Op.or]: excludeString.split(','),
              },
            },
          },
        ],
      },
      include: Planet,
    });
  },
};
