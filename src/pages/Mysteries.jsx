import React from 'react'
import Button from '@mui/material/Button'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import Collection from '../components/collections'
import Header from '../components/header'
import MysteryPop from '../components/mysterypop'

function Mysteries() {
    // const title = 'Header'
    return (
      <>
          <div className="page">
                <Header title={"Mystery"}/>
                <main className="content">
                  <Collection listName={"mystery"}/>
                </main>
                <MysteryPop />
                <Footer />
          </div>
      </>
    );
  }
  
  export default Mysteries;