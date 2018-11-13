import { Op } from 'sequelize';
import db from '../models/index';
import searchController from './searchController';

const { Character } = db;

export default {
  create(req, res) {
    return Character.create({
      id: req.body.id,
      name: req.body.name,
      gender: req.body.gender,
      skin_color: req.body.skin_color,
      hair_color: req.body.hair_color,
      height: req.body.height,
      eye_color: req.body.eye_color,
      mass: req.body.mass,
      homeworld: req.body.homeworld,
      birth_year: req.body.birth_year,
    })
      .then(person => res.status(201).send(person))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  list(req, res) {
    if (req.query.search) return this.search(req, res);
    return Character.all()
      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  },
  search(req, res) {
    const { search } = req.query;
    // If a user searches, it will be saved in the database with query and model.
    searchController.saveSearch(search, 'people');
    return Character
      .findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: search,
              },
            },
            {
              gender: {
                [Op.iLike]: search,
              },
            },
          ],
        },
      })
      .then(person => res.status(201).send(person))
      .catch(error => res.status(400).send(error));
  },
};
