import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar';

const Root = () => {
    return (
        <>
        <TopBar />
        <Outlet />


        </>
    );
}

export default Root;
