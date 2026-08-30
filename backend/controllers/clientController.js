const Client = require('../models/Client');

// Create a new client
const createClient = async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: 'Name, email and phone are required'
      });
    }

    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.status(409).json({
        message: 'A client with this email already exists'
      });
    }

    const client = await Client.create({
      name,
      email,
      phone,
      company,
      status,
      notes
    });

    res.status(201).json({
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating client',
      error: error.message
    });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching clients',
      error: error.message
    });
  }
};

// Get one client
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: 'Client not found'
      });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching client',
      error: error.message
    });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({
        message: 'Client not found'
      });
    }

    res.status(200).json({
      message: 'Client updated successfully',
      client
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating client',
      error: error.message
    });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: 'Client not found'
      });
    }

    res.status(200).json({
      message: 'Client deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting client',
      error: error.message
    });
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
};
