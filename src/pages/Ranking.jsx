import React, { useState, useEffect, useContext } from 'react'
import Footer from '../components/footer'
import Card from '../components/footer'
import Rank from '../components/rank'
import Header from '../components/header'
import { getCollectionDocuments } from "../functions/function"
import dummy from "../assets/ranking-header.png"
import { PacmanLoader } from "react-spinners"
import {AppContext} from '../AppContext'


function Ranking() {
    // ranking取得し格納するstate
    const [allRanking, setAllRanking] = useState([])
    const [userNameScore, setUserNameScore] = useState([])
    const [flattenedArray, setFlattenedArray] = useState([])
    const { loading, setLoading } = useContext(AppContext)

    // allRankingから平な配列を作る関数
    const buildFlattenedArray = () => {
        const flattenedArray = [];
        for (let docName = 9; docName >= 0; docName--) {
            const doc = allRanking[docName];
            
            // docNameが存在しない場合はスキップ
            if (doc) {
                // フィールド1が存在する場合、それを追加
                if (doc[1] && doc[1].length > 0) {
                    flattenedArray.push(...doc[1].filter(item => item !== ""))
                }

                // フィールド2が存在する場合、それを追加
                if (doc[2] && doc[2].length > 0) {
                    flattenedArray.push(...doc[2].filter(item => item !== ""))
                }
            }
        }
        return flattenedArray
    }

    // ページ読み込み時にrankingを全て取得
    useEffect(() => {
        const fetchDocuments = async () => {
            const data = await getCollectionDocuments('ranking')
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

    useEffect(() => {
        if (allRanking) {
            setFlattenedArray(buildFlattenedArray)
        }
    }, [allRanking]) // allRanking が更新されたときに再評価


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
                        flattenedArray.map((o, index)=>(
                            <div className='rank-wrap' key={index}>
                                <Rank number={index + 1} name={o}/>
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