/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { OK_CODE, CREATE_CODE } = require('../utils/responseCodes');

const { SECRET_KEY } = require('../config');

const User = require('../models/user');

async function findUserById(req, res, userId, next) {
  try {
    const findedUser = await User.findById(userId).orFail();
    return res.status(OK_CODE).send(findedUser);
  } catch (err) {
    return next(err);
  }
}

// GET /users/me
const getUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  findUserById(req, res, userId, next);
};

async function updateUser(id, updateUserInfo, res, next) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateUserInfo, {
      new: true,
      runValidators: true,
    }).orFail();

    return res.status(OK_CODE).send(updatedUser);
  } catch (err) {
    return next(err);
  }
}

// PATCH /users/me
const updateUserInfo = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, email } = req.body;

  updateUser(userId, { name, email }, res, next);
};

// POST /signup
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 15);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    const dataUser = createdUser.toObject();
    delete dataUser.password;
    return res.status(CREATE_CODE).send(dataUser);
  } catch (err) {
    return next(err);
  }
};

// POST /signin
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const findedUser = await User.staticFindUserByMailPassword(email, password);

    const token = JWT.sign({ _id: findedUser._id }, SECRET_KEY, {
      expiresIn: '7d',
    });

    return res.status(OK_CODE).send({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  loginUser,
};
