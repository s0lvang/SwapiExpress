import db from '../models';

const { Search } = db;

export default {
  list(req, res) {
    return Search.findAll({
      order: [
        ['id', 'DESC'],
      ],
      limit: 10,
    })
      .then((search) => {
        res.status(200).send(search);
      })
      .catch(error => res.status(400).send(error));
  },
  saveSearch(searchUrl, searchString, model) {
    return Search.create({
      search_url: searchUrl,
      search_string: searchString,
      model,
    });
  },
  countAll(req, res) {
    return Search.count()
      .then(count => res.status(200).send({ count }))
      .catch(error => res.status(400).send(error));
  },
};
