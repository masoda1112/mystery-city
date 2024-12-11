import React,{useContext, useEffect} from 'react'
import Button from '@mui/material/Button'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import Collection from '../components/collections'
import Header from '../components/header'
import { PacmanLoader } from "react-spinners"
import { AppContext } from "../AppContext"

function Card() {
  const { loading, setLoading } = useContext(AppContext)
  useEffect(() => {
    // 例えば、データのフェッチなどでローディングを表示
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3秒後にローディングを非表示
    return () => clearTimeout(timer);
  }, [setLoading]);
    return (
      <>
          <div className="page">
                <Header title={"Card"}/>
                <main className="content">
                    <Collection listName="card"/>
                </main>
                <Footer />
          </div>
      </>
    );
  }
  
  export default Card;