import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-indigo-600 font-bold">₹{service.price}/{service.priceType === 'hourly' ? 'hr' : 'fixed'}</span>
        <span className="text-yellow-500">{'★'.repeat(Math.round(service.provider?.rating || 0))}</span>
      </div>
      <p className="text-gray-500 text-sm mt-2">by {service.provider?.user?.name || 'Provider'}</p>
      <Link to={`/book/${service._id}`} className="mt-4 block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Book Now</Link>
    </div>
  );
}
