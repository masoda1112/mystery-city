import React from 'react'
import exampleImage from '../assets/mystery.png';

function Mystery({url}) {
  return (
    <>
      <div className="mystery">
          <img className="mystery-content" src={url} />
      </div>
    </>
  );
}

export default Mystery;