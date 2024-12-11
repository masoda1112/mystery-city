import React, {useContext} from 'react'
import { AppContext } from '../AppContext'
import {Button} from '@mui/material'

function CorrectPop({}) {
    // popupのコントロール
    const {correctPopup, setCorrectPopup} = useContext(AppContext)
    // クリックされたデータ
    const {answer, setAnswer} = useContext(AppContext)


    const correctPopClose = () => {
        setCorrectPopup(false)
    }
    return (
        answer ?  (
            <div className={`pop mystery-pop ${correctPopup ? 'shown' : ''}`} style={{ 
                backgroundImage: `url(${answer.img})` 
              }}>
                <div className="mystery-pop-content">
                    <div className='close-button-wrap' onClick={correctPopClose}>
                        <p className="close-button">×</p>
                    </div>
                </div>
            </div>
        ):(
            <div></div>
        )
    );
}

export default CorrectPop;