import React, {useContext, useEffect} from 'react';
import Footer from '../components/footer';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { getDocumentsByCondition } from '../functions/function';
import { AuthContext } from '../AuthContext'
import { AppContext } from '../AppContext'
import { async } from '@firebase/util';

function Home() {
    // userRankの判断
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

    // const {currentUser} = useContext(AuthContext)
    let userData = JSON.parse(localStorage.getItem('user'))
    const score = userData.totalScore
    const userClass = calUserClass(score)

    const handleLogout = async () => {
        try {
          await signOut(auth);  // Firebaseのauthからサインアウト
        } catch (error) {
          console.error('ログアウトエラー:', error);
        }
      };
    return (
        <>
            <div className="page">
                <main className="home-content content jp">
                    <div className="content-top">
                        <div className="name-wrap">
                            <p className="name">{userData.userName}</p>
                        </div>
                        <div className="status-wrap">
                            <div className="clear-count">
                                <div className="clear-count-wrap status-part-wrap">
                                    <p className="title">clear</p>
                                    <p className="number">{userData.totalScore}</p>
                                </div>
                            </div>
                            <div className="ranking-number">
                                <div className="ranking-number-wrap status-part-wrap">
                                    <p className="title">class</p>
                                    <p className="user-class-name">{userClass}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-bottom">
                        <p className="red link" onClick={handleLogout}>ログアウト</p>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Home;