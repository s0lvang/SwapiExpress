import { Op } from 'sequelize';
import db from '../models/index';

const { Film } = db;

export default {
  create(req, res) {
    return Film
      .create({
        id: req.body.id,
        ...req.body,
      })
      .then(film => res.status(201).send(film))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search) return this.search(req, res);
    return Film
      .all()
      .then(film => res.status(200).send(film))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const { search } = req.query;
    return Film
      .findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: search,
              },
            },
            {
              producer: {
                [Op.iLike]: search,
              },
            },
            {
              director: {
                [Op.iLike]: search,
              },
            },
            {
              opening_crawl: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(film => res.status(201).send(film))
      .catch(error => res.status(400).send(error));
  },
};
