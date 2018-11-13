import { cloneDeep } from 'lodash';
import filmController from './filmController';
import personController from './personController';
import speciesController from './speciesController';
import planetController from './planetController';
import vehicleController from './vehicleController';
import starshipController from './starshipController';
import 'babel-polyfill';

const allControllers = [
  filmController,
  personController,
  speciesController,
  planetController,
  vehicleController,
  starshipController,
];

// Queries all the controllers and sends one result
export default {
  async list(req, res) {
    const models = [];
    const newRes = cloneDeep(res);
    for (const modelNum in allControllers) { // eslint-disable-line
      const model = allControllers[modelNum];
      // Edits the send request to be a new function instead
      newRes.send = (responseArray) => {
        responseArray.forEach((element) => {
          const result = element.dataValues;
          models.push(result);
        });
      };
      await model.list(req, newRes); // eslint-disable-line
    }
    res.status(200).send(models);
  },
};
