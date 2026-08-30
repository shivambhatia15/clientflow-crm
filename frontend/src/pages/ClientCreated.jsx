import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateClient.css';

const ClientCreated = () => {
  const navigate = useNavigate();

  return (
    <div className="client-created-page">

      <div className="success-icon">
        ✓
      </div>

      <h1>Client Created</h1>

      <h2>Successfully</h2>

      <p>
        The client has been successfully added.
      </p>

      <button
        className="register-client-button"
        onClick={() => navigate('/clients')}
      >
        Back to Clients
      </button>

    </div>
  );
};

export default ClientCreated;
