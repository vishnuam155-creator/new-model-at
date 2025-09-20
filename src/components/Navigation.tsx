import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">QuotientOne</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a 
              href="https://quotientone-getintouch.carrd.co/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Services
            </a>
            <a 
              href="https://quotientoneabout.carrd.co/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </a>
            
            {authState.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {authState.user && (
                  <span className="text-sm text-gray-600">
                    Welcome, {authState.user.username} ({authState.user.plan})
                  </span>
                )}
                <button
                  onClick={logout}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a 
                href="./login_page_FireBase/firebase_login.html"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login-Signup
              </a>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <a href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a 
                href="https://quotientone-getintouch.carrd.co/" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Services
              </a>
              <a 
                href="https://quotientoneabout.carrd.co/" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Us
              </a>
              
              {authState.isAuthenticated ? (
                <div className="px-3 py-2 space-y-2">
                  {authState.user && (
                    <div className="text-sm text-gray-600">
                      Welcome, {authState.user.username} ({authState.user.plan})
                    </div>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a 
                  href="./login_page_FireBase/firebase_login.html"
                  className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                >
                  Login-Signup
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;