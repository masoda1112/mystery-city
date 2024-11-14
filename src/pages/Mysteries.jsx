import React from 'react';
import Button from '@mui/material/Button';
import Footer from '../components/footer';
import ButtonContent from '../components/button';
import MysteriesCollection from '../components/mysteries';

function Mysteries() {
    return (
      <>
          <div className="page">
              <main className="content">
                  <div className="title-wrap">
                      <p className="title">ミステリー</p>
                  </div>
                  <MysteriesCollection status="考え中"/>
                  <MysteriesCollection status="未解決"/>
                  <MysteriesCollection status="解決済み"/>

              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Mysteries;