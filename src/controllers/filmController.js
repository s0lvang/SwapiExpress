import Sequelize from 'sequelize';
import db from '../models/index';

const { Film } = db;
const Op = Sequelize.Op;

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
    return Film
      .all()
      .then(film => res.status(200).send(film))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = `%${req.body.value0}%`;
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
