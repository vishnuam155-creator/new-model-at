import React from 'react';
import FirebaseLoginModal from './FirebaseLoginModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const handleSuccess = () => {
    // Refresh the page or update auth state
    window.location.reload();
  };

  return (
    <FirebaseLoginModal 
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={handleSuccess}
    />
  );
};

export default LoginModal;