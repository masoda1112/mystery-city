import React, { useContext } from 'react';
import Mystery from '../components/mystery';
import { AppContext } from '../AppContext'

function MysteriesCollection({}) {
    const { mysteryPopup, setMysteryPopup } = useContext(AppContext)
    // const { mysteryDescription, setMysteryDescription } = useContext(AppContext)
    
    const handleMysteryPopUp = (data) => {
      console.log("handleM")
      setMysteryPopup(true)
      // setMysteryDescription(data)
    }


    const mysteries = [
      {url: '../assets/sample_loc_1.jpeg'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
      {url: '../assets/card_1.png'},
    ]

    return (
      <>
        <div className="mysteries-wrap">
            <div className="mysteries">
              {
                mysteries.map((c, index) => (
                    <div className='mystery-wrap' key={index} onClick={() => handleMysteryPopUp(c)}><Mystery url={c.url}/></div>
                ))
              }
            </div>
        </div>
      </>
    );
}

export default MysteriesCollection;