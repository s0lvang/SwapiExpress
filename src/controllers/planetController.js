import { Op } from 'sequelize';
import db from '../models/index';

const { Planet } = db;

export default {
  create(req, res) {
    return Planet
      .create({
        id: req.body.id,
        ...req.body,
      })
      .then(planet => res.status(201).send(planet))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search) return this.search(req, res);
    return Planet
      .all()
      .then(planet => res.status(200).send(planet))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const { search } = req.query;
    return Planet
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              climate: {
                [Op.iLike]: search,
              },
            },
            {
              terrain: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(planet => res.status(201).send(planet))
      .catch(error => res.status(400).send(error));
  },
};
