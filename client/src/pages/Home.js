import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Local Service Providers</h1>
          <p className="text-xl mb-8">Connect with trusted plumbers, electricians, tutors, cleaners & more</p>
          <Link to="/services" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Browse Services</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Search', desc: 'Browse services in your area' },
            { title: 'Book', desc: 'Select date & time that works for you' },
            { title: 'Get Service', desc: 'Professional comes to you' }
          ].map((item, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-lg shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">{i + 1}</span>
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
