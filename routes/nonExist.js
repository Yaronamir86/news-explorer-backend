const router = require('express').Router();
const NotFound = require('../errors/NotFound-err');

// eslint-disable-next-line no-unused-vars
router.use('*', (req, res, next) => {
  next(new NotFound('required resource not found'));
});

module.exports = router;
