import React, {useContext, useEffect, useState} from 'react'
import { AppContext } from '../AppContext'
import {Button} from '@mui/material'
import {fetchImageURL} from '../functions/function'

function CorrectPop({}) {
    // popupのコントロール
    const {correctPopup, setCorrectPopup} = useContext(AppContext)
    // クリックされたデータ
    const {answer, setAnswer} = useContext(AppContext)
    const [img, setImg] = useState('')

    useEffect(() => {
        // answerのimgからstorageの画像取得
        const getImg = async() =>{
            const url = await fetchImageURL(answer[0].img)
            console.log(url)
            setImg(url)
        }
        try{
            if(answer){getImg()}
        }catch(error){
            console.log(error)
        }
      }, [correctPopup]);
    const correctPopClose = () => {
        setCorrectPopup(false)
        setImg('')
    }
    return (
        img ?  (
            <div className={`pop mystery-pop ${correctPopup ? 'shown' : ''}`} >
                <div className="mystery-pop-content" style={{ 
                    backgroundImage: `url(${img})` 
                }}>
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