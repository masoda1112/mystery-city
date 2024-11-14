import React, {useContext, useEffect} from 'react';
import Footer from '../components/footer';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { getDocumentsByCondition } from '../functions/function';
import { AuthContext } from '../AuthContext'
import { AppContext } from '../AppContext'
import { async } from '@firebase/util';

function Home() {
    const {currentUser} = useContext(AuthContext)
    const {user, setUser} = useContext(AppContext)

    // Firestore からユーザーデータを取得
    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const userData = await getDocumentsByCondition('users', 'mail', '==', currentUser.email);
                // データが見つかった場合
                if (userData.length > 0) {
                    setUser(userData[0]);  // 最初の結果をuserステートにセット
                } else {
                // setError('User not found');
                }
            } catch (err) {
            }
        };
        
        fetchUsers(); // データを取得
    }, []);

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
                {/* <main className="home-content content">
                    <div className="content-top">
                        <div className="name-wrap">
                            <p className="name">john1234</p>
                        </div>
                        <div className="nationality-wrap">
                            <p className="nationality">nationality: Japan</p>
                        </div>
                        <div className="status-wrap">
                            <div className="clear-count">
                                <div className="clear-count-wrap status-part-wrap">
                                    <p className="title">Clear</p>
                                    <p className="number">12</p>
                                </div>
                            </div>
                            <div className="ranking-number">
                                <div className="ranking-number-wrap status-part-wrap">
                                    <p className="title">Ranking</p>
                                    <p className="number">1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-bottom">
                        <p className="red link" onClick={handleLogout}>Log out</p>
                    </div>
                </main> */}
                <main className="home-content content jp">
                    <div className="content-top">
                        <div className="name-wrap">
                            <p className="name">{user.userName}</p>
                        </div>
                        <div className="status-wrap">
                            <div className="clear-count">
                                <div className="clear-count-wrap status-part-wrap">
                                    <p className="title">クリア</p>
                                    <p className="number">12</p>
                                </div>
                            </div>
                            <div className="ranking-number">
                                <div className="ranking-number-wrap status-part-wrap">
                                    <p className="title">ランキング</p>
                                    <p className="number">1</p>
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