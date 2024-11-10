import React from 'react';

function Rank({number, name, count}) {
  return (
    <>
        <div className="rank">
            <div className="number-wrap">
                <p className="number">{number}</p>
            </div>
            <div className="name-wrap">
                <p className="name">{name}</p>
            </div>
            <div className="clear-wrap">
                <p classNmae="count">{count}</p>
            </div>
        </div>
    </>
  );
}

export default Rank;