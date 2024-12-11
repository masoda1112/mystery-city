import React, { useContext, useEffect , useState} from 'react';
import Card from './card';
import { AppContext } from '../AppContext'
import { getCollectionDocuments, fetchImageURL, getDocumentById , getDataList} from '../functions/function'


function Collection(props) {
    const { collections, setCollections } = useContext(AppContext)
    const { answer, setAnswer } = useContext(AppContext) 
    
    // const [ mysteryImage, setMysteryImage ] = useState()

    const fetchData = async () => {
      try {
        const collectionsWithDetails = await getDataList(props.listName)
        // Step 4: Contextにデータを保存
        setCollections(collectionsWithDetails);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [setAnswer]);

      
    const handleCorrectPopUp = (data) => {
      if(props.listName == "mystery"){
        setAnswer(data)
      }
    }


    return (
      <>
        <div className="mysteries-wrap">
            <div className="mysteries">
            {collections?.length > 0 ? (
              collections.map((c, index) => (
                <div
                  className="mystery-wrap"
                  key={index}
                  onClick={() => handleCorrectPopUp(c)}
                >
                  <Card url={c.img} />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
            </div>
        </div>
      </>
    );
}

export default Collection;