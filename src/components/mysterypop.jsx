import React, {useContext} from 'react'
import { AppContext } from '../AppContext'
import exampleImage from '../assets/mystery.png';

function MysteryPop({url}) {
    // popupのコントロール
    const {mysteryPopup, setMysteryPopup} = useContext(AppContext)
    // クリックされたデータ
    const {mysteryDescription, setMysteryDescription} = useContext(AppContext)

    return (
        <div className={`pop ${mysteryPopup ? 'shown' : ''}`}>
            <div className="mystery-pop-content">
                <div className="mystery-pop-title-wrap">
                    <p className="mystery-title"></p>
                </div>
                <div className="mystery-description-wrap">
                    <p className="mystery-description"></p>
                </div>
                <div className="mystery-info-wrap">
                    <p className="mystery-price"></p>
                    <p className="mystery-time"></p>
                    <p className="mystery-what-bring"></p>
                </div>
            </div>
        </div>
    );
}

export default MysteryPop;