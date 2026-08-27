import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import ReviewSection from '../components/ReviewSection';

export default function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    api.get(`/providers/${id}`).then(res => setProvider(res.data));
  }, [id]);

  if (!provider) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold">{provider.businessName}</h1>
        <p className="text-gray-600 mt-2">{provider.description}</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-indigo-600">₹{provider.hourlyRate}/hr</p>
            <p className="text-gray-500 text-sm">Hourly Rate</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-500">★ {provider.rating?.toFixed(1)}</p>
            <p className="text-gray-500 text-sm">Rating</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">{provider.experience} yrs</p>
            <p className="text-gray-500 text-sm">Experience</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Category: <span className="text-indigo-600">{provider.category}</span></h3>
          <h3 className="font-semibold">Contact: <span className="text-gray-600">{provider.user?.email}</span></h3>
        </div>
      </div>
      <ReviewSection providerId={provider._id} />
    </div>
  );
}
