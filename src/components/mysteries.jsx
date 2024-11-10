import React from 'react';
import Mystery from '../components/mystery';

function MysteriesCollection({status}) {
  const mysteries = [
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
    {url: './assets/mystery.png'},
  ]
  return (
    <>
      <div className="mysteries-wrap">
          <p className="mysteries-status">{status}</p>
          <div className="mysteries">
            {
              mysteries.map((c, index) => (
                  <Mystery title={c.url}/>
              ))
            }
          </div>
      </div>
    </>
  );
}

export default MysteriesCollection;