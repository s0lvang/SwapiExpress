import db from '../models/index';

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
    return Film
      .all()
      .then(film => res.status(200).send(film))
      .catch(error => res.status(400).send(error));
  },
};
