import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function ReviewSection({ providerId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    api.get(`/reviews/provider/${providerId}`).then(res => setReviews(res.data));
  }, [providerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', { provider: providerId, ...form });
      setForm({ rating: 5, comment: '' });
      const res = await api.get(`/reviews/provider/${providerId}`);
      setReviews(res.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Reviews ({reviews.length})</h3>
      {user && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm">Rating:</label>
            <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
              className="border rounded px-2 py-1">
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
          <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
            className="w-full border rounded px-3 py-2 mb-2" placeholder="Write your review..." rows="2" />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Submit Review</button>
        </form>
      )}
      {reviews.map(review => (
        <div key={review._id} className="border-b py-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">{review.customer?.name}</span>
            <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
          {review.providerResponse && (
            <p className="text-gray-500 text-sm mt-2 italic">Provider: {review.providerResponse}</p>
          )}
        </div>
      ))}
    </div>
  );
}
