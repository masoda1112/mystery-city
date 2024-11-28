import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import Card from '../components/footer';
import Rank from '../components/rank';
import Header from '../components/header'
import { getCollectionDocuments } from "../functions/function"

function Ranking() {
    // ranking取得し格納するstate
    const [allRanking, setAllRanking] = useState([])
    const [userNameScore, setUserNameScore] = useState([])

    // allRankingから平な配列を作る関数
    const buildFlattenedArray = () => {
        const flattenedArray = [];
        for (let docName = 9; docName >= 0; docName--) {
            const doc = allRanking[docName];
            
            // docNameが存在しない場合はスキップ
            if (doc) {
                // フィールド1が存在する場合、それを追加
                if (doc[1] && doc[1].length > 0) {
                    flattenedArray.push(...doc[1].filter(item => item !== "").userName);
                }

                // フィールド2が存在する場合、それを追加
                if (doc[2] && doc[2].length > 0) {
                    flattenedArray.push(...doc[2].filter(item => item !== "").userName);
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
            setAllRanking(data);
            // setUserNameScore(userData)
        };
    
        fetchDocuments();
    }, []);

    useEffect(() => {
        if (allRanking) {
            const flattenedArray = buildFlattenedArray()
            console.log(flattenedArray);
            console.log(userNameScore)
        }
    }, [allRanking]) // allRanking が更新されたときに再評価
    
    
    const ranks = [
        {name: 'john1234', count: 12},
        {name: 'ken3354', count: 9},
        {name: 'masa3456', count: 7},
        {name: 'mike6434', count: 4},
        {name: 'mary6784', count: 1},
        {name: 'john1234', count: 12},
        {name: 'ken3354', count: 9},
        {name: 'masa3456', count: 7},
        {name: 'mike6434', count: 4},
        {name: 'mary6784', count: 1},
        {name: 'john1234', count: 12},
        {name: 'ken3354', count: 9},
        {name: 'masa3456', count: 7},
        {name: 'mike6434', count: 4},
        {name: 'mary6784', count: 1},
    ]

    const ranking = getCollectionDocuments('ranking')

    console.log(ranking)


    return (
      <>
          <div className="page">
              <Header title='Ranking'/>
              <main className="content ranks-content">
                  <div className="ranks-container">
                      {
                        ranks.map((o, index)=>(
                            <div className='rank-wrap' key={index}>
                                <Rank number={index + 1} name={o.name} count={o.count}/>
                            </div>
                        )
                        )
                      }
                  </div>
              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Ranking;