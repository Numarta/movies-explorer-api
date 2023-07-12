const signUpRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/users');

signUpRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().min(2).max(30),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

module.exports = { signUpRouter };
