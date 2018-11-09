import db from '../models/index';

const { Transport } = db;


export default {
  create(req, res) {
    return Transport
      .create({
        ...req.body,
        id: req.body.id,
      })
      .then(transport => res.status(201).send(transport))
      .catch(error => res.status(400).send(error.message));
  },
  list(req, res) {
    return Transport
      .all()
      .then(transport => res.status(200).send(transport))
      .catch(error => res.status(400).send(error));
  },
};
