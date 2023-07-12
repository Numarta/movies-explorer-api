const JWT = require('jsonwebtoken');
const { ErrorAutorization } = require('../errors/ErrorAutorization');

const { SECRET_KEY } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(
      new ErrorAutorization(
        'Для данных действий необходима авторизация на сайте',
      ),
    );
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = JWT.verify(token, SECRET_KEY);
  } catch (err) {
    return next(
      new ErrorAutorization(
        'Для данных действий необходима авторизация на сайте',
      ),
    );
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
