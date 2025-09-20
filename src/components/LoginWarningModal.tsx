import React from 'react';
import { Lock } from 'lucide-react';

interface LoginWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginWarningModal: React.FC<LoginWarningModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 text-center">
        <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🔒 Login Required...</h2>
        <p className="text-gray-600 mb-6 font-cursive font-bold">
          You have reached the free upload limit.<br />
          Please <a href="./login_page_FireBase/firebase_login.html" className="text-blue-600 hover:underline">login</a> to continue.
        </p>
      </div>
    </div>
  );
};

export default LoginWarningModal;