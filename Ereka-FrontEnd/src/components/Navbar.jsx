import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaCar } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Car & Client Manager</h1>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-blue-300 flex items-center' : 'text-white flex items-center hover:text-blue-300'
              }
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                isActive ? 'text-blue-300 flex items-center' : 'text-white flex items-center hover:text-blue-300'
              }
            >
              <FaUsers className="mr-2" /> Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                isActive ? 'text-blue-300 flex items-center' : 'text-white flex items-center hover:text-blue-300'
              }
            >
              <FaCar className="mr-2" /> Cars
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
