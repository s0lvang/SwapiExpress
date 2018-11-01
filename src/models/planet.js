const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const planetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  rotationPeriod: {
    type: String,
  },

  orbital_period: {
    type: String,
  },
  diameter: {
    type: String,
  },

  climate: {
    type: String,
  },

  gravity: {
    type: String,
  },
  terrain: {
    type: String,
  },

  surface_water: {
    type: String,
  },
  population:
  {
    type: String,
  },
});

module.exports = mongoose.model('Planet', planetSchema);
