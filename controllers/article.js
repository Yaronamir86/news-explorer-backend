const Article = require('../models/article');
const {
  CREATE,
  INVALID_DATA_MESSAGE,
  FORBIDDEN_MESSAGE,
  ARTICLE_NOT_FOUND_MESSAGE,
} = require('../utils/constants');

const NotFound = require('../errors/NotFound-err');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

// GET REQUEST
// ROUTE = ('/article')
const getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

// POST REQUEST
// ROUTE = ('/article')
const saveArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(CREATE).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(INVALID_DATA_MESSAGE);
      }
    })
    .catch(next);
};

// DELETE REQUEST
// ROUTE = ('/cards/:_id')
const deleteArticleById = (req, res, next) => {
  Article.findById(req.PARAMS.articleID)
    .orFail()
    .then((article) => {
      if (article.owner !== req.user._id) {
        throw new Forbidden(FORBIDDEN_MESSAGE);
      }
      return Article.findByIdAndRemove(req.PARAMS.articleID).then(() => res.send(article));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFound(ARTICLE_NOT_FOUND_MESSAGE);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  saveArticle,
  deleteArticleById,
};
