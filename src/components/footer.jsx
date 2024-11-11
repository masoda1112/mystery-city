import React from 'react';
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/home')
    }
    const handleMysteries = () => {
        navigate('/mysteries')
    }
    const handleCards = () => {
        navigate('/cards')
    }
    const handleRanking = () => {
        navigate('/ranking')
    }
    
  return (
    <>
        <div className="footer">
            <div className="footer-content">
                <div className="footer-part footer-part-1" onClick={handleHome}></div>
                <div className="footer-part footer-part-2" onClick={handleMysteries}></div>
                <div className="footer-part footer-part-3" onClick={handleCards}></div>
                <div className="footer-part footer-part-4" onClick={handleRanking}></div>
            </div>
        </div>
    </>
  );
}

export default Footer;