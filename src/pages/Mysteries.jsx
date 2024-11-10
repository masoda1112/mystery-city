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
                      <p className="title">Mysteries</p>
                  </div>
                  <MysteriesCollection status="Ongoing"/>
                  <MysteriesCollection status="Unplay"/>
                  <MysteriesCollection status="Cleard"/>

              </main>
              <Footer />
          </div>
      </>
    );
  }
  
  export default Mysteries;