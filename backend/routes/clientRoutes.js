const express = require('express');

const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

const router = express.Router();

// Create client
router.post('/', createClient);

// Get all clients
router.get('/', getClients);

// Get client by ID
router.get('/:id', getClientById);

// Update client
router.put('/:id', updateClient);

// Delete client
router.delete('/:id', deleteClient);

module.exports = router;
