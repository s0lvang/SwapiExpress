import db from '../models/index';

const { Planet } = db;


export default {
  create(req, res) {
    return Planet
      .create({
        id: req.body.id,
        climate: req.body.climate,
        surface_water: req.body.surface_water,
        name: req.body.name,
        diameter: req.body.diameter,
        rotation_period: req.body.rotation_period,
        terrain: req.body.terrain,
        gravity: req.body.gravity,
        orbital_period: req.body.orbital_period,
        population: req.body.population,
      })
      .then(planet => res.status(201).send(planet))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Planet
      .all()
      .then(planet => res.status(200).send(planet))
      .catch(error => res.status(400).send(error));
  },
};
