import React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import SignUpPop from '../components/signuppop';
import LoginPop from '../components/loginpop';
import { AppContext } from '../AppContext'

function Top() {
    const {loginPopup, setLoginPopup} = useContext(AppContext)
    const {signUpPopup, setSignUpPopup} = useContext(AppContext)
    const handleToggleButtonClick = () => {
        setSignUpPopup(true)
    }
    const handleCloseButtonClick = () => {
        setSignUpPopup(false)   
    }
    return (
        <>
            <div className="top-page">
                <main className="top-content">
                    <section className='image'>
                        <div className='container'>
                            <div className='top bg-image'>
                                <div className='top-explanation'>
                                    <h1>Mystery & City</h1>
                                    <p>
                                        Explore our range of services.Explore our range of services.Explore our range of services.Explore our range of services.Explore our range of rangrange of services.Explore our range of services.Explore our range of e of rangrange of services.Explore our range of services.Explore our range of 
                                    </p>
                                </div>
                            </div>
                            <ButtonContent />
                        </div>
                    </section>
                    <section className='about'>
                        <div className='container'>
                            <div className='top about_top'>
                                <div className='part'>
                                    <h2>Go</h2>
                                    <p>Reach out for more information.</p>
                                    <div className='images'>
                                        <div className='image-wrap'>
                                            <div className='image first-image loc_1'></div>
                                        </div>
                                        <div className='image-wrap'>
                                            <div className='image second-image loc_2'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='part'>
                                    <h2>Solve</h2>
                                    <p>Reach out for more information.</p>
                                    <div className='images'>
                                        <div className='image-wrap'>
                                            <div className='image first-image rid_1'></div>
                                        </div>
                                        <div className='image-wrap'>
                                            <div className='image second-image rid_2'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ButtonContent />
                        </div>
                    </section>
                </main>
                <SignUpPop />
                <LoginPop />
            </div>
        </>
    );
}

export default Top;