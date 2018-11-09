import db from '../models/index';

const { Starship } = db;


export default {
  create(req, res) {
    return Starship.create({
      ...req.body,
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
};
