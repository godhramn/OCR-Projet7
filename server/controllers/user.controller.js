const bcrypt = require("bcrypt");
const access_token = require("jsonwebtoken");
const passwordValidator = require("password-validator");
const emailValidator = require("email-validator");

const UserModel = require('../models/user.model')

exports.signUp = (req, res, next) => {
  /* Critères de validation de mot de passe */
  const schema = new passwordValidator();

  schema
  .is()
  .min(8) /* minimum de 8 caractères */
  .is()
  .max(64) /* maximum de 64 caractères */

  /* validation de l'email puis du mot de passe */
  if (emailValidator.validate(req.body.email)) {
    if (schema.validate(req.body.password)) {
      bcrypt.hash(req.body.password, 10) 
      .then((hash) => {
        /* Création d'un nouvel utilisateur */
        const user = new UserModel({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        })
        /* enregistrer l'utilisateur dans la base de donnée */
        user.save()
        .then(() => res.status(201).json({ message: "user account created" }))
        .catch((err) => res.status(400).json(err))
      })
      .catch(() => res.status(500).json({ error : "unable to check password validity" }));
    } else {
      res.status(400).json({error : "invalid password : " + schema.validate(req.body.password, { list: true })});
    }
  } else {
    res.status(400).json({error : "invalid email"})
  } 
};

const createToken = (id) => {
  return access_token.sign({ id }, process.env.authToken, {
    expiresIn: 12 * 60 * 60 * 1000,
  });
};

/* Gestion de session */

exports.logIn = (req, res, next) => {
  UserModel.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "unable to find user" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "wrong password" });
          }
          const token = createToken(user._id);
          res.cookie("access_token", token, 
            { 
              maxAge: 12 * 60 * 60 * 1000, 
              httpOnly: true 
            }
          );
          res.status(200).json({ user: user._id });
        })
        .catch(() => res.status(501).json({ error : "unable to check paswword" }));
    })
    .catch(() => res.status(500).json({ error : "unable to check user "}));
};

exports.logOut = (req, res, next) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.status(200).json({ message: "logged out" });
};

/* Gestion des utilisateurs */

exports.getAllUsers = (req, res, next) => {
  UserModel.find().then((user) => res.status(200).json(user))
  .catch(() => {
    res.status(400).json({ error: "unable to retrieve users" });
  }); 
};

exports.getOneUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id})
  .then((user) => {
    res.status(200).json(user);
  })
  .catch(() => {
    res.status(400).json({ error: "unable to retrieve user" });
  });
};

exports.updateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (req.file) {
        const filename = user.imageURL.split("images/users")[1];
        if (fs.existsSync(`images/users/${filename}`)) {
          fs.unlink(`images/users/${filename}`, () => {
            User.updateOne(
              { _id: req.params.id },
              {
                imageURL: `${req.protocol}://${req.get("host")}/images/users/${
                  req.file.filename
                }`,
                _id: req.params.id,
              }
            )
              .then(() => {
                res.status(200).json("Utilisateur modifié !");
              })
              .catch((error) => {
                res.status(400).json(error);
              });
          });
        } else {
          User.updateOne(
            { _id: req.params.id },
            {
              imageURL: `${req.protocol}://${req.get("host")}/images/users/${
                req.file.filename
              }`,
              _id: req.params.id,
            }
          )
            .then(() => {
              res.status(200).json("Utilisateur modifié !");
            })
            .catch((error) => {
              res.status(400).json(error);
            });
        }
      } else {
        User.updateOne(
          { _id: req.params.id },
          { ...req.body, _id: req.params.id }
        )
          .then(() => {
            res.status(200).json("Utilisateur modifié !");
          })
          .catch((error) => {
            res.status(400).json(error);
          });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deleteUser = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
  .then((user) => {
    if (user._id != req.auth.userId) {
      res.status(401).json({ message: "unauthorized to delete user" });
    } else { 
      const filename = user.imageURL.split("./images/users/")[1];
      fs.unlink(`images/users/${filename}`, () => {
        UserModel.deleteOne({ _id: req.params.id })
        .then(() =>
          res.status(200).json({ message: "user deleted" })
        )
        .catch(() => res.status(400).json({ error: "unable to delete user" }));
      });
    }
  })
  .catch(() => res.status(500).json({ error: "unable to access user to delete" }));
};