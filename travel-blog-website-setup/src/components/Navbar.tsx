import { Link, useLocation } from 'react-router-dom';
import { Compass, PenTool, Home } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">WanderLust</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                !isAdmin ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link
              to="/admin"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isAdmin ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <PenTool className="h-4 w-4 mr-2" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
