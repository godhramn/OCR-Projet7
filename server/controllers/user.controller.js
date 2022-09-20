const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        });
        /* enregistrer l'utilisateur dans la base de donnée */
        user.save()
          .then(() => res.status(201).json({ message: "user account created" }))
          .catch(() => res.status(400).json({ error : "unable to save user data" }));
      })
      .catch(() => res.status(500).json({ error : "unable to check password validity" }));
    } else {
      res.status(400).json({error : "invalid password : " + schema.validate(req.body.password, { list: true })});
    }
  } else {
    res.status(400).json({error : "invalid email"})
  } 
};