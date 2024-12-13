import React, {useContext, useEffect, useState} from 'react';
import Footer from '../components/footer';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { getDocumentsByCondition, getLocalstorageUser } from '../functions/function';
import { AuthContext } from '../AuthContext'
import { AppContext } from '../AppContext'
import { async } from '@firebase/util';
import Header from '../components/header';

function Home() {
    // userRankの判断
    const [user, setUser] = useState('')

    // totalScoreから階級を取得
    const calUserClass = (score) => {
        let userClass
        if( score < 1) {
            userClass = '見習い'
        }else if(score < 3){
            userClass = '初心者'
        }else if(score < 5){
            userClass = '探求者'
        }else if(score < 7){
            userClass = '熟練者'
        }else if(score < 10){
            userClass = '達人'
        }else if(10 < score){
            userClass = 'VIP'
        }else{
            userClass = '準備中'
        }
        return userClass
    }
    // firestoreのuserdataを取得し、stateにセット
    const handleSetUser = async() =>{
        const userData = getLocalstorageUser()
        const userInfo = await getDocumentsByCondition('users', 'userName', "==", userData.userName)
        setUser(userInfo[0])
    }

    // ログアウトの処理
    const handleLogout = async () => {
        try {
          await signOut(auth);  // Firebaseのauthからサインアウト
        } catch (error) {
          console.error('ログアウトエラー:', error);
        }
    };

    useEffect(()=>{
        handleSetUser()
    },[setUser])


    return (
        <>
            {user ? (
                <div className="page">
                    <main className="home-content content jp">
                        <div className="content-top">
                            <div className="name-wrap">
                                <p className="name">{user.userName}</p>
                            </div>
                            <div className="status-wrap">
                                <div className="clear-count">
                                    <div className="clear-count-wrap status-part-wrap">
                                        <p className="title">clear</p>
                                        <p className="count">{user.totalScore}</p>
                                    </div>
                                </div>
                                <div className="ranking-number">
                                    <div className="ranking-number-wrap status-part-wrap">
                                        <p className="title">class</p>
                                        <p className="user-class-name">{calUserClass(user.totalScore)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-bottom">
                            <p className="red link" onClick={handleLogout}>ログアウト</p>
                        </div>
                    </main>
                </div>
            ):
            <div></div>
        }
            
        </>
    );
}

export default Home;