import React, { useState } from "react";
import LoginForm from "./LogInForm";
import SignupForm from "./SignUpForm";
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
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
        className="log-box"
        display= "flex"
        flexDirection= "column"
        alignItems="center"
        border="solid 1px black"
        borderRadius="25px"
        bgcolor="#4E5166"
        boxShadow="5px 5px 5px black"
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
        alignItems="center"
        justifyContent="space-evenly"
        sx={{
          width: "100%",
          marginBottom:"30px"
        }}
        borderRadius="25px"
        
        >
          <Box
            bgcolor="#FFD7D7"
            borderRadius="10px"
            sx={{
              height:"100%",
              
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
                  aria-label="se connecter"
                  sx={{
                    height:"60px"
                  }}
              > Se Connecter    
              </ToggleButton>
              <ToggleButton 
                  onClick={handleModals}
                  id="signup"
                  value="signup"
                  className={SignupModal ? "active-btn" : null}
                  aria-label="s'inscrire"
                  sx={{
                    height:"60px"
                  }}
              > S'inscrire
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box 
            className="from-container"
            sx={{
              width:"50%",
            }}
          >
            {LoginModal && <LoginForm />}
            {SignupModal && <SignupForm />}
          </Box>
        </Box>
      </Box>
    </>    
  );
}

export default Log;