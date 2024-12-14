import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaUser, FaTrash, FaPlusCircle, FaCarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newClient, setNewClient] = useState({ nom: '', age: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    api.get('/clients')
      .then(response => {
        setClients(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des clients.');
      });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.nom || !newClient.age) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs.',
      });
      return;
    }

    api.post('/clients', newClient)
      .then(response => {
        setClients([...clients, response.data]);
        setNewClient({ nom: '', age: '' });
        Swal.fire({
          icon: 'success',
          title: 'Client ajouté !',
          text: `${response.data.nom} a été ajouté avec succès.`,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'ajout du client.",
        });
      });
  };

  const handleDeleteClient = (clientId) => {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/clients/${clientId}`)
          .then(() => {
            setClients(clients.filter(client => client.id !== clientId));
            Swal.fire('Supprimé !', 'Le client a été supprimé.', 'success');
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Impossible de supprimer le client.",
            });
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Liste des Clients</h2>
      
      {/* Formulaire pour ajouter un client */}
      <form onSubmit={handleAddClient} className="bg-white shadow-md p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Ajouter un Client</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Nom"
              value={newClient.nom}
              onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
              <FaUser />
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="Âge"
              value={newClient.age}
              onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition transform hover:scale-105 font-bold shadow-lg"
          >
            <FaPlusCircle className="mr-2" /> Ajouter
          </button>
        </div>
      </form>

      {/* Affichage des erreurs */}
      {error && <div className="text-red-600 font-semibold">{error}</div>}

      {/* Liste des clients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {clients.map(client => (
    <div
      key={client.id}
      className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl hover:scale-105 transition duration-300"
    >
      <h3 className="text-xl font-bold">
        <FaUser className="inline text-blue-600 mr-2" /> {client.nom}
      </h3>
      <p className="text-gray-600">Âge: {client.age}</p>

      {/* Conteneur pour espacer les boutons */}
      <div className="flex justify-between mt-4">
        {/* Lien pour voir les voitures */}
        <Link
          to={`/clients/${client.id}/cars`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition inline-block text-center"
        >
          <FaCarAlt className="inline mr-2" /> Voir les Voitures
        </Link>

        {/* Bouton pour supprimer un client */}
        <button
          onClick={() => handleDeleteClient(client.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <FaTrash className="inline mr-2" /> Supprimer
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ClientList;
