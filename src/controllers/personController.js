import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Character } = db;

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
    if (req.query.search || req.body.search) return this.search(req, res);
    return Character.all()
      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    // If a user searches, it will be saved in the database with query and model.
    searchController.saveSearch(search, 'people');
    return Character
      .findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              gender: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(person => res.status(201).send(person))
      .catch(error => res.status(400).send(error));
  },
};
