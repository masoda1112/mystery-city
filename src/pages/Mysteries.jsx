import React from 'react'
import Button from '@mui/material/Button'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import MysteriesCollection from '../components/mysteries'
import Header from '../components/header'
import MysteryPop from '../components/mysterypop'

function Mysteries() {
    // const title = 'Header'
    return (
      <>
          <div className="page">
                <Header title={"Mysteries"}/>
                <main className="content">
                  <MysteriesCollection/>
                </main>
                <MysteryPop />
                <Footer />
          </div>
      </>
    );
  }
  
  export default Mysteries;