import { cloneDeep } from 'lodash';
import filmController from './filmController';
import personController from './personController';
import speciesController from './speciesController';
import planetController from './planetController';
import vehicleController from './vehicleController';
import starshipController from './starshipController';
import 'babel-polyfill';

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

// Queries all the controllers and sends one result
export default {
  async list(req, res) {
    const models = [];
    const newRes = cloneDeep(res);
    const controllerModels = Object.values(allControllers);
    newRes.send = (responseArray) => {
      responseArray.forEach((element) => {
        const result = element.dataValues;
        models.push(result);
      });
    };
    for (const modelNum in controllerModels) { // eslint-disable-line
      const { model } = controllerModels[modelNum];
      // Edits the send request to be a new function instead
      await model.list(req, newRes); // eslint-disable-line
    }
    res.status(200).send(models);
  },
  // Queries based on the types wanted, e.g. 'Species, Characters'.
  async search(req, res) {
    const { checkedBoxes } = req.body;
    const checkedModels = [];
    const newRes = cloneDeep(res);
    const controllerModels = Object.values(allControllers);
    for (const boxNum in checkedBoxes) { //eslint-disable-line
      const boxName = checkedBoxes[boxNum];
      const models = { type: boxName, result: [] };
      newRes.send = (responseArray) => {
        responseArray.forEach((element) => {
          const result = element.dataValues;
          models.result.push(result);
        });
      };
      for (const modelNum in controllerModels) { // eslint-disable-line
        const { model, name } = controllerModels[modelNum];
        if (name === boxName) {
          await model.list(req, newRes); // eslint-disable-line
        }
      }
      checkedModels.push(models);
    }
    res.status(200).send(checkedModels);
  },
};
