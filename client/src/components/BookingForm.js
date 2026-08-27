import { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function BookingForm({ service, provider, onBooked }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ date: '', startTime: '09:00', endTime: '10:00', notes: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/bookings', {
        provider: provider._id,
        service: service._id,
        date: form.date,
        timeSlot: { start: form.startTime, end: form.endTime },
        totalAmount: service.price,
        notes: form.notes
      });
      alert('Booking created successfully!');
      onBooked?.();
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    }
    setLoading(false);
  };

  if (!user) return <p className="text-red-500">Please login to book</p>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Book This Service</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
            className="mt-1 block w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input type="time" required value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })}
              className="mt-1 block w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input type="time" required value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })}
              className="mt-1 block w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
            className="mt-1 block w-full border rounded-lg px-3 py-2" rows="3" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50">
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}
