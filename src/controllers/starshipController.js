import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Starship } = db;

export default {
  create(req, res) {
    return Starship.create({
      ...req.body,
    })
      .then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search) return this.search(req, res);
    return Starship
      .all()
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const { search } = req.query;
    // If a user searches, it will be saved in the database with query and model.
    searchController.saveSearch(search, 'starships');
    return Starship
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              model: {
                [Op.iLike]: search,
              },
            },
            {
              manufacturer: {
                [Op.iLike]: search,
              },
            },
            {
              starship_class: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error));
  },
};
