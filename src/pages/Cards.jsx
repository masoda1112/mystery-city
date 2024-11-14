import React from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import Card from '../components/card';

function Cards() {
    const cards = [
            {name:"sadaf", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
            {name:"sadaf", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
            {name:"fffghhh", status: true, image: ""},
        ]
    return (
      <>
          <div className="page">
              <main className="content cards-content">
                  <div className="title-wrap cards-title-wrap">
                      <p className="title">カード</p>
                  </div>
                  <div className="cards-container">
                      {
                          cards.map((o, index) => (
                            <Card 
                                index={index}
                                name={o.name}
                                status={o.status}
                            />
                          ))
                      }
                  </div>
              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Cards;