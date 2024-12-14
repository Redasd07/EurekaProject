import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaCarAlt, FaTrash, FaPlusCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newCar, setNewCar] = useState({ marque: '', modele: '', matricule: '', clientId: '' });

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
      .catch(() => {
        setError('Erreur lors de la récupération des voitures.');
      });
  };

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

  const handleAddCar = (e) => {
    e.preventDefault();
    if (!newCar.clientId) {
      Swal.fire('Erreur', 'Veuillez sélectionner un client.', 'error');
      return;
    }
    api.post(`/voitures/${newCar.clientId}`, newCar)
      .then(response => {
        setCars([...cars, response.data]);
        setNewCar({ marque: '', modele: '', matricule: '', clientId: '' });
        Swal.fire('Succès', 'Voiture ajoutée avec succès.', 'success');
      })
      .catch(() => {
        Swal.fire('Erreur', "Une erreur s'est produite lors de l'ajout de la voiture.", 'error');
      });
  };

  const handleDeleteCar = (carId) => {
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
        api.delete(`/voitures/${carId}`)
          .then(() => {
            setCars(cars.filter(car => car.id !== carId));
            Swal.fire('Supprimé', 'La voiture a été supprimée.', 'success');
          })
          .catch(() => {
            Swal.fire('Erreur', "Impossible de supprimer la voiture.", 'error');
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Liste des Voitures</h2>

      <form onSubmit={handleAddCar} className="bg-white shadow-md p-6 rounded-lg mb-6">
  <h3 className="text-xl font-bold text-blue-600 mb-4">Ajouter une Voiture</h3>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {/* Champ pour la marque */}
    <div className="relative">
      <input
        type="text"
        placeholder="Marque"
        value={newCar.marque}
        onChange={(e) => setNewCar({ ...newCar, marque: e.target.value })}
        className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
        required
      />
    </div>

    {/* Champ pour le modèle */}
    <div className="relative">
      <input
        type="text"
        placeholder="Modèle"
        value={newCar.modele}
        onChange={(e) => setNewCar({ ...newCar, modele: e.target.value })}
        className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
        required
      />
    </div>

    {/* Champ pour le matricule */}
    <div className="relative">
      <input
        type="text"
        placeholder="Matricule"
        value={newCar.matricule}
        onChange={(e) => setNewCar({ ...newCar, matricule: e.target.value })}
        className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
        required
      />
    </div>

    {/* Sélecteur de client */}
    <div className="relative">
      <select
        value={newCar.clientId}
        onChange={(e) => setNewCar({ ...newCar, clientId: e.target.value })}
        className="border border-gray-300 p-3 rounded-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
        required
      >
        <option value="">Sélectionner un client</option>
        {clients.map(client => (
          <option key={client.id} value={client.id}>
            {client.nom}
          </option>
        ))}
      </select>
    </div>

    {/* Bouton d'ajout */}
    <button
      type="submit"
      className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition transform hover:scale-105 font-bold shadow-lg"
    >
      <FaPlusCircle className="mr-2" /> Ajouter
    </button>
  </div>
</form>

      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div
              key={car.id}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-bold">
                <FaCarAlt className="inline text-blue-600 mr-2" /> {car.marque} {car.modele}
              </h3>
              <p className="text-gray-600">Matricule: {car.matricule}</p>
              <p className="text-gray-600">
                Propriétaire: {car.client ? car.client.nom : 'Inconnu'}
              </p>
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
