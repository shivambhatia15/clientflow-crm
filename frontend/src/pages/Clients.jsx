import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get('/api/clients');
      setClients(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to load clients.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div>
      <h1>Clients</h1>

	<button
      	onClick={() => window.location.href = '/clients/create'}
    	>
     	 + Create Client
    	</button>

      {error && <p>{error}</p>}

      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div>
          {clients.map((client) => (
            <div key={client._id}>
              <h3>{client.name}</h3>
              <p>{client.email}</p>
              <p>{client.phone}</p>
              <p>{client.company}</p>
              <p>Status: {client.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
