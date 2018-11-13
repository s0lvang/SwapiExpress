import { Op } from 'sequelize';
import db from '../models/index';

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
    if (req.query.search) return this.search(req, res);
    return Species
      .all()
      .then(species => res.status(200).send(species))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const { search } = req.query;
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
      .then(species => res.status(201).send(species))
      .catch(error => res.status(400).send(error));
  },
};
