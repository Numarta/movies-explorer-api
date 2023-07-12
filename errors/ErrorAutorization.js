const { UNAUTHORIZED_ERROR } = require('../utils/responseCodes');

class ErrorAutorization extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR;
  }
}

module.exports = { ErrorAutorization };
