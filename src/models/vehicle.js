import mongoose from 'mongoose';

const vehicleSchema = {
    name: {
      type: String,
    },
    model: {
      type: String,
    },
    starship_class: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    cost_in_credits: {
      type: String,
    },
    length: {
      type: String,
    },
    crew: {
      type: String,
    },
    passengers: {
      type: String,
    },
    max_atmosphering_speed: {
      type: String,
    },
    cargo_capacity: {
      type: String,
    },
    consumables: {
      type: String,
    },
    films: {
      type: [
        { type: mongoose.Schema.ObjectId, ref: 'Film' },
      ],
    },
  },