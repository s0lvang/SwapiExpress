import db from '../models';

const { People } = db;


export default {
  create(req, res) {
    return People
      .create({
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
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return People
      .all()
      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  },
};
