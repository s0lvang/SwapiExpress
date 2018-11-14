import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Species } = db;

export default {
  create(req, res) {
    return Species
      .create({
        id: req.body.id,
        ...req.body,
      })
      .then(species => res.status(201).send(species))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search || req.body.search) return this.search(req, res);
    return Species
      .all()
      .then(species => res.status(200).send(species))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    return Species
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              classification: {
                [Op.iLike]: search,
              },
            },
            {
              designation: {
                [Op.iLike]: search,
              },
            },
            {
              language: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then((species) => {
        if (species || species.length > 0) {
          // If a user searches successfully, it will be saved in the database with query and model.
          const saveUrl = `http://it2810-06.idi.ntnu.no/api${req.url}`;
          searchController.saveSearch(saveUrl, req.query.search, 'species');
        }
        return res.status(200).send(species);
      })
      .catch(error => res.status(400).send(error));
  },
};
