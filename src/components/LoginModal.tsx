import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleGoogleLogin = () => {
    // This will be handled by Firebase auth
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    // This will be handled by Firebase auth
    console.log('Facebook login clicked');
  };

  const handleEmailLogin = () => {
    // Redirect to email login page
    window.location.href = './email_login.html';
  };

  const handlePersonalLogin = () => {
    // Redirect to personal login page
    window.location.href = './direct_login.html';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-10 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl transition-colors"
        >
          <X size={24} />
        </button>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign in</h1>
        <p className="text-gray-600 mb-8">We are happy to see you back!</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <i className="fab fa-google mr-2"></i>
            Google
          </button>
          
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <i className="fab fa-facebook-f mr-2"></i>
            Facebook
          </button>
          
          <button
            onClick={handleEmailLogin}
            className="flex items-center justify-center px-5 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-envelope mr-2"></i>
            Email
          </button>
          
          <button
            onClick={handlePersonalLogin}
            className="flex items-center justify-center px-5 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <i className="fas fa-user mr-2"></i>
            Personal Sign In
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          I am not registered — <a href="./signup_user.html" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;