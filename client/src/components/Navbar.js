import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">LocalServe</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/services" className="text-gray-700 hover:text-indigo-600">Services</Link>
            {user ? (
              <>
                <Link to="/my-bookings" className="text-gray-700 hover:text-indigo-600">My Bookings</Link>
                <span className="text-gray-500">Hi, {user.name}</span>
                <button onClick={logout} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
