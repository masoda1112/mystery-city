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
  const [mysteryStatus, setMysteryStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [passwordResetPop, setPasswordResetPop] = useState(false)
  const [headerTitle, setHeaderTitle] = useState('')

  return (
    <AppContext.Provider value={{ 
      user,
      setUser, 
      loginPopup, 
      setLoginPopup, 
      signUpPopup, 
      setSignUpPopup, 
      passwordResetPop,
      setPasswordResetPop,
      correctPopup, 
      setCorrectPopup, 
      collections,
      setCollections,
      answer,
      setAnswer,
      mysteryStatus,
      setMysteryStatus,
      loading,
      setLoading,
      headerTitle,
      setHeaderTitle
    }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };