import React from 'react';
import Mystery from '../components/mystery';

function MysteriesCollection({}) {
  const mysteries = [
    {url: '../assets/sample_loc_1.jpeg'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
    {url: '../assets/card_1.png'},
  ]
  
  return (
    <>
      <div className="mysteries-wrap">
          <div className="mysteries">
            {
              mysteries.map((c, index) => (
                  <div className='mystery-wrap' key={index}><Mystery url={c.url}/></div>
              ))
            }
          </div>
      </div>
    </>
  );
}

export default MysteriesCollection;