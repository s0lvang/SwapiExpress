import 'babel-polyfill';
import db from './models/index';

const fetch = require('node-fetch');

const githubUrl = 'https://raw.githubusercontent.com/phalt/swapi/master/resources/fixtures/';

const fixtures = {
  Transport: 'transport.json',
  Film: 'films.json',
  Character: 'people.json',
  Vehicle: 'vehicles.json',
  Species: 'species.json',
  Starship: 'starships.json',
  Planet: 'planets.json',

};

const post = async (value, url) => {
  const model = db[url];
  model.create(value);
};

const parseValue = async (value, api) => {
  const { fields } = value;
  delete fields.edited;
  delete fields.created;
  const processedPlanet = {
    id: value.pk,
    ...fields,
  };
  await post(processedPlanet, api);
  return processedPlanet;
};

const iterateValues = async (fixture) => {
  const url = githubUrl + fixtures[fixture];
  const values = await fetch(url).then(res => res.json());
  Object.values(values).forEach(value => (
    parseValue(value, fixture)
  ));
};

const fillDatabase = () => Object.keys(fixtures).forEach(async (fixture) => {
  await iterateValues(fixture);
});

export default fillDatabase;
