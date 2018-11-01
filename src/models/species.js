import mongoose from 'mongoose';

const speciesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      description: 'The name of this species.',
    },
    classification: {
      type: String,
      description: 'The classification of this species.',
    },
    designation: {
      type: String,
      description: 'The designation of this species.',
    },
    average_height: {
      type: String,
      description: 'The average height of this person in centimeters.',
    },
    average_lifespan: {
      type: String,
      description: 'The average lifespan of this species in years.',
    },
    hair_colors: {
      type: String,
      description: 'A comma-seperated string of common hair colors for this species, none if this species does not typically have hair.',
    },
    skin_colors: {
      type: String,
      description: 'A comma-seperated string of common skin colors for this species, none if this species does not typically have skin.',
    },
    eye_colors: {
      type: String,
      description: 'A comma-seperated string of common eye colors for this species, none if this species does not typically have eyes.',
    },
    homeworld: {
      type: String,
      description: 'The URL of a planet resource, a planet that this species originates from.',
    },
    language: {
      type: String,
      description: 'The language commonly spoken by this species.',
    },
    people: {
      type: [
        { type: mongoose.Schema.ObjectId, ref: 'Film' },
      ],
      description: 'An array of People URL Resources that are a part of this species.',
    },
    films: {
      type: [
        { type: mongoose.Schema.ObjectId, ref: 'Film' },
      ],
      description: ' An array of Film URL Resources that this species has appeared in.',
    },
  },

);

export default mongoose.model('Species', speciesSchema);
