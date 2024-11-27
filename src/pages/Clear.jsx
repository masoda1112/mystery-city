import React from 'react'
import Button from '@mui/material/Button'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import MysteriesCollection from '../components/mysteries'
import Header from '../components/header'


function Clear() {
    return (
      <>
          <div className="page">
                <Header title={"Clear"}/>
                <main className="content">
                    <MysteriesCollection/>
                </main>
                <Footer />
          </div>
      </>
    );
  }
  
  export default Clear;