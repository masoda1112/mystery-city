import React from 'react';

function Card({name, status}) {
  return (
    <>
      <div className="card-wrap">
          <div className="card">
            <div className="card-info">
              <p className="cards-name">{name}</p>
            </div>
            {/* <div className="cards-explonation">{status}</div> */}
          </div>
      </div>
    </>
  );
}

export default Card;