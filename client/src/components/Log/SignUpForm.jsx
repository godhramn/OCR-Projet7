import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, TextField } from "@mui/material";
import LogInForm from './LogInForm';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const usernameError = document.querySelector('.pseudo.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const confirmError = document.querySelector('.confirm.error');
    passwordError.innerHTML = "";
    if (password !== controlPassword) {
      confirmError.innerHTML = "Les mots de passes ne sont pas identiques"
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/signup`,
        data: {
          username,
          email,
          password
        }
      })
      .then((res) => {
        if (res.data.errors) {
          usernameError.innerHTML = res.data.errors.pseudo;
          emailError.innerHTML  = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password
        } else {
          setFormSubmit(true);
        }
      })
      .catch((error) => console.log(error))
    }
  }
  return (
    <>
      {formSubmit ? (
        <>
          <LogInForm />
          <h4>Inscription réussie, veuillez vous connecter</h4>
        </>
      ): (
        <form onSubmit={handleSignUp} id='sign-up-form'>
          <TextField onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username" type="text" label="Nom d'utilisateur"
          variant="filled"
          required
          />
          <div className="username error"></div>
          <TextField onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email" type="email" label="Adresse email"
          variant="filled"
          required
          />
          <div className="email error"></div>
          <TextField onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password" type="password" label="Mot de Passe"
          variant="filled"
          required
          />
          <div className="password error"></div>
          <TextField onChange={(e) => setControlPassword(e.target.value)}
          value={controlPassword}
          name="password" type="password" label="Confirmer le mot de Passe"
          variant="filled"
          required
          />
          <div className="confirm error"></div>
          <Button
            disabled={
              email.trimStart().length === 0 ||
              password.trimStart().length === 0 ||
              username.trimStart().length === 0 ||
              controlPassword.trimStart().length === 0
            }
            type="submit"
            sx={{
              width: "100%",
              margin: "1.5rem 0",
              padding: "12px 0",
              borderRadius: "28px",
            }}
            variant="outlined"
            color="primary"
          >
            S'inscrire
          </Button>
        </form>
    )}
    </>
  );
};

export default SignUpForm;