const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  login,
  getCurrentUser,
  signupUser,
} = require('../controllers/users');

const {
  validateRegister, validateLogin
} = require('../middlewares/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, signupUser);
router.get('/users/me', auth, getCurrentUser);

module.exports = router;
