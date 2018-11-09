import 'babel-polyfill';
import db from './models/index';

const fetch = require('node-fetch');
const axios = require('axios');

const githubUrl = 'https://raw.githubusercontent.com/phalt/swapi/master/resources/fixtures/';
const apiUrl = 'http://localhost:8000/api/';

const fixtures = [
  'Transport',
  /*  'films',
  'people',
  'vehicles',
  'species',
   */'starship',
  // 'planets',

];

const post = async (value, url) => {
  const model = db[url.trim('s')];
  console.log(Object.keys(db));
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
  const url = `${githubUrl + fixture.toLowerCase()}.json`;
  const values = await fetch(url).then(res => res.json());
  Object.values(values).forEach(value => (
    parseValue(value, fixture)
  ));
};

const fillDatabase = () => fixtures.forEach(async (fixture) => {
  await iterateValues(fixture);
});

export default fillDatabase;
