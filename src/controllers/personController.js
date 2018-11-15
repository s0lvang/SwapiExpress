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
    // Gets the search query from either POST or GET
    const search = `%${req.query.search || req.body.search}%`;
    const { saveSearch } = req.body;
    // If there is a GET query, take these values
    const {
      limit,
      offset,
      column,
      value,
    } = req.query;
    // Sets default order by values
    const orderColumn = column || 'id';
    const orderValue = value || 'ASC';
    // Stops the mass post query from posting to the Search table, works for GET queries
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
      .then((person) => {
        if (person && person.count > 0) {
          if (saveSearch == null) {
            // If user searches successfully, it will be saved in the database with query and model.
            const saveUrl = `${req.originalUrl}`;
            searchController.saveSearch(saveUrl, req.query.search, 'people');
          }
        }
        return res.status(200).send(person);
      })
      .catch(error => res.status(400).send(error));
  },
};
