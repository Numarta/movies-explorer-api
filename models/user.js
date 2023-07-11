const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
// const isURL = require('validator/lib/isURL');

const bcrypt = require('bcryptjs');
const { ErrorAutorization } = require('../errors/ErrorAutorization');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (mail) => isEmail(mail),
        message: 'Вы ввели неправильный формат почты (не валидный)',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля `name` 2 символа'],
      maxlength: [30, 'Максимальная длина поля `name` 30 символов'],
      default: 'DafaultUser',
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.staticFindUserByMailPassword = async function findUser(
  email,
  password,
) {
  const findedUser = await this.findOne({ email }).select('+password');

  if (!findedUser) {
    throw new ErrorAutorization(
      'Вы ввели неправильную почту или пароль!', // почту
    );
  }

  const matchedPassword = await bcrypt.compare(password, findedUser.password);

  if (!matchedPassword) {
    throw new ErrorAutorization(
      'Вы ввели неправильную почту или пароль!', // пароль
    );
  }

  return findedUser;
};

module.exports = mongoose.model('user', userSchema);
