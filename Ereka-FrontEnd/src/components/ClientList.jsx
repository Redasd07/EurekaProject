import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaUser, FaTrash, FaPlusCircle } from 'react-icons/fa';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newClient, setNewClient] = useState({ nom: '', age: '' });

  // Charger les clients depuis l'API
  useEffect(() => {
    fetchClients();
  }, []);

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

  // Ajouter un client
  const handleAddClient = (e) => {
    e.preventDefault();
    api.post('/clients', newClient)
      .then(response => {
        setClients([...clients, response.data]); // Ajouter le nouveau client à la liste
        setNewClient({ nom: '', age: '' }); // Réinitialiser le formulaire
      })
      .catch(error => {
        console.error('Error adding client:', error);
        setError('Erreur lors de l’ajout du client.');
      });
  };

  // Supprimer un client
  const handleDeleteClient = (clientId) => {
    api.delete(`/clients/${clientId}`)
      .then(() => {
        setClients(clients.filter(client => client.id !== clientId)); // Mettre à jour la liste après suppression
      })
      .catch(error => {
        console.error('Error deleting client:', error);
        setError('Erreur lors de la suppression du client.');
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Liste des Clients</h2>

      {/* Formulaire pour ajouter un client */}
      <form onSubmit={handleAddClient} className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Ajouter un Client</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom"
            value={newClient.nom}
            onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Âge"
            value={newClient.age}
            onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FaPlusCircle className="inline mr-2" /> Ajouter
          </button>
        </div>
      </form>

      {/* Liste des clients */}
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div
              key={client.id}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
              <h3 className="text-xl font-bold">
                <FaUser className="inline text-blue-600 mr-2" />
                {client.nom}
              </h3>
              <p className="text-gray-600">Âge: {client.age}</p>
              <button
                onClick={() => handleDeleteClient(client.id)}
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

export default ClientList;
