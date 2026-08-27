import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) api.get('/bookings').then(res => setBookings(res.data));
  }, [user]);

  const updateStatus = async (id, status) => {
    await api.put(`/bookings/${id}/status`, { status });
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
  };

  const statusColors = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800', 'in-progress': 'bg-purple-100 text-purple-800', completed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{booking.service?.title}</h3>
                  <p className="text-gray-600 text-sm">Provider: {booking.provider?.user?.name}</p>
                  <p className="text-gray-600 text-sm">Date: {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-sm">Time: {booking.timeSlot?.start} - {booking.timeSlot?.end}</p>
                  <p className="text-indigo-600 font-bold mt-2">₹{booking.totalAmount}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[booking.status]}`}>{booking.status}</span>
                  {user?.role === 'provider' && booking.status === 'pending' && (
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => updateStatus(booking._id, 'confirmed')} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Accept</button>
                      <button onClick={() => updateStatus(booking._id, 'cancelled')} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
                    </div>
                  )}
                  {user?.role === 'provider' && booking.status === 'confirmed' && (
                    <button onClick={() => updateStatus(booking._id, 'completed')} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm">Complete</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
