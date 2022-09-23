const access_token = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    access_token.verify(token, process.env.authToken, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("access_token", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findOne({ _id: decodedToken.id });
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    access_token.verify(token, process.env.authToken, async (err) => {
      if (err) {
        console.log(err);
      } else {
        next();
      }
    });
  } else {
    res.status(500).json("unable to find token");
  }
};