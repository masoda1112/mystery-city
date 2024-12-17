import React from 'react'
// import { Button } from '@mui/material'
function Card({url}) {
  return (
    <>
      <div className="mystery">
          <img className="mystery-content" src={url} />
      </div>
    </>
  );
}

export default Card;