import React from 'react';
import { FaBox, FaHome, FaUser, FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Adsidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed">
      <div className="py-6 px-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-4 flex flex-col space-y-5 px-7">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-6 text-lg hover:bg-gray-800 transition ${
              isActive ? 'bg-gray-700 font-semibold text-yellow-400' : ''
            }`
          }
        >
          <FaHome size="25px" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/admin/adusers"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-6 text-lg hover:bg-gray-800 transition ${
              isActive ? 'bg-gray-700 font-medium text-yellow-400' : ''
            }`
          }
        >
          <FaUser size="22px" />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/adproducts"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-6 text-lg hover:bg-gray-800 transition ${
              isActive ? 'bg-gray-700 font-semibold text-yellow-400' : ''
            }`
          }
        >
          <FaBox size="20px" />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/adorders"
          className={({ isActive }) =>
            `flex items-center space-x-3 py-3 px-6 text-lg hover:bg-gray-800 transition ${
              isActive ? 'bg-gray-700 font-semibold text-yellow-400' : ''
            }`
          }
        >
          <FaShoppingCart size="20px" />
          <span>Orders</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Adsidebar;
