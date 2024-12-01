import React, { useContext, useEffect , useState} from 'react';
import Mystery from '../components/mystery';
import { AppContext } from '../AppContext'
import { getCollectionDocuments, fetchImageURL, getDocumentById } from '../functions/function'


function MysteriesCollection({}) {
    const { mysteryPopup, setMysteryPopup } = useContext(AppContext)
    const { mysteries, setMysteries } = useContext(AppContext)
    const { mysteryDescription, setMysteryDescription } = useContext(AppContext) 
    
    // const [ mysteryImage, setMysteryImage ] = useState()

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Step 1: FirestoreからMysteryコレクションを取得
          const mysteryDocs = await getCollectionDocuments("mystery")
          // Step 2: FirestoreからuserMysteryStatusを取得
          const user = JSON.parse(localStorage.getItem('user'))
          const userStatusDocs = await getDocumentById("userMysteryStatus", user.userName)
  
          // Step 3: 画像URLをFirebase Storageから取得
          const mysteriesWithDetails = await Promise.all(
            mysteryDocs.map(async (mystery) => {
              const imgURL = await fetchImageURL(mystery.img); // 画像パスからURLを取得
              console.log('img', imgURL)
  
              return {
                name: mystery.name,
                description: mystery.description,
                price: mystery.price,
                // status: userStatus ? userStatus.status : "cleard", // 進行状況がない場合はデフォルト値
                img: imgURL,
              };
            })
          );

          console.log(mysteriesWithDetails)
  
          // Step 4: Contextにデータを保存
          setMysteries(mysteriesWithDetails);
        } catch (error) {
          console.error("データの取得に失敗しました:", error);
        }
      };
  
      fetchData();
    }, [setMysteries]);

    // userMysteryStatusを取得
    // mysteryDescriptionを取得
    // storageのimageを取得

    // useEffect(() => {
    //   const fetchDocuments = async () => {
    //       const data = await getCollectionDocuments('mystery')
    //       let imgArr = []
    //       data.map((c, index) => {
    //         imgArr.push(c.img)
    //       })
    //       setMystery(imgArr)
    //   }
    //   fetchDocuments();
    // }, []);


    //   // storageのimageを取得
    //   useEffect(() => {
    //     //mysteryのpath配列からimageを取得する
    //     const loadImage = async () => {
    //       let imgUrl = []
    //       let url = ""
    //       mystery.map(async(c, index) => {
    //         //pathからstorageのimageを取得する関数
    //           url = await fetchImageURL(c)
    //           imgUrl.push(url)
    //       })
    //       // myseryDes
    //       setMysteryImage(url);
    //     };
    //     loadImage();
    // }, [mystery]);
      
    const handleMysteryPopUp = (data) => {
      console.log("handleM")
      setMysteryPopup(true)
      // setMysteryDescription(data)
    }

    // const mysteries = [
    //   {url: '../assets/sample_loc_1.jpeg'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    //   {url: '../assets/card_1.png'},
    // ]

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

export default MysteriesCollection;