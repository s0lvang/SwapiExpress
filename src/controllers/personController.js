import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Character, Planet } = db;

export default {
  create(req, res) {
    return Character.create({
      id: req.body.id,
      ...req.body,
    })
      .then(person => res.status(201).send(person))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  list(req, res) {
    const exclude = req.query.exclude || '';
    if (req.query.search || req.body.search) {
      return this.search(req, res, exclude);
    }
    return Character.findAll({
      where: {
        [Op.not]: {
          gender: {
            [Op.or]: exclude.split(','),
          },
        },
      },
      include: {
        model: Planet,
      },
    })
      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  },
  search(req, res, exclude) {
    const search = `%${req.query.search || req.body.search}%`;
    const {
      limit,
      offset,
      column,
      value,
    } = req.query;
    const orderColumn = column || 'id';
    const orderValue = value || 'ASC';
    console.log(req.query);
    // If a user searches, it will be saved in the database with query and model.
    searchController.saveSearch(search, 'people');
    return Character.findAndCountAll({
      limit,
      offset,
      order: [[orderColumn, orderValue]],
      where: {
        [Op.and]: [
          {
            name: {
              [Op.iLike]: search,
            },
          },
          {
            [Op.not]: {
              gender: {
                [Op.or]: exclude.split(','),
              },
            },
          },
        ],
      },
      include: Planet,
    })
      .then(person => res.status(201).send(person))
      .catch(error => res.status(400).send(error));
  },
};
