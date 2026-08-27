import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import BookingForm from '../components/BookingForm';

export default function Booking() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    api.get(`/services/${serviceId}`).then(res => setService(res.data));
  }, [serviceId]);

  if (!service) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold">{service.title}</h1>
        <p className="text-gray-600 mt-2">{service.description}</p>
        <p className="text-indigo-600 font-bold text-xl mt-4">₹{service.price}/{service.priceType === 'hourly' ? 'hr' : 'fixed'}</p>
        <p className="text-gray-500 mt-2">Provider: {service.provider?.user?.name}</p>
      </div>
      <BookingForm service={service} provider={service.provider} />
    </div>
  );
}
