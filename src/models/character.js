import mongoose from 'mongoose';

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      description: 'The name of this person.',
    },
    height: {
      type: String,
      description: 'The height of this person in meters.',
    },
    mass: {
      type: String,
      description: 'The mass of this person in kilograms.',
    },
    hair_color: {
      type: String,
      description: 'The hair color of this person.',
    },
    skin_color: {
      type: String,
      description: 'The skin color of this person.',
    },
    eye_color: {
      type: String,
      description: 'The eye color of this person.',
    },
    birth_year: {
      type: String,
      description: 'The birth year of this person. BBY (Before the Battle of Yavin) or ABY (After the Battle of Yavin).',
    },
    gender: {
      type: String,
      description: 'The gender of this person (if known).',
    },
    homeworld: {
      type: { type: mongoose.Schema.ObjectId, ref: 'Film' },
      description: 'The url of the planet resource that this person was born on.',
    },
    films: {
      type: [
        { type: mongoose.Schema.ObjectId, ref: 'Film' },
      ],
      description: 'An array of urls of film resources that this person has been in.',
    },
    species: {
      type: [
        { type: mongoose.Schema.ObjectId, ref: 'Species' },
      ],
      description: 'The url of the species resource that this person is.',
    },
    vehicles: {
      type: [
        { type: mongoose.Schema.ObjectId, ref: 'Vehicle' },
      ],
      description: 'An array of vehicle resources that this person has piloted',
    },
    starships: {
      type: [
        { type: mongoose.Schema.ObjectId, ref: 'Starship' },
      ],
      description: 'An array of starship resources that this person has piloted',
    },
  },
);

export default mongoose.model('Character', characterSchema);
