import db from '../models/index';

const { Transport } = db;


export default {
  create(req, res) {
    return Transport
      .create({
        ...req.body,
        id: req.body.id,
      })
      .then(starship => res.status(201).send(starship))
      .catch(error => res.status(400).send(error.message));
  },
  list(req, res) {
    return Transport
      .all()
      .then(starship => res.status(200).send(starship))
      .catch(error => res.status(400).send(error));
  },
};
