import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './CreateClient.css';

const CreateClient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'Active',
    notes: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please complete all required fields.');
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post('/api/clients', formData);

      navigate('/client-created');
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Unable to create client. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-client-page">
      <div className="mobile-header">
        <button
          className="back-button"
          onClick={() => navigate('/clients')}
        >
          ←
        </button>

        <span>Create Client</span>
      </div>

      <div className="create-client-content">
        <h1>Create Client</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Client Name</label>
            <input
              type="text"
              name="name"
              placeholder="Client name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Client Email</label>
            <input
              type="email"
              name="email"
              placeholder="client@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Client Contact</label>
            <input
              type="tel"
              name="phone"
              placeholder="0400000000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Client Scope</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
            >
              <option value="">Select Client Scope</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="register-client-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Register Client'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateClient;
