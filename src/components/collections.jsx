import React, { useContext, useEffect , useState} from 'react';
import Mystery from './mystery';
import { AppContext } from '../AppContext'
import { getCollectionDocuments, fetchImageURL, getDocumentById , getDataList} from '../functions/function'


function Collection(props) {
    const { mysteryPopup, setMysteryPopup } = useContext(AppContext)
    const { mysteries, setMysteries } = useContext(AppContext)
    const { mysteryDescription, setMysteryDescription } = useContext(AppContext) 
    
    // const [ mysteryImage, setMysteryImage ] = useState()

    const fetchData = async () => {
      try {
        const mysteriesWithDetails = await getDataList(props.listName)
        // Step 4: Contextにデータを保存
        setMysteries(mysteriesWithDetails);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [setMysteries]);

      
    const handleMysteryPopUp = (data) => {
      if(props.listName == "mystery"){
        setMysteryPopup(true)
        // setMysteryDescription(data)
      }
    }


    return (
      <>
        <div className="mysteries-wrap">
            <div className="mysteries">
            {mysteries?.length > 0 ? (
              mysteries.map((c, index) => (
                <div
                  className="mystery-wrap"
                  key={index}
                  onClick={() => handleMysteryPopUp(c)}
                >
                  <Mystery url={c.img} />
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