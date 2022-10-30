const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  login,
  getCurrentUser,
  signupUser,
} = require('../controllers/users');

const {
  validateUser,
} = require('../middlewares/validation');

router.post('/signin', login);
router.post('/signup', validateUser, signupUser);
router.get('/users/me', auth, getCurrentUser);

module.exports = router;
