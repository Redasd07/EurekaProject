import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCar } from 'react-icons/fa';

const Home = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/hero-bg.jpg)` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-extrabold mb-6 animate-pulse">
            Bienvenue chez <span className="text-blue-500">Cars & Client</span>
          </h1>
          <p className="text-xl mb-8">Gérez vos clients et leurs véhicules avec simplicité et style.</p>
          <div className="flex justify-center space-x-6">
            <Link
              to="/clients"
              className="flex items-center bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 text-lg shadow-lg"
            >
              <FaUsers className="mr-2" /> Gérer les Clients
            </Link>
            <Link
              to="/cars"
              className="flex items-center bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 text-lg shadow-lg"
            >
              <FaCar className="mr-2" /> Gérer les Voitures
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
