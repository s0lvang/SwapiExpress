import { Op } from 'sequelize';
import db from '../models/index';

const { Starship, Transport } = db;

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
      .findAll({ include: Transport })
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const searchString = `%${req.query.search}%`;
    return Starship.findAll({
      include: {
        model: Transport,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: searchString,
              },
            },
            {
              model: {
                [Op.iLike]: searchString,
              },
            },
            {
              manufacturer: {
                [Op.iLike]: searchString,
              },
            },
          ],
        },
      },
    }).then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error));
  },
};
