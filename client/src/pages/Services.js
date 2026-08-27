import { useState, useEffect } from 'react';
import api from '../utils/api';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const url = category ? `/services?category=${category}` : '/services';
    api.get(url).then(res => setServices(res.data));
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Browse Services</h1>
      <div className="flex gap-2 mb-6 flex-wrap">
        {['', 'plumbing', 'electrical', 'cleaning', 'tutoring', 'painting', 'general'].map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg ${category === cat ? 'bg-indigo-600 text-white' : 'bg-white border hover:bg-gray-50'}`}>
            {cat || 'All'}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => <ServiceCard key={service._id} service={service} />)}
      </div>
      {services.length === 0 && <p className="text-center text-gray-500 py-8">No services found</p>}
    </div>
  );
}
