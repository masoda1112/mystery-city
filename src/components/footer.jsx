import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
    const navigate = useNavigate()
    const location = useLocation().pathname

    const handleHome = () => {
        navigate('/home')
    }
    const handleAnswer = () => {
        navigate('/answer')
    }
    const handleClear = () => {
        navigate('/card')
    }
    const handleRanking = () => {
        navigate('/ranking')
    }
    
  return (
    <>
        <div className="footer">
            <div className="footer-content">
                <div className={`footer-part footer-part-1 ${location == "/home" ? "opacity-100" : ""}`} onClick={handleHome}></div>
                <div className={`footer-part footer-part-2 ${location == "/answer" ? "opacity-100" : ""}`} onClick={handleAnswer}></div>
                <div className={`footer-part footer-part-3 ${location == "/card" ? "opacity-100" : ""}`} onClick={handleClear}></div>
                <div className={`footer-part footer-part-4 ${location == "/ranking" ? "opacity-100" : ""}`} onClick={handleRanking}></div>
            </div>
        </div>
    </>
  );
}

export default Footer;