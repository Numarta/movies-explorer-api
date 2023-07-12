const signInRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { loginUser } = require('../controllers/users');

signInRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  loginUser,
);

module.exports = { signInRouter };
