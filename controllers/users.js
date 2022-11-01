require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATE,
  INVALID_DATA_MESSAGE,
  userIdValidateProcess,
} = require('../utils/constants');

const { JWT_SECRET = 'super_secret_key' } = process.env;
const Unauthoraized = require('../errors/Unauthorized');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

// POST REQUEST
// ROUTE = ('/signin')
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ data: user, token });
    })
    .catch(() => {
      throw new Unauthoraized('Incorrect email or password');
    })
    .catch(next);
};

// POST REQUEST
// ROUTE = ('/signup')
const signupUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('The user with the provided email already exists');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((data) => res.status(CREATE).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(INVALID_DATA_MESSAGE);
      } else {
        next(err);
      }
    });
};

// GET REQUEST
// ROUTE = ('/users/me')
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  userIdValidateProcess(req, res, User.findById(_id), next);
};

module.exports = {
  login,
  getCurrentUser,
  signupUser,
};
