// AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loginPopup, setLoginPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [correctPopup, setCorrectPopup] = useState(false);
  const [collections, setCollections] = useState(null);
  const [answer, setAnswer] = useState(null);

  return (
    <AppContext.Provider value={{ 
      user,
      setUser, 
      loginPopup, 
      setLoginPopup, 
      signUpPopup, 
      setSignUpPopup, 
      correctPopup, 
      setCorrectPopup, 
      collections,
      setCollections,
      answer,
      setAnswer
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };