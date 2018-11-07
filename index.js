import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes';


// Set up the express app
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app); // Set up routes


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// Setup a default catch-all route that sends back a welcome message in JSON format.


const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => console.log(`server running at ${port}`));
