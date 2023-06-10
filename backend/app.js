require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const errorsHandler = require('./errors/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const corsSettings = {
  origin: ['https://mesto.arina.nomoredomains.rocks',
    'http://localhost:3000',
    'http://mesto.arina.nomoredomains.rocks',
    'http://api.mesto.arina.nomoredomains.rocks',
    'https://api.mesto.arina.nomoredomains.rocks',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors(corsSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
