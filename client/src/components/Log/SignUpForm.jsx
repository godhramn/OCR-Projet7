import React, { useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { Button, TextField } from "@mui/material";
import LogInForm from './LogInForm';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');
  const usersData = useSelector((state) => state.users.users);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const usernameError = document.querySelector('.username.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const confirmError = document.querySelector('.confirm.error');
    passwordError.innerHTML = "";
    emailError.innerHTML = "";
    usernameError.innerHTML = "";
    
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
        setFormSubmit(true);
      })
      .catch((error) => {
        console.log(error);
        const userEmail = usersData.map((user) => user.email);
        const userName = usersData.map((user) => user.username);
        if (userName.includes(username)) {
          usernameError.innerHTML = "Ce Nom d'utilisateur est déjà pris"
        } else if (userEmail.includes(email)) {
          emailError.innerHTML = "Adresse email déjà utilisée";
        } else {
          passwordError.innerHTML = "Le mot de passe doit contenir 8 caractères minimum"
        }
      })
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
          <TextField
            sx={{
              width:"80%"
            }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username" type="text" label="Nom d'utilisateur"
            variant="filled"
            required
          />
          <div className="username error"></div>
          <TextField 
            sx={{
              width:"80%"
            }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email" type="email" label="Adresse email"
            variant="filled"
            required
          />
          <div className="email error"></div>
          <TextField 
            sx={{
              width:"80%"
            }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password" type="password" label="Mot de Passe"
            variant="filled"
            required
          />
          <div className="password error"></div>
          <TextField 
            sx={{
              width:"80%"
            }}
            onChange={(e) => setControlPassword(e.target.value)}
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
              width: "80%",
              margin: "1.5rem 0",
              padding: "12px 0",
              borderRadius: "28px",
            }}
            variant="outlined"
            color="secondary"
          >
            S'inscrire
          </Button>
        </form>
    )}
    </>
  );
};

export default SignUpForm;