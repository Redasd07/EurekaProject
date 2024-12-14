import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClientList from './components/ClientList';
import CarList from './components/CarList';
import ClientCars from './components/ClientCars';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/clients/:clientId/cars" element={<ClientCars />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
