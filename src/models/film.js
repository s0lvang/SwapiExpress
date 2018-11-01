import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
  starships: {
    type: [
      { type: mongoose.Schema.ObjectId, ref: 'Starship' },
    ],
  },
  vehicles: {
    type: [
      { type: mongoose.Schema.ObjectId, ref: 'Vehicle' },
    ],
  },
  planets: {
    type: [
      { type: mongoose.Schema.ObjectId, ref: 'Planet' },
    ],
  },
  producer: {
    type: String,
  },
  title: {
    type: String,
  },
  episode_id: {
    type: Number,
  },
  director: {
    type: String,
  },
  release_date: {
    type: Date,
  },
  opening_crawl: {
    type: String,
  },
  characters: {
    type: [
      { type: mongoose.Schema.ObjectId, ref: 'Character' },
    ],
  },
  species: {
    type: [
      { type: mongoose.Schema.ObjectId, ref: 'Species' },
    ],
  },
});

export default mongoose.model('Film', filmSchema);
