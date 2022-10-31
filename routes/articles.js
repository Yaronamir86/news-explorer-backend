const router = require('express').Router();
const { validateArticle, validateId, } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const {
  getArticles,
  saveArticle,
  deleteArticleById,
} = require('../controllers/article');

router.get('/', auth, getArticles);
router.post('/', auth, validateArticle, saveArticle);
router.delete('/:_id', auth, validateId, deleteArticleById);

module.exports = router;
