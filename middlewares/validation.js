const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const {
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
  VALID_EMAIL_MESSAGE,
} = require('../utils/constants');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': MIN_STR_MESSAGE,
      'string.max': MAX_STR_MESSAGE,
    }),
    email: Joi.string().required().email().message(VALID_EMAIL_MESSAGE),
    password: Joi.string().required().min(8).messages({
      'string.empty': EMPTY_STR_MESSAGE,
      'string.min': 'Password must be at least 8 characters long',
    }),
  }),
});

const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Invalid id');
      }),
  }),
});

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'string.required': 'Keyword is required',
    }),
    title: Joi.string().required().messages({
      'string.required': 'Title is required',
    }),
    text: Joi.string().required().messages({
      'string.required': 'Source is required',
    }),
    date: Joi.string().required().messages({
      'string.required': 'Date is required',
    }),
    source: Joi.string().required().messages({
      'string.required': 'Source is required',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      'string.required': 'Link is required',
      'string.uri': 'Valid link required',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      'string.required': 'Image is required',
      'string.uri': 'Valid image required',
    }),
  }),
});

module.exports = {
  validateUser,
  validateArticle,
  validateId,
};
