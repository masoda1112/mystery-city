import React from 'react'
import Button from '@mui/material/Button'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import MysteriesCollection from '../components/mysteries'
import Header from '../components/header'


function Clear() {
    // const {cards, setCards} = useContext(AppContext)
    // let count = 0
    // let prevCount = 0
    // useEffect(() => {
    //     // 一度だけ実行したい関数
    //     const fetchData = () => getCollectionDocuments('card').then(data => {
    //         setCards(data)
    //         console.log("ユーザーデータ:", cards);
    //     }).catch(error => {
    //         console.error("エラー:", error);
    //     });
    //     prevCount = count
    //     count ++
    //     if (cards == prevCount) {
    //         fetchData();
    //     }
    // }, [cards]); 
    

    return (
      <>
          <div className="page">
                <Header title={"Clear"}/>
                <main className="content">
                    <MysteriesCollection/>
                </main>
                <Footer />
          </div>
      </>
    );
  }
  
  export default Clear;