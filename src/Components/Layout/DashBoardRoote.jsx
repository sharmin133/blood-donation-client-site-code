import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const DashBoardRoot = () => {
    return (
           <div className="max-w-[1920px] mx-auto overflow-x-hidden">
             <Navbar></Navbar>
             <Outlet></Outlet>
             <Footer></Footer>
        </div>
    );
};

export default DashBoardRoot;