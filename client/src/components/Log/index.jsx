import React, { useState } from "react";
import LoginForm from "./LogInForm";
import SignupForm from "./SignUpForm";
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material'

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
    <Box>
      <ToggleButtonGroup
        orientation='vertical'
        exclusive
      >
        <ToggleButton 
            onClick={handleModals}
            id="login"
            className={LoginModal ? "active-btn" : null}
        > Se Connecter    
        </ToggleButton>
        <ToggleButton 
            onClick={handleModals}
            id="signup"
            className={SignupModal ? "active-btn" : null}
        > S'inscrire
        </ToggleButton>
      </ToggleButtonGroup>
      {LoginModal && <LoginForm />}
      {SignupModal && <SignupForm />}
    </Box>
        
  );
}

export default Log;