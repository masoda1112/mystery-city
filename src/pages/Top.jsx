import React from 'react';
import { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import SignUpForm from '../components/signuppop';
import LoginPop from '../components/loginpop';
import { AppContext } from '../AppContext';
import PasswordReset from '../components/passwordResetPop';

function Top() {
    const {loginPopup, setLoginPopup} = useContext(AppContext)
    const {signUpPopup, setSignUpPopup} = useContext(AppContext)
    const {passwordResetPop, setPasswordResetPop} = useContext(AppContext)

    const signupClose = () => {
        setSignUpPopup(false)
    }
    const loginClose = () => {
        setLoginPopup(false)
    }
    const passwordClose = () => {
        setPasswordResetPop(false)
    }

    useEffect(() => {
        // ポップアップが開いている間スクロールを無効にする
        if (loginPopup || signUpPopup) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    
        // クリーンアップでoverflowを戻す
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [loginPopup, signUpPopup]);

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
                                        私たちは世界中の街を旅しながら、謎解きを作っています。謎に導かれながら街を歩くことでその街の成り立ちやユニークなポイントなど、様々な発見ができるはずです。ぜひチャレンジしてみてください。
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
                <div className={`pop ${signUpPopup ? 'shown' : ''}`}>              
                    <div className="pop-content signup-pop-content">
                        <div className="close-button-wrap" onClick={signupClose}>
                            <p className='close-button'>×</p>
                        </div>      
                        <SignUpForm />
                    </div>
                </div>
                <div className={`pop ${loginPopup ? 'shown' : ''}`}>              
                    <div className="pop-content login-pop-content">
                        <div className="close-button-wrap" onClick={loginClose}>
                            <p className='close-button'>×</p>
                        </div>      
                        <LoginPop />
                    </div>
                </div>
                <div className={`pop ${passwordResetPop ? 'shown' : ''}`}>              
                    <div className="pop-content login-pop-content">
                        <div className="close-button-wrap" onClick={passwordClose}>
                            <p className='close-button'>×</p>
                        </div>      
                        <PasswordReset />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Top;