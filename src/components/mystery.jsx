import React from 'react'
import exampleImage from '../assets/mystery.png';

function Mystery({url}) {
  return (
    <>
      <div className="mystery">
          <div className="mystery-content">
            <img className="mystery-samnail-img" src={exampleImage} alt="mystery"/>
          </div>
          {/* <div className="mystery-content" style={{ 
                backgroundImage: `url("${url}")` 
            }}>
          </div> */}
      </div>
    </>
  );
}

export default Mystery;