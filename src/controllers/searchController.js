import db from '../models';

const { Search } = db;

export default {
  list(req, res) {
    return Search.findAll()
      .then(search => res.status(200).send(search))
      .catch(error => res.status(400).send(error));
  },
  saveSearch(query, model) {
    return Search.create({
      search_string: query,
      model,
    });
  },
  countAll(req, res) {
    return Search.count()
      .then(count => res.status(200).send({ count }))
      .catch(error => res.status(400).send(error));
  },
};
