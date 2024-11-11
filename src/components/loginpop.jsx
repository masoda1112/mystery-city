import React, { useContext } from 'react'
import { TextField, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { AppContext } from '../AppContext'

function LoginPop() {
    const {loginPopup, setLoginPopup} = useContext(AppContext)
    const handleCloseButtonClick = () => {
        setLoginPopup(false) 
    }
    return (
        <>
        <div className={`pop ${loginPopup ? 'shown' : ''}`}>
            <div className="pop-content login-pop-content">
                <p className='close-button' onClick={handleCloseButtonClick}>×</p>
                <div className="title-wrap">
                    <h2 className="title">Login</h2>
                </div>
                <div className="field-wrap">
                    <TextField
                        id="outlined-password-input"
                        label="Mail"
                        variant="outlined"
                    />
                </div>
                <div className="field-wrap">
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                </div>
                <Button variant="outlined" style={{width: '80%', height: '70px', margin: 'auto', marginTop: '30px'}}>Login</Button>
            </div>
        </div>
        </>
    );
}

export default LoginPop;