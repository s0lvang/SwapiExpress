import db from '../models/index';

const { Starship, Transport } = db;


export default {
  create(req, res) {
    Starship.create({
      ...req.body,
    })
      .then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Starship
      .findAll({ include: Transport })
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
};
