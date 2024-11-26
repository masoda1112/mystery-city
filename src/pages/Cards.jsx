import React, {useContext, useEffect} from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import Card from '../components/card';
import { getCollectionDocuments } from '../functions/function'
import { AppContext } from '../AppContext'
import Header from '../components/header'


function Cards() {
    const {cards, setCards} = useContext(AppContext)
    let count = 0
    let prevCount = 0
    useEffect(() => {
        // 一度だけ実行したい関数
        const fetchData = () => getCollectionDocuments('card').then(data => {
            setCards(data)
            console.log("ユーザーデータ:", cards);
        }).catch(error => {
            console.error("エラー:", error);
        });
        prevCount = count
        count ++
        if (cards == prevCount) {
            fetchData();
        }
    }, [cards]); 
    

    return (
      <>
          <div className="page">
              <Header title={'Cards'}/>
              <main className="content cards-content">

                  <div className="cards-container">
                      {
                          cards ? cards.map((o, index) => (
                            <div className='card-wrap-wrap' key={index}>
                                <Card 
                                    name={o.name}
                                    description={o.description}
                                    img={o.img}
                                />
                            </div>
                          )) : <div>cardがありません</div>
                      }
                  </div>
              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Cards;