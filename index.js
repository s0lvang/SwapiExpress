import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/swapi')
  .then(() => console.log('database connected'))
  .catch(() => console.log('could not connect to database :('));


const port = 8080;

app.listen(port, () => console.log(`server running at ${port}`));
