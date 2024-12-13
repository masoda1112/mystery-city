import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import SignUpPop from '../components/signuppop';
import LoginPop from '../components/loginpop';
import { AppContext } from '../AppContext'

function ButtonContent() {
    const {setSignUpPopup} = useContext(AppContext)
    const {setLoginPopup} = useContext(AppContext)

    const handleToggleSignUpPop = () => {
        setSignUpPopup(true)
    }

    const handleToggleLoginPop = () => {
        setLoginPopup(true)   
    }
    return (
        <>
            <div className='button-content'>
                <div className='button-wrap'>
                    <Button variant="contained" style={{width: '100%', height: '100%'}} onClick={handleToggleSignUpPop}>登録</Button>
                </div>
                <div className='button-wrap'>
                    <Button variant="outlined" style={{width: '100%', height: '100%'}} onClick={handleToggleLoginPop}>ログイン</Button>
                </div>
            </div>
        </>
    );
}

export default ButtonContent;