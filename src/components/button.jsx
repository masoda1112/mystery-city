import React from 'react';
import Button from '@mui/material/Button';

function ButtonContent() {
  return (
    <>
        <div className='button-content'>
            <div className='button-wrap'>
                <Button variant="contained" style={{width: '100%', height: '100%'}}>Sign UP</Button>
            </div>
            <div className='button-wrap'>
                <Button variant="outlined" style={{width: '100%', height: '100%'}}>Login</Button>
            </div>
        </div>
    </>
  );
}

export default ButtonContent;