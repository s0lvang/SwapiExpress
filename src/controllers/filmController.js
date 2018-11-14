import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

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
    if (req.query.search || req.body.search) return this.search(req, res);
    return Film
      .all()
      .then(film => res.status(200).send(film))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
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
      .then((film) => {
        if (film || film.length > 0) {
          // If a user searches successfully, it will be saved in the database with query and model.
          const saveUrl = `http://it2810-06.idi.ntnu.no/api${req.url}`;
          searchController.saveSearch(saveUrl, req.query.search, 'films');
        }
        return res.status(200).send(film);
      })
      .catch(error => res.status(400).send(error));
  },
};
