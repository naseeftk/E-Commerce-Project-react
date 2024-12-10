import React from 'react';
import Adnavbar from '../Navbar/Adnavbar';
import { Outlet } from 'react-router-dom';
import Adsidebar from '../Sidebar/Adsidebar';


const Adlayout = () => {
  return (
    <div className="flex">
      <Adsidebar />
      <div className="flex-1 ml-64">
        <Adnavbar />
        <main className="p-20">
          <Outlet />
        </main>
   
      </div>
    </div>
  );
};

export default Adlayout;
