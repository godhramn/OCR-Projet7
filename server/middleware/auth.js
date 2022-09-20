const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.authToken, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
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

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.authToken, async (err) => {
      if (err) {
        console.log(err);
      } else {
        next();
      }
    });
  } else {
    res.status(500).json("Aucun token trouvé");
  }
};