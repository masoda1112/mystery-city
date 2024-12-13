import React, { useContext, useEffect , useState} from 'react';
import { PacmanLoader } from "react-spinners"
import Card from './card';
import { AppContext } from '../AppContext'
import { getCollectionDocuments, fetchImageURL, getDocumentById , getDataList} from '../functions/function'


function Collection(props) {
    const { collections, setCollections } = useContext(AppContext)
    const { mysteryStatus, setMysteryStatus} = useContext(AppContext)
    const { loading, setLoading } = useContext(AppContext)


    const fetchData = async () => {
      try {
        // cardsを取得
        setLoading(true)
        const collectionsWithDetails = await getDataList(props.listName)
        // userMysteryStatusを取得
        const userData = JSON.parse(localStorage.getItem('user'))
        const statusArray = await getDocumentById('userMysteryStatus',userData.userName)
        // Step 4: Contextにデータを保存
        setCollections(collectionsWithDetails);
        setMysteryStatus(statusArray['mysteriesStatus'])
      } catch (error) {
        console.error("データの取得に失敗しました:", error)
      }finally {
        // リクエストが終了したらローディングを非表示にする
        setLoading(false)
      }
    };

    useEffect(() => {
      fetchData();
    }, [setCollections]);

    return (
      <>
        <div className="mysteries-wrap">
            <div className="mysteries">
            {collections?.length > 0 ? (
              collections.map((c, index) => 
                {
                  if(mysteryStatus[index].status == 1){
                    return(
                      <div
                        className="mystery-wrap"
                        key={index}
                      >
                        <Card url={c.img} />
                      </div>
                    )
                  }
                }
              )
            ) : (
              <p></p>
            )}
            </div>
            {loading && (
              <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <PacmanLoader color="#000000" loading={loading} size={25} />
              </div>
            )}
        </div>
      </>
    );
}

export default Collection;