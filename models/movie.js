const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" является обязательным для заполнения'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" является обязательным для заполнения'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" является обязательным для заполнения'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" является обязательным для заполнения'],
    },
    description: {
      type: String,
      required: [
        true,
        'Поле "description" является обязательным для заполнения',
      ],
    },
    image: {
      type: String,
      required: [true, 'Поле "image" является обязательным для заполнения'],
      validate: {
        validator: (link) => isURL(link),
        message: 'Ссылка на `image` невалидна',
      },
    },
    trailerLink: {
      type: String,
      required: [
        true,
        'Поле "trailerLink" является обязательным для заполнения',
      ],
      validate: {
        validator: (link) => isURL(link),
        message: 'Ссылка на `trailerLink` невалидна',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" является обязательным для заполнения'],
      validate: {
        validator: (link) => isURL(link),
        message: 'Ссылка на `thumbnail` невалидна',
      },
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" является обязательным для заполнения'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" является обязательным для заполнения'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле `owner` является обязательным для заполнения'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" является обязательным для заполнения'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
