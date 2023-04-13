// backend/utils/auth.js

const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;
// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = { // creates an object named safeUser
      id: user.id, // propertty 1
      email: user.email,// propertty 2
      username: user.username,// propertty 3
    };
    const token = jwt.sign(
      { data: safeUser },// payload
      secret, //secret
      { expiresIn: parseInt(expiresIn) } // expires in
      // 604,800 seconds = 1 week
    );
    const isProduction = process.env.NODE_ENV === "production";
    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });
    return token;
  };

  /////////////////// restore user portion
  const restoreUser = (req, res, next) => { // this restoreUse is checking to see if the user is logged in or not
    // token parsed from cookies
    const { token } = req.cookies; // get token from cookies
    req.user = null; // set the request to null
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }
      try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
          attributes: {
            include: ['email', 'createdAt', 'updatedAt']
          }
        });
      } catch (e) {
        res.clearCookie('token');
        return next();
      }
      if (!req.user) res.clearCookie('token');
      return next();
    });
  };

  const requireAuth = function (req, _res, next) {
  if (req.user) return next();
  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
}

module.exports = { setTokenCookie, restoreUser, requireAuth };
