import React, {useContext, useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import { AppContext } from '../AppContext';

function Header() {

  const {headerTitle} = useContext(AppContext)
  return (
    <>
    {
      headerTitle ? (
        <div className="title-wrap">
          <p className="title">{headerTitle}</p>
        </div>
      ) : (
        <div className="title-wrap">
          <p className="title"></p>
        </div>
      )
    }
    </>
  );
}

export default Header;