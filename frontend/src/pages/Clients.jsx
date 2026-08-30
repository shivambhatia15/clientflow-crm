import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './Clients.css';

const Clients = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

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

  const filteredClients = clients.filter((client) => {
    const searchText = search.toLowerCase();

    return (
      client.name?.toLowerCase().includes(searchText) ||
      client.email?.toLowerCase().includes(searchText) ||
      client.phone?.toLowerCase().includes(searchText) ||
      client.company?.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="clients-page">
        <div className="clients-container">
          <p>Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="clients-page">
      <div className="clients-container">

        <div className="clients-header">
          <div className="clients-title">
            <h1>Clients</h1>
            <p>Manage your clients and their information</p>
          </div>

          <button
            className="create-client-button"
            onClick={() => navigate('/clients/create')}
          >
            + Create Client
          </button>
        </div>

        <div className="clients-search">
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && (
          <div className="clients-error">
            {error}
          </div>
        )}

        {filteredClients.length === 0 ? (
          <div className="no-clients">
            {search
              ? 'No clients match your search.'
              : 'No clients found.'}
          </div>
        ) : (
          <div className="clients-grid">
            {filteredClients.map((client) => (
              <div className="client-card" key={client._id}>

                <div className="client-card-header">
                  <div>
                    <h2 className="client-name">
                      {client.name}
                    </h2>

                    <div className="client-scope">
                      {client.company || 'Client'}
                    </div>
                  </div>

                  <span className="client-status">
                    {client.status || 'Active'}
                  </span>
                </div>

                <div className="client-details">

                  <div className="client-detail">
                    <span className="detail-label">
                      Email
                    </span>
                    <span>{client.email}</span>
                  </div>

                  <div className="client-detail">
                    <span className="detail-label">
                      Phone
                    </span>
                    <span>{client.phone}</span>
                  </div>

                  <div className="client-detail">
                    <span className="detail-label">
                      Scope
                    </span>
                    <span>{client.company || '—'}</span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Clients;
