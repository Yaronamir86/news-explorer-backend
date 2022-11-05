const Article = require('../models/article');
const {
  CREATE,
  INVALID_DATA_MESSAGE,
  FORBIDDEN_MESSAGE,
} = require('../utils/constants');

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
// ROUTE = ('/article/:_id')
const deleteArticleById = (req, res, next) => {
  const articleId = req.params._id;
  const user = req.user._id;
  Article.findById(articleId)
    // eslint-disable-next-line no-console
    .orFail()
    .then((article) => {
      const { owner } = article;
      // eslint-disable-next-line eqeqeq
      if (owner != user) {
        return next(new Forbidden(FORBIDDEN_MESSAGE));
      }
      return Article.findByIdAndRemove(articleId).then(
        () => res.status(200).send(article)
      );
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticles,
  saveArticle,
  deleteArticleById,
};
