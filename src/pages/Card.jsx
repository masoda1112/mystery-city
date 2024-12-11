import React from 'react'
import Button from '@mui/material/Button'
import Footer from '../components/footer'
import ButtonContent from '../components/button'
import Collection from '../components/collections'
import Header from '../components/header'

function Card() {
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