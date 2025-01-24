const express = require('express');
const AdminModel = require('../models/admin');

const router = express.Router();

// Get all administrators
router.get('/', async (req, res) => {
  try {
    const admins = await AdminModel.findAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching administrators' });
  }
});

// Create new administrator
router.post('/', async (req, res) => {
  try {
    const newAdmin = await AdminModel.create(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating administrator' });
  }
});

// Delete administrator
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await AdminModel.delete(Number(req.params.id));
    if (deleted) {
      res.json({ message: 'Administrator deleted' });
    } else {
      res.status(404).json({ message: 'Administrator not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting administrator' });
  }
});

module.exports = router;