import React from 'react';

function Rank({number, name, score}) {

  return (
    <>
        <div className="rank">
            <div className="number-wrap">
                <p className="number">{number}</p>
            </div>
            <div className="name-wrap">
                <p className="name">{name}</p>
            </div>
            <div className="totalscore-wrap">
                <p className="totalscore">{score}</p>
            </div>
        </div>
    </>
  );
}

export default Rank;