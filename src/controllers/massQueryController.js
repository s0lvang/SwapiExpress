/* eslint-disable no-await-in-loop, no-return-await, guard-for-in, no-restricted-syntax */
import { cloneDeep } from 'lodash';
import filmController from './filmController';
import personController from './personController';
import speciesController from './speciesController';
import planetController from './planetController';
import vehicleController from './vehicleController';
import starshipController from './starshipController';
import searchController from './searchController';

const allControllers = {
  films: filmController,
  characters: personController,
  species: speciesController,
  planets: planetController,
  vehicles: vehicleController,
  starships: starshipController,
};


const paginateModel = (body, models) => {
  const { page, limit } = body;
  const end = page * limit;
  const start = page * limit - limit;
  const newResult = models.rows.slice(start, end);
  return {
    ...models,
    rows: newResult,
  };
};


const getIdentifier = (value) => {
  let identifier = value.name || value.title;
  identifier = identifier || value['transport.name']; // value.transport
  return identifier;
};

const orderedSort = (firstValue, secondValue, order) => {
  const larger = order === 'ASC' ? 1 : -1;
  const smaller = order === 'ASC' ? -1 : 1;
  if (firstValue > secondValue) return larger;
  if (firstValue < secondValue) return smaller;
  return 0;
};

const sortModel = (body, models) => {
  const { order } = body;
  const sortedList = models.rows.sort((first, second) => {
    const firstIdentifier = getIdentifier(first);
    const secondIdentifier = getIdentifier(second);
    return orderedSort(firstIdentifier, secondIdentifier, order);
  });
  const sortedModel = {
    ...models,
    rows: sortedList,
  };
  return sortedModel;
};

const processModel = (body, pureModel) => {
  const sortedModel = sortModel(body, pureModel);
  const paginatedModel = paginateModel(body, sortedModel);
  return paginatedModel;
};

// Queries all the controllers and sends one result
export default {
  // Queries based on the types wanted, e.g. 'Species, Characters'.
  async search(req, res) {
    const { checkedBoxes, limit } = req.body;
    let models = checkedBoxes.map(async controllerName => allControllers[controllerName].search(req));
    models = await Promise.all(models).then(awaitedModels => awaitedModels.map(model => model.rows));
    models = [].concat([], ...models);

    searchController.saveSearch(req.body.search, checkedBoxes.join(', '));
    const pages = Math.round(models.length / limit);
    const pureModel = {
      pages,
      rows: models,
    };
    const processedModel = processModel(req.body, pureModel);
    res.status(200).send(processedModel);
  },
};
