const fetch = require('node-fetch');
const axios = require('axios');

const githubUrl = 'https://raw.githubusercontent.com/phalt/swapi/master/resources/fixtures/';
const apiUrl = 'http://localhost:8000/api/';

const fixtures = [
  "films",
  "people",
  "starships",
  "vehicles",
  "species",
  "starships",
  "planets",

]

const post = (value, url) => {
  axios.post(url, {
    ...value,
  })
    .then((res) => {
      //console.log(`statusCode: ${res.statusCode}`);
    })
    .catch((error) => {
      console.error(error.response);
    });
};

const parseValue = (value, api) => {
  const { fields } = value;
  delete fields.edited;
  delete fields.created;
  const processedPlanet = {
    id: value.pk,
    ...fields,
  };
  console.log('POSTING ....');
  post(processedPlanet, api);
  return processedPlanet;
};

const iterateValues = async (fixture) => {
  const url = githubUrl + fixture + ".json"
  const values = await fetch(url).then(res => res.json());
  for (num in values) {
    value = parseValue(values[num], apiUrl+fixture);
  };
};

fixtures.forEach((fixture) => {
   iterateValues(fixture);
})
