import React from 'react'
import { useContext, useEffect } from 'react'
import ButtonContent from '../components/button'
import SignUpForm from '../components/signuppop'
import LoginPop from '../components/loginpop'
import { AppContext } from '../AppContext'
import PasswordReset from '../components/passwordResetPop'
import TopPart from '../components/topPart'
import TopPop from '../components/topPop'

function Top() {
    const {loginPopup, setLoginPopup} = useContext(AppContext)
    const {signUpPopup, setSignUpPopup} = useContext(AppContext)
    const {passwordResetPop, setPasswordResetPop} = useContext(AppContext)

    // 説明文の中身（画像も後で加える）
    const descriptionAboutService = [
        {title: '謎を買う', descrition: '場所、時間を飛び越えて多種多様な謎を用意しています'},
        {title: '謎を解く', descrition: '街や歴史についてのコラムを手がかりに知恵を絞り、謎を解く'}
    ]

    // ポップアップが開いている時のスクロールを制御する
    const handleScroll =()=> {
        if (loginPopup || signUpPopup || passwordResetPop) {
            document.body.style.overflow = 'hidden'
          } else {
            document.body.style.overflow = 'auto'
          }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }

    useEffect(() => {
        handleScroll()
      }, [loginPopup, signUpPopup, passwordResetPop])

    return (
        <>
            <div className="top-page">
                <main className="top-content">
                    <section className='image'>
                        <div className='container'>
                            <div className='top bg-image'>
                                <div className='top-explanation'>
                                    <h1>答えあわせをしよう</h1>
                                    <p>
                                        答えがわかったみたいだね！<br></br>
                                        回答の前に<b>メンバー登録をしてね</b><br></br>
                                        かんたんだし、つぎのステップがもっとワクワクするよ👆
                                    </p>
                                </div>
                            </div>
                            <ButtonContent />
                        </div>
                    </section>
                    {/* <section className='about'>
                        <div className='container'>
                            <div className='top about_top'>
                                {
                                    descriptionAboutService.map((e, index)=>{
                                        return <TopPart number={index} title={e.title} description={e.descrition}/>
                                    })
                                }
                            </div>
                            <ButtonContent />
                        </div>
                    </section> */}
                </main>
                <TopPop component={SignUpForm} state={signUpPopup} setState={setSignUpPopup}/>
                <TopPop component={LoginPop} state={loginPopup} setState={setLoginPopup}/>
                <TopPop component={PasswordReset} state={passwordResetPop} setState={setPasswordResetPop}/>
            </div>
        </>
    )
}

export default Top