import React from 'react';

function MysteriesCollection({status}) {
  return (
    <>
      <div className="mysteries-wrap">
          <p className="mysteries-status">{status}</p>
          <div className="mystery"></div>
      </div>
    </>
  );
}

export default MysteriesCollection;