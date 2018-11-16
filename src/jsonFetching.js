import fetch from 'node-fetch';
import db from './models/index';

const githubUrl = 'https://raw.githubusercontent.com/phalt/swapi/master/resources/fixtures/';

const fixtures = [
  ['Transport', 'transport.json'],
  ['Film', 'films.json'],
  ['Planet', 'planets.json'],
  ['Species', 'species.json'],
  ['Character', 'people.json'],
  ['Starship', 'starships.json'],
  ['Vehicle', 'vehicles.json'],
];


const insert = async (value, url) => {
  const model = db[url];
  model.create(value);
};

const parseValue = async (value, model) => {
  const { fields } = value;
  delete fields.edited;
  delete fields.created;
  const processObject = {
    id: value.pk,
    transportId: value.pk,
    homeworld: fields.homeworld || null,
    model,
    ...fields,

  };
  await insert(processObject, model);
  return processObject;
};

const iterateValues = async (fixture) => {
  const url = githubUrl + fixture[1];
  const values = await fetch(url).then(res => res.json());
  return Object.values(values).forEach(value => (
    parseValue(value, fixture[0])
  ));
};

const fillDatabase = async () => {
  for (const fixture of fixtures) { // eslint-disable-line
    await iterateValues(fixture);   // eslint-disable-line
  }
  console.log('database finished loading');
};

export default fillDatabase;
