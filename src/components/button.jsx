import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import SignUpPop from '../components/signuppop';
import LoginPop from '../components/loginpop';
import { AppContext } from '../AppContext'

function ButtonContent() {
    const {signUpPopup, setSignUpPopup} = useContext(AppContext)
    const {loginPopup, setLoginPopup} = useContext(AppContext)



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
                    <Button variant="contained" style={{width: '100%', height: '100%'}} onClick={handleToggleSignUpPop}>Sign UP</Button>
                </div>
                <div className='button-wrap'>
                    <Button variant="outlined" style={{width: '100%', height: '100%'}} onClick={handleToggleLoginPop}>Login</Button>
                </div>
            </div>
        </>
    );
}

export default ButtonContent;