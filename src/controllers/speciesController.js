import { Op } from 'sequelize';
import db from '../models/index';

const { Species } = db;

export default {
  create(req, res) {
    return Species
      .create({
        id: req.body.id,
        name: req.body.name,
        classification: req.body.classification,
        designation: req.body.designation,
        eye_colors: req.body.eye_colors,
        height: req.body.height,
        skin_colors: req.body.skin_colors,
        language: req.body.language,
        hair_colors: req.body.hair_colors,
        homeworld: req.body.homeworld,
        average_lifespan: req.body.average_lifespan,
        average_height: req.body.average_height,
      })
      .then(species => res.status(201).send(species))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    if (req.query.search || req.body.search) return this.search(req, res);
    return Species
      .all()
      .then(species => res.status(200).send(species))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const search = req.body.search != null ? `%${req.body.search}%` : `%${req.query.search}%`;
    return Species
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              classification: {
                [Op.iLike]: search,
              },
            },
            {
              designation: {
                [Op.iLike]: search,
              },
            },
            {
              language: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(species => res.status(201).send(species))
      .catch(error => res.status(400).send(error));
  },
};
