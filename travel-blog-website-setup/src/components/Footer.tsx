import { Globe, Mail, Map } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">WanderLust</h3>
            <p className="text-gray-400">Sharing stories from around the globe.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Globe className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Map className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} WanderLust. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
