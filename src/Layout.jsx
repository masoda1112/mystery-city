// Layout.jsx
import React, { useContext, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { AppContext } from "./AppContext";
import { useLocation } from "react-router-dom";


const Layout = ({ children }) => {
    const location = useLocation().pathname;
    const {headerTitle, setHeaderTitle} = useContext(AppContext)

    const handleTitle = () =>{
        let title = ''
        if(location == "/home"){
          title = 'Profile'
        }else if(location == "/answer"){
          title = 'Answer'
        }else if(location == "/card"){
          title = 'Card'
        }else if(location == "/ranking"){
          title = 'ranking'
        }
        return title
    }
    
    useEffect(()=>{
        const title = handleTitle(location)
        setHeaderTitle(title)
    },[location])
    return (
    <>
        <Header />
            <main>{children}</main>
        <Footer />
    </>
    );
};

export default Layout;