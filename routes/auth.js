const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Provider = require('../models/Provider');
const { protect } = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const user = await User.create({ name, email, password, phone, role });

    if (role === 'provider') {
      const { businessName, description, category, hourlyRate } = req.body;
      await Provider.create({
        user: user._id,
        businessName: businessName || name,
        description: description || '',
        category: category || 'general',
        hourlyRate: hourlyRate || 0
      });
    }

    res.status(201).json({ token: generateToken(user._id), user: { id: user._id, name, email, role } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
