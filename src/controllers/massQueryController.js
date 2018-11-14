/* eslint-disable no-await-in-loop, no-return-await, guard-for-in, no-restricted-syntax */
import { cloneDeep } from 'lodash';
import filmController from './filmController';
import personController from './personController';
import speciesController from './speciesController';
import planetController from './planetController';
import vehicleController from './vehicleController';
import starshipController from './starshipController';

const allControllers = {
  Films: {
    model: filmController,
    name: 'films',
  },
  Characters: {
    model: personController,
    name: 'characters',
  },
  Species: {
    model: speciesController,
    name: 'species',
  },
  Planets: {
    model: planetController,
    name: 'planets',
  },
  Vehicles: {
    model: vehicleController,
    name: 'vehicles',
  },
  Starships: {
    model: starshipController,
    name: 'starships',
  },
};

const controllerModels = Object.values(allControllers);

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

const getResponse = (res) => {
  const newRes = cloneDeep(res);
  newRes.send = (responseArray) => {
    const { rows } = responseArray;
    rows.map(value => value.dataValues);
  };
  return newRes;
};

const getIdentifier = (value) => {
  let identifier = value.name != null ? value.name : value.title;
  identifier = identifier != null ? identifier : value.Transport.name;
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

// Queries all the controllers and sends one result
export default {
  async list(req, res) {
    const newRes = getResponse(res);
    const promises = controllerModels.map(async (controller) => {
      const { model } = controller;
      return await model.list(req, newRes);
    });
    const models = [];
    await Promise.all(promises)
      .then(promiseArray => promiseArray.map(nested => nested.map(value => models.push(value))));
    res.status(200).send(models);
  },
  // Queries based on the types wanted, e.g. 'Species, Characters'.
  async search(req, res) {
    const { checkedBoxes, limit } = req.body;
    let models = [];
    const newRes = cloneDeep(res);
    for (const boxNum in checkedBoxes) {
      const boxName = checkedBoxes[boxNum];
      const currentModel = [];
      newRes.send = (responseArray) => {
        responseArray.rows.forEach((response) => {
          const result = response.dataValues;
          result.fixture = boxName;
          currentModel.push(result);
        });
      };
      for (const modelNum in controllerModels) {
        const { model, name } = controllerModels[modelNum];
        if (name === boxName) {
          await model.list(req, newRes);
        }
      }
      models = models.concat(currentModel);
    }
    const pages = Math.round(models.length / limit);
    const pureModel = {
      pages,
      rows: models,
    };
    const sortedModel = sortModel(req.body, pureModel);
    const paginatedModel = paginateModel(req.body, sortedModel);
    res.status(200).send(paginatedModel);
  },
};
