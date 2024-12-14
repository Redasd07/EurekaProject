import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { FaCarAlt } from 'react-icons/fa';

const ClientCars = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientAndCars();
  }, []);

  const fetchClientAndCars = async () => {
    try {
      const [clientResponse, carsResponse] = await Promise.all([
        api.get(`/clients/${clientId}`),
        api.get(`/voitures`),
      ]);

      const clientData = clientResponse.data;
      const clientCars = carsResponse.data.filter(car => car.idClient === parseInt(clientId));

      setClient(clientData);
      setCars(clientCars);
    } catch (err) {
      setError("Erreur lors de la récupération des informations.");
    }
  };

  return (
    <div>
      {client && (
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Voitures de {client.nom}
        </h2>
      )}
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : cars.length === 0 ? (
        <div className="text-gray-600 font-semibold">
          {client ? `${client.nom} n'a pas de voitures.` : 'Aucune voiture trouvée.'}
        </div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientCars;
