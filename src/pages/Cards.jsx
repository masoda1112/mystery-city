import React from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import Card from '../components/card';

function Cards() {
    return (
      <>
          <div className="page">
              <main className="content">
                  <div className="title-wrap cards-title-wrap">
                      <p className="title">Cards</p>
                  </div>
                  <div className="cards-container">
                      {
                          <Card />
                      }
                  </div>
              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Cards;