import React,{useContext, useEffect} from 'react'
import Button from '@mui/material/Button'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import Collection from '../components/collections'
import Header from '../components/header'
import { PacmanLoader } from "react-spinners"
import { AppContext } from "../AppContext"

function Card() {
  const {setLoading } = useContext(AppContext)

  useEffect(() => {
    // 例えば、データのフェッチなどでローディングを表示
    try{
      setLoading(true);
    }catch(error){
        console.log(error)
    }finally{
      setLoading(false)
    }
  }, [setLoading]);

    return (
      <>
          <div className="page">
            <main className="content">
                <Collection listName="card"/>
            </main>
          </div>
      </>
    );
  }
  
  export default Card;