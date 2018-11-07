const fetch = require('node-fetch');
const axios = require('axios');

const githubUrl = 'https://raw.githubusercontent.com/phalt/swapi/master/resources/fixtures/';
const apiUrl = 'http://localhost:8000/api/';
const filmLink = `${githubUrl}films.json`;
const peopleLink = `${githubUrl}people.json`;
const planetLink = `${githubUrl}planets.json`;
const speciesLink = `${githubUrl}species.json`;
const starshipLink = `${githubUrl}starships.json`;
const transportLink = `${githubUrl}transport.json`;
const vehicleLink = `${githubUrl}vehicles.json`;
const filmApi = `${apiUrl}films`;
const peopleApi = `${apiUrl}people`;
const planetApi = `${apiUrl}planets`;
const speciesApi = `${apiUrl}species`;
const starshipApi = `${apiUrl}starships`;
const vechicleApi = `${apiUrl}vehicles`;


const post = (value, url) => {
  console.log(value);
  axios.post(url, {
    ...value,
  })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);
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

const iterateValues = (values, api) => {
  for (num in values) {
    value = parseValue(values[num], api);
  };
};

const filmPromise = new Promise((resolve) => {
  resolve(fetch(filmLink)
    .then(res => res.json()));
});

const peoplePromise = new Promise((resolve) => {
  resolve(fetch(peopleLink)
    .then(res => res.json()));
});

const planetPromise = new Promise((resolve) => {
  resolve(fetch(planetLink)
    .then(res => res.json()));
});

const speciesPromise = new Promise((resolve) => {
  resolve(fetch(speciesLink)
    .then(res => res.json()));
});

const starshipPromise = new Promise((resolve) => {
  resolve(fetch(starshipLink)
    .then(res => res.json()));
});

const transportPromise = new Promise((resolve) => {
  resolve(fetch(transportLink)
    .then(res => res.json()));
});

const vehiclePromise = new Promise((resolve) => {
  resolve(fetch(vehicleLink)
    .then(res => res.json()));
});

Promise.all([
  peoplePromise,
  filmPromise,
  planetPromise,
  speciesPromise,
  starshipPromise,
  transportPromise,
  vehiclePromise,
]).then((result) => {
  const people = result[0];
  const films = result[1];
  const planets = result[2];
  const species = result[3];
  const starships = result[4];
  const transports = result[5];
  const vehicles = result[6];
  iterateValues(people, peopleApi);
  iterateValues(films, filmApi);
  iterateValues(planets, planetApi);
  iterateValues(species, speciesApi);
  iterateValues(starships, starshipApi);
  iterateValues(vehicles, vechicleApi);
});
