import React, { useState } from 'react';
import { X, Mail, User } from 'lucide-react';
import { signInWithGoogle, signInWithFacebook } from '../services/authService';
import EmailAuthModal from './EmailAuthModal';

interface FirebaseLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const FirebaseLoginModal: React.FC<FirebaseLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [showEmailAuth, setShowEmailAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onSuccess();
      onClose();
    } catch (error: any) {
      alert("Google login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithFacebook();
      onSuccess();
      onClose();
    } catch (error: any) {
      alert("Facebook login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailClick = () => {
    setShowEmailAuth(true);
  };

  const handleEmailSuccess = () => {
    setShowEmailAuth(false);
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-10 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign in</h1>
          <p className="text-gray-600 mb-8">We are happy to see you back!</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fab fa-google mr-2"></i>
              Google
            </button>
            
            <button
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fab fa-facebook-f mr-2"></i>
              Facebook
            </button>
            
            <button
              onClick={handleEmailClick}
              disabled={isLoading}
              className="flex items-center justify-center px-5 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail size={16} className="mr-2" />
              Email
            </button>
            
            <button
              onClick={handleEmailClick}
              disabled={isLoading}
              className="flex items-center justify-center px-5 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <User size={16} className="mr-2" />
              Personal Sign In
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            I am not registered — <button onClick={handleEmailClick} className="text-blue-600 hover:underline">Sign Up</button>
          </p>
          
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
      
      <EmailAuthModal 
        isOpen={showEmailAuth}
        onClose={() => setShowEmailAuth(false)}
        onSuccess={handleEmailSuccess}
      />
    </>
  );
};

export default FirebaseLoginModal;