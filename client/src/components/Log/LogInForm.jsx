import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress } from '@mui/material';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/users/login`,
      withCredentials: true,
      data: {
        email,
        password,
      }
    })
    .then((res) => {
      if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email;
        passwordError.innerHTML = res.data.errors.password;
      } else {
        window.location = '/';
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <form onSubmit={handleLogin} id="log-in-form">
      <TextField onChange={(e) => setEmail(e.target.value)}
      value={email}
      name="email" type="email" label="Adresse email"
      variant="filled"
      required
      />
      <div className='email error'></div>
      <TextField onChange={(e) => setPassword(e.target.value)}
      value={password}
      name="password" type="password" label="Mot de Passe"
      variant="filled"
      required
      />
      <div className='password error'></div>
      <Button
          disabled={
            email.trimStart().length === 0 ||
            password.trimStart().length === 0
          }
          sx={{
            width: "100%",
            margin: "1.5rem 0",
            padding: "12px 0",
            borderRadius: "28px",
          }}
          variant="outlined"
          color="primary"
          type="submit"
        > 
        Se Connecter
        </Button>
    </form>
  );
};

export default LogInForm;