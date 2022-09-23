import React, { useState } from "react";
import LoginForm from "./LogInForm";
import SignupForm from "./SignUpForm";
import { ToggleButtonGroup, ToggleButton, Box, Container } from '@mui/material'
import Logo from '../../assets/logos/icon-left-font-monochrome-white.svg'

const Log = ( props ) => {
  const [LoginModal, setLoginModal] = useState(props.login);
  const [SignupModal, setSignupModal] = useState(props.signup);

  const handleModals = (e) => {
    if (e.target.id === "login") {
      setLoginModal(true);
      setSignupModal(false);
    } else if (e.target.id === "signup") {
      setLoginModal(false);
      setSignupModal(true);
    }
  };

  return (
    <>
      <Box
        display= "flex"
        flexDirection= "column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "70%"
        }}
        border="solid 1px black"
        borderRadius="25px"
        bgcolor="#4E5166"
      >
        <Box
          sx={{
            width: "70%",
            padding: "20px"
          }}
        >
          <img src={Logo} alt="Logo de l'entreprise Groupomania" width="100%"/>
        </Box>
        
        <Box
        display= "flex"
        sx={{
          width: "70%",
          marginBottom:"30px"
        }}
        borderRadius="25px"
        
        >
          <Box
            bgcolor="#FFD7D7"
            sx={{
              height:"100%"
            }}
          >
            <ToggleButtonGroup
              
              orientation="vertical"
              exclusive
            >
              <ToggleButton 
                  onClick={handleModals}
                  id="login"
                  value="login"
                  className={LoginModal ? "active-btn" : null}
                  aria-label="bouton se connecter"
              > Se Connecter    
              </ToggleButton>
              <ToggleButton 
                  onClick={handleModals}
                  id="signup"
                  value="signup"
                  className={SignupModal ? "active-btn" : null}
                  aria-label="bouton s'inscrire"
              > S'inscrire
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            {LoginModal && <LoginForm />}
            {SignupModal && <SignupForm />}
          </Box>
        </Box>
        
        
        
      </Box>
    </>    
  );
}

export default Log;