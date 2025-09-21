import React from 'react';
import { Lock } from 'lucide-react';
import LoginModal from './LoginModal';

interface LoginWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginWarningModal: React.FC<LoginWarningModalProps> = ({ isOpen, onClose }) => {
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleLoginClick = () => {
    onClose(); // Close warning modal
    setShowLoginModal(true); // Open login modal
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 text-center">
          <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔒 Login Required...</h2>
          <p className="text-gray-600 mb-6 font-bold">
            You have reached the free upload limit.<br />
            Please <button onClick={handleLoginClick} className="text-blue-600 hover:underline">login</button> to continue.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default LoginWarningModal;