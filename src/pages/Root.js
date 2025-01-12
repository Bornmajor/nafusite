import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import AppModal from '../components/AppModal';
import MyContext from '../context/context';

const Root = () => {
  
    return (
        <>
        <TopBar />
        <Outlet />
        <Footer />
        <AppModal />


        </>
    );
}

export default Root;
