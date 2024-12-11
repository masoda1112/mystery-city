import React, {useContext, useEffect} from 'react'

function Header(props) {
  return (
    <>
      <div className="title-wrap">
          <p className="title">{props.title}</p>
      </div>
    </>
  );
}

export default Header;