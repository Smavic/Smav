const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = {
  authentication: function (req, res, next) {
    const { token } = req.headers;
    // try verifying token
    try {
      const { email } = verifyToken(token);
      User.findOne({
        where: {
          email
        }
      })
        .then((result) => {
          if (!result) {
            next(createError(400, "Email or Password wrong"))
          }
          req.headers.user = result.dataValues;
          next();
        });
    } catch (err) {
      next(err);
    }
  }
};
