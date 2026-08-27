const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  experience: { type: Number, default: 0 },
  hourlyRate: { type: Number, required: true },
  availability: {
    monday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    tuesday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    wednesday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    thursday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    friday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    saturday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] },
    sunday: { available: { type: Boolean, default: false }, slots: [{ start: String, end: String }] }
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  serviceArea: { type: Number, default: 10 },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

providerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Provider', providerSchema);
