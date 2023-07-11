const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { URL_REGEXP } = require('../utils/urlRegexp');

movieRouter.get('/', getMovies);

movieRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(URL_REGEXP),
      trailerLink: Joi.string().required().regex(URL_REGEXP),
      thumbnail: Joi.string().required().regex(URL_REGEXP),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

movieRouter.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = { movieRouter };
