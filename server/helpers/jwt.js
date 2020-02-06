const jwt = require('jsonwebtoken');

module.exports = {
  signToken: function (obj) {
    return jwt.sign(obj, process.env.JWT_SECRET);
  },
  verifyToken: function (token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
};
