const { OK_CODE, CREATE_CODE } = require('../utils/responseCodes');
const { ErrorForbidden } = require('../errors/ErrorForbidden');

const movieSchema = require('../models/movie');

// Получить все сохранённые текущим пользователем фильмы
const getMovies = async (req, res, next) => {
  try {
    const ownerId = req.user._id;

    const allUserMovies = await movieSchema.find({ owner: ownerId }).orFail();

    return res.status(OK_CODE).send(allUserMovies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const ownerId = req.user._id;

    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    } = req.body;

    const createdMovie = await movieSchema.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      owner: ownerId,
      movieId,
    });
    return res.status(CREATE_CODE).send(createdMovie);
  } catch (err) {
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const findedMovie = await movieSchema.findById(req.params.movieId).orFail();
    const deletedMovie = await movieSchema.deleteOne({
      _id: findedMovie._id,
      owner: req.user._id,
    });
    if (deletedMovie.deletedCount === 0) {
      throw new ErrorForbidden(
        `Ошибка доступа! Фильм с данным id ${req.params.movieId} не принадлежит пользователю с _id ${req.user._id}`,
      );
    } else {
      return res
        .status(OK_CODE)
        .send({ message: 'Фильм удален успешно и без ошибок' });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
