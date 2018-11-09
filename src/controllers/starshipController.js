import Sequelize from 'sequelize';
import db from '../models/index';

const { Starship } = db;
const Op = Sequelize.Op;


export default {
  create(req, res) {
    return Starship
      .create({
        id: req.body.id,
        MGLT: req.body.MGLT,
        starship_class: req.body.starship_class,
        hyperdrive_rating: req.body.hyperdrive_rating,
      })
      .then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Starship
      .all()
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = `%${req.body.value0}%`;
    return Starship
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              model: {
                [Op.iLike]: search,
              },
            },
            {
              manufacturer: {
                [Op.iLike]: search,
              },
            },
            {
              starship_class: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error));
  },
};
