import React, {useContext} from 'react'
import { AppContext } from '../AppContext'
import exampleImage from '../assets/mystery.png';
import {Button} from '@mui/material'

function MysteryPop({}) {
    // popupのコントロール
    const {mysteryPopup, setMysteryPopup} = useContext(AppContext)
    // クリックされたデータ
    const {mystery, setMystery} = useContext(AppContext)
    console.log(mystery)

    const mysteryPopClose = () => {
        setMysteryPopup(false)
    }
    return (
        mystery ?  (
            <div className={`pop mystery-pop ${mysteryPopup ? 'shown' : ''}`} style={{ 
                backgroundImage: `url(${mystery.img})` 
              }}>
                <div className="mystery-pop-content">
                    <div className='close-button-wrap' onClick={mysteryPopClose}>
                        <p className="close-button">×</p>
                    </div>
                    <div className="mystery-top-content">
                        <div className="mystery-pop-title-wrap">
                            <p className="mystery-title">{mystery.name}</p>
                        </div>
                        <div className="mystery-description-wrap">
                            <p className="mystery-description">{mystery.description}</p>
                        </div>
                        <div className="mystery-price-wrap">
                            <p className="mystery-price">販売価格:¥{mystery.price}</p>
                        </div>
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} style={{ height: "60px" }}>
                        購入する
                    </Button>
                </div>
            </div>
        ):(
            <div></div>
        )
    );
}

export default MysteryPop;