import { Op } from 'sequelize';
import db from '../models/index';

const { Vehicle, Transport } = db;

export default {
  create(req, res) {
    return Vehicle.create({
      ...req.body,
    })
      .then(vehicle => res.status(201).send(vehicle))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  list(req, res) {
    if (req.query.search) return this.search(req, res);
    return Vehicle.all({ include: Transport })
      .then(vehicle => res.status(200).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const searchString = `%${req.query.search}%`;
    console.log(searchString);
    return Vehicle.findAll({
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
    })
      .then(vehicle => res.status(201).send(vehicle))
      .catch(error => res.status(400).send(error));
  },
};
