import React, { useContext } from 'react';
import { TextField, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { AppContext } from '../AppContext';

function SignUpPop() {
    const {signUpPopup, setSignUpPopup} = useContext(AppContext)
    const handleToggleButtonClick = () => {
        setSignUpPopup(true)
    }
    const handleCloseButtonClick = () => {
        setSignUpPopup(false)   
    }
    return (
        <>
        <div className={`pop ${signUpPopup ? 'shown' : ''}`}>
            <div className="pop-content signup-pop-content">
                <p className='close-button' onClick={handleCloseButtonClick}>×</p>
                <div className="title-wrap">
                    <h2 className="title">Let the journey begin! </h2>
                </div>
                <div className="field-wrap">
                    <TextField
                        id="outlined-password-input"
                        label="UserName"
                        variant="outlined"
                    />
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
                <div className="field-wrap">
                    <TextField
                        id="outlined-password-input"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                    />
                </div>
                <Button variant="contained" style={{width: '80%', height: '60px', margin:'auto', marginTop: '30px'}}>Sign UP</Button>
            </div>
        </div>
        </>
    );
}

export default SignUpPop;