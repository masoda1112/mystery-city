import React from 'react';
import { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import SignUpForm from '../components/signuppop';
import LoginPop from '../components/loginpop';
import { AppContext } from '../AppContext';
import PasswordReset from '../components/passwordResetPop';
import TopPart from '../components/topPart';
import TopPop from '../components/topPop';

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

    // ポップアップが開いている時のスクロールを制御する
    const handleScroll =()=> {
        if (loginPopup || signUpPopup || passwordResetPop) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'auto';
          }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }

    useEffect(() => {
        handleScroll()
      }, [loginPopup, signUpPopup, passwordResetPop]);

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
                                <TopPart name='go' />
                                <TopPart name='solve' />
                            </div>
                            <ButtonContent />
                        </div>
                    </section>
                </main>
                <TopPop component={SignUpForm} state={signUpPopup} setState={setSignUpPopup}/>
                <TopPop component={LoginPop} state={loginPopup} setState={setLoginPopup}/>
                <TopPop component={PasswordReset} state={passwordResetPop} setState={setPasswordResetPop}/>
            </div>
        </>
    );
}

export default Top;