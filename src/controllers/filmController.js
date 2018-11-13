import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Film } = db;

export default {
  create(req, res) {
    return Film
      .create({
        id: req.body.id,
        title: req.body.title,
        producer: req.body.producer,
        episode_id: req.body.episode_id,
        director: req.body.director,
        release_date: req.body.release_date,
        opening_crawl: req.body.opening_crawl,
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
    // If a user searches, it will be saved in the database with query and model.
    searchController.saveSearch(search, 'films');
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
