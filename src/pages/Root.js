import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <>
        <TopBar />
        <Outlet />
        <Footer />


        </>
    );
}

export default Root;
