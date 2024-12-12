import React, { useState, useEffect, useContext } from 'react'
import Footer from '../components/footer'
import Card from '../components/footer'
import Rank from '../components/rank'
import Header from '../components/header'
import { getCollectionDocuments, getCollectionDocumentsWithSort } from "../functions/function"
import dummy from "../assets/ranking-header.png"
import { PacmanLoader } from "react-spinners"
import {AppContext} from '../AppContext'


function Ranking() {
    // ranking取得し格納するstate
    const [allRanking, setAllRanking] = useState([])
    const [userNameScore, setUserNameScore] = useState([])
    const [sortArray, setSortArray] = useState([])
    const { loading, setLoading } = useContext(AppContext)

    // ページ読み込み時にrankingを全て取得
    useEffect(() => {
        const fetchDocuments = async () => {
            const data = await getCollectionDocumentsWithSort('ranking', 'totalScore')
            // const userData = await getDocumentsWithSelectedFields('users', ['userName', 'totalScore'])
            setAllRanking(data)
            // setUserNameScore(userData)
        }
        try{
            setLoading(true)
            fetchDocuments();
        }catch(e){

        }finally{
            setLoading(false)
        }
    }, []);


    return (
      <>
          <div className="page">
              <Header title='Ranking'/>
              <main className="content ranks-content">
                  <div className="ranks-header">
                      <img className="ranks-header-img" src={dummy}/>
                  </div>
                  <div className="ranks-container">
                      {
                        allRanking.map((o, index)=>(
                            <div className='rank-wrap' key={index}>
                                <Rank number={index + 1} name={o.userName} score={o.totalScore}/>
                            </div>
                        )
                        )
                      }
                  </div>
                  {loading && (
                    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                        <PacmanLoader color="#000000" loading={loading} size={25} />
                    </div>
                    )}
              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Ranking;