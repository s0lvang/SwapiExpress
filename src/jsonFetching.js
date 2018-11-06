const fetch = require('node-fetch');
const axios = require('axios');

const planetLink = 'https://raw.githubusercontent.com/phalt/swapi/master/resources/fixtures/planets.json';
const planetApi = 'http://localhost:8000/api/planets';

const postPlanet = (planet) => {
  axios.post(planetApi, {
    ...planet,
  })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error.response);
    });
};


const parsePlanet = (planet) => {
  const { fields } = planet;
  delete fields.edited;
  delete fields.created;
  const processedPlanet = {
    id: planet.pk,
    climate: fields.climate,
    surface_water: fields.surface_water,
    name: fields.name,
    diameter: fields.diameter,
    rotation_period: fields.rotation_period,
    terrain: fields.terrain,
    gravity: fields.gravity,
    orbital_period: fields.orbital_period,
    population: fields.population,
  };
  postPlanet(processedPlanet);
  return processedPlanet;
};

const planetPromise = new Promise((resolve, reject) => {
  resolve(fetch(planetLink)
    .then(res => res.json()));
});

Promise.all([planetPromise]).then((result) => {
  const planets = result[0];
  for (const num in planets) {
    planet = parsePlanet(planets[num]);
  }
});
