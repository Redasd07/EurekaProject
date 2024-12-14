import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaCar } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-extrabold">
          <span className="hover:underline">Car & Client Manager</span>
        </h1>
        <ul className="flex space-x-6 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-300 flex items-center'
                  : 'text-white flex items-center hover:text-blue-300 transition'
              }
            >
              <FaHome className="mr-2" /> Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-300 flex items-center'
                  : 'text-white flex items-center hover:text-blue-300 transition'
              }
            >
              <FaUsers className="mr-2" /> Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-300 flex items-center'
                  : 'text-white flex items-center hover:text-blue-300 transition'
              }
            >
              <FaCar className="mr-2" /> Voitures
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
