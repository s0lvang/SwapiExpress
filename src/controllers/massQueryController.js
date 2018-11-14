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

const newResponse = (res) => {
  const newRes = cloneDeep(res);
  newRes.send = responseArray => responseArray.map(value => value.dataValues);
  return newRes;
};

// Queries all the controllers and sends one result
export default {
  async list(req, res) {
    const newRes = newResponse(res);
    const controllerModels = Object.values(allControllers);
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
    const { checkedBoxes } = req.body;
    const controllerModels = Object.values(allControllers);
    const checkedModels = [];
    const newRes = cloneDeep(res);
    for (const boxNum in checkedBoxes) {
      const boxName = checkedBoxes[boxNum];
      const currentModel = { type: boxName, result: [] };
      newRes.send = (responseArray) => {
        responseArray.forEach((response) => {
          const result = response.dataValues;
          currentModel.result.push(result);
        });
      };
      for (const modelNum in controllerModels) {
        const { model, name } = controllerModels[modelNum];
        if (name === boxName) {
          await model.list(req, newRes);
        }
      }
      checkedModels.push(currentModel);
    }
    res.status(200).send(checkedModels);
  },
};
