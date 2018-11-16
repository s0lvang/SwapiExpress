import { Op } from 'sequelize';
import db from '../models';

const { Search } = db;

export default {
  list(req, res) {
    return Search.findAll({
      order: [
        ['id', 'DESC'],
      ],
      limit: 10,
    })
      .then((search) => {
        res.status(200).send(search);
      })
      .catch(() => res.status(400).send('Oopsie Woopsie we made a fucky wucky (400 bad request)'));
  },
  filterModels(req, res) {
    return Search.findAll({
      order: [['id', 'DESC']],
      limit: 10,
      where: {
        model: {
          [Op.eq]: req.params.model,
        },
      },
    })
      .then((search) => {
        res.status(200).send(search);
      })
      .catch(() => res.status(400).send('Oopsie Woopsie we made a fucky wucky (400 bad request)'));
  },
  saveSearch(searchUrl, searchString, model) {
    return Search.create({
      search_url: searchUrl,
      search_string: searchString,
      model,
    });
  },
  countAll(req, res) {
    return Search.count()
      .then(count => res.status(200).send({ count }))
      .catch(() => res.status(400).send('Oopsie Woopsie we made a fucky wucky (400 bad request)'));
  },
};
