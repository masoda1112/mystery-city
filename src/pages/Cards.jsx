import React from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import Card from '../components/card';
import { getCollectionDocuments } from '../functions/function'

function Cards() {
    let cards = []
    getCollectionDocuments('card').then(data => {
        cards = data
        console.log("ユーザーデータ:", data);
    }).catch(error => {
        console.error("エラー:", error);
    });
    return (
      <>
          <div className="page">
              <main className="content cards-content">
                  <div className="title-wrap cards-title-wrap">
                      <p className="title">Cards</p>
                  </div>
                  <div className="cards-container">
                      {
                          cards.map((o, index) => (
                            <div className='card-wrap-wrap' key={index}>
                                <Card 
                                    index={index}
                                    name={o.name}
                                    status={o.status}
                                />
                            </div>
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