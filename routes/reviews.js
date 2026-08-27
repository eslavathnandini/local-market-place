const express = require('express');
const Review = require('../models/Review');
const Provider = require('../models/Provider');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/provider/:providerId', async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.providerId })
      .populate('customer', 'name avatar')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, customer: req.user._id });

    const provider = await Provider.findById(req.body.provider);
    const reviews = await Review.find({ provider: req.body.provider });
    provider.rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    provider.totalReviews = reviews.length;
    await provider.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id/response', protect, authorize('provider'), async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, {
      providerResponse: req.body.response,
      responseDate: new Date()
    }, { new: true });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
