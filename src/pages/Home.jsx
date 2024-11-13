import React from 'react';
import Footer from '../components/footer';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

function Home() {
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
                <main className="home-content content">
                    <div className="content-top">
                        <div className="name-wrap">
                            <p className="name">John1234</p>
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
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Home;