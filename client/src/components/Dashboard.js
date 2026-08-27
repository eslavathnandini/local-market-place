import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/providers/dashboard/stats').then(res => setStats(res.data));
  }, []);

  if (!stats) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-indigo-600">{stats.totalBookings}</p>
        <p className="text-gray-500">Total Bookings</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-yellow-500">{stats.pendingBookings}</p>
        <p className="text-gray-500">Pending</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-green-600">{stats.completedBookings}</p>
        <p className="text-gray-500">Completed</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-indigo-600">₹{stats.totalEarnings}</p>
        <p className="text-gray-500">Earnings</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-yellow-500">★ {stats.rating?.toFixed(1)}</p>
        <p className="text-gray-500">Rating</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-2xl font-bold text-gray-600">{stats.totalReviews}</p>
        <p className="text-gray-500">Reviews</p>
      </div>
    </div>
  );
}
