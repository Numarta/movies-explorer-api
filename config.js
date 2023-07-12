/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const validateErrorsByCelebrate = require('celebrate').errors;
const cors = require('cors');

const { NODE_ENV = 'development', SECRET_KEY = 'secretdevkey' } = process.env;

module.exports = {
  express,
  mongoose,
  helmet,
  validateErrorsByCelebrate,
  cors,
  NODE_ENV,
  SECRET_KEY,
};
