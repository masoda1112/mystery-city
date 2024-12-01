// AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loginPopup, setLoginPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [mysteryPopup, setMysteryPopup] = useState(false);
  const [mysteries, setMysteries] = useState(null);
  const [mystery, setMystery] = useState(null);

  return (
    <AppContext.Provider value={{ 
      user,
      setUser, 
      loginPopup, 
      setLoginPopup, 
      signUpPopup, 
      setSignUpPopup, 
      mysteryPopup, 
      setMysteryPopup, 
      mysteries,
      setMysteries,
      mystery,
      setMystery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };