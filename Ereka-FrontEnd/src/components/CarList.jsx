import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaCarAlt, FaTrash, FaPlusCircle } from 'react-icons/fa';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newCar, setNewCar] = useState({ marque: '', modele: '', matricule: '', clientId: '' });

  // Charger les voitures et les clients depuis l'API
  useEffect(() => {
    fetchCars();
    fetchClients();
  }, []);

  const fetchCars = () => {
    api.get('/voitures')
      .then(response => {
        setCars(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
        setError('Erreur lors de la récupération des voitures.');
      });
  };

  const fetchClients = () => {
    api.get('/clients')
      .then(response => {
        setClients(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
        setError('Erreur lors de la récupération des clients.');
      });
  };

  // Gérer la soumission du formulaire pour ajouter une voiture
  const handleAddCar = (e) => {
    e.preventDefault();
    if (!newCar.clientId) {
      alert('Veuillez sélectionner un client.');
      return;
    }
    api.post(`/voitures/${newCar.clientId}`, newCar)
      .then(response => {
        setCars([...cars, response.data]); // Ajouter la nouvelle voiture à la liste
        setNewCar({ marque: '', modele: '', matricule: '', clientId: '' }); // Réinitialiser le formulaire
      })
      .catch(error => {
        console.error('Error adding car:', error);
        setError('Erreur lors de l’ajout de la voiture.');
      });
  };

  // Gérer la suppression d'une voiture
  const handleDeleteCar = (carId) => {
    api.delete(`/voitures/${carId}`)
      .then(() => {
        setCars(cars.filter(car => car.id !== carId)); // Mettre à jour la liste après suppression
      })
      .catch(error => {
        console.error('Error deleting car:', error);
        setError('Erreur lors de la suppression de la voiture.');
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Liste des Voitures</h2>

      {/* Formulaire pour ajouter une voiture */}
      <form onSubmit={handleAddCar} className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Ajouter une Voiture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Marque"
            value={newCar.marque}
            onChange={(e) => setNewCar({ ...newCar, marque: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Modèle"
            value={newCar.modele}
            onChange={(e) => setNewCar({ ...newCar, modele: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Matricule"
            value={newCar.matricule}
            onChange={(e) => setNewCar({ ...newCar, matricule: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <select
            value={newCar.clientId}
            onChange={(e) => setNewCar({ ...newCar, clientId: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
            required
          >
            <option value="">Sélectionner un client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.nom}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FaPlusCircle className="inline mr-2" /> Ajouter
          </button>
        </div>
      </form>

      {/* Liste des voitures */}
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div
              key={car.id}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
              <h3 className="text-xl font-bold">
                <FaCarAlt className="inline text-blue-600 mr-2" />
                {car.marque} {car.modele}
              </h3>
              <p className="text-gray-600">Matricule: {car.matricule}</p>
              <p className="text-gray-600">Propriétaire: {car.client ? car.client.nom : 'Inconnu'}</p>
              <button
                onClick={() => handleDeleteCar(car.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700 transition"
              >
                <FaTrash className="inline mr-2" /> Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
