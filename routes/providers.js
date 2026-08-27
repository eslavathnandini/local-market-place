const express = require('express');
const Provider = require('../models/Provider');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, city, minRating, maxPrice } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (maxPrice) filter.hourlyRate = { $lte: Number(maxPrice) };
    if (city) filter['address.city'] = city;

    const providers = await Provider.find(filter).populate('user', 'name email phone avatar');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate('user', 'name email phone avatar');
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', protect, authorize('provider'), async (req, res) => {
  try {
    const provider = await Provider.findOneAndUpdate({ user: req.user._id }, req.body, { new: true });
    res.json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/dashboard/stats', protect, authorize('provider'), async (req, res) => {
  try {
    const provider = await Provider.findOne({ user: req.user._id });
    const Booking = require('../models/Booking');
    const Review = require('../models/Review');

    const totalBookings = await Booking.countDocuments({ provider: provider._id });
    const pendingBookings = await Booking.countDocuments({ provider: provider._id, status: 'pending' });
    const completedBookings = await Booking.countDocuments({ provider: provider._id, status: 'completed' });
    const totalEarnings = await Booking.aggregate([
      { $match: { provider: provider._id, status: 'completed', paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalBookings,
      pendingBookings,
      completedBookings,
      totalEarnings: totalEarnings[0]?.total || 0,
      rating: provider.rating,
      totalReviews: provider.totalReviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
