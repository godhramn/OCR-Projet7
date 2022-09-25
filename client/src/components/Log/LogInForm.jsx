import React, { useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const usersData = useSelector((state) => state.users.users);

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
    .then((res) => { window.location = '/'})
    .catch((error) => {
      console.log(error);
      const userEmail = usersData.map((user) => user.email);
      if (!userEmail.includes(email)) {
        emailError.innerHTML = "Adresse email inconnue";
      } else {
        passwordError.innerHTML = "Mot de passe inconnu";
      }
    })
  }
  return (
    <>
      <form onSubmit={handleLogin} id="log-in-form">
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email" type="email" label="Adresse email"
          variant="filled"
          required
          fullWidth
          margin="dense"
        />
        <div className='email error'></div>
        <TextField 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password" type="password" label="Mot de Passe"
          variant="filled"
          required
          fullWidth
          margin="dense"
        />
        <div className='password error'></div>
        <Button
            disabled={
              email.trimStart().length === 0 ||
              password.trimStart().length === 0
            }
            sx={{
              width: "100%",
              padding: "12px 0",
              borderRadius: "28px",
              marginTop:"10px",
            }}
            variant="outlined"
            color="primary"
            type="submit"
          > 
          Se Connecter
          </Button>
      </form>
    </>
  );
};

export default LogInForm;