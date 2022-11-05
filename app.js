require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./middlewares/limit');
const nonExistRoute = require('./routes/nonExist');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/centralizeError');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');

const {
  MONGO_DB = 'mongodb://localhost:27017/newsdb',
  PORT = 3000
} = require('./utils/config');

mongoose.connect(MONGO_DB);

const app = express();
const allowedOrigins = [
  'https://news.students.nomoredomainssbs.ru',
  'http://api.news.students.nomoredomainssbs.ru',
  'http://localhost:3000',
];
app.use(cors(allowedOrigins));
app.use(limiter);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(requestLogger);

app.use(userRouter);
app.use('/articles', articleRouter);
app.use('*', nonExistRoute);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
