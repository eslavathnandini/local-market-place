const express = require('express');
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const filter = req.user.role === 'provider'
      ? { provider: (await require('../models/Provider').findOne({ user: req.user._id }))._id }
      : { customer: req.user._id };

    const bookings = await Booking.find(filter)
      .populate('customer', 'name email phone')
      .populate({ path: 'provider', populate: { path: 'user', select: 'name email phone' } })
      .populate('service', 'title price')
      .sort('-date');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, customer: req.user._id });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
