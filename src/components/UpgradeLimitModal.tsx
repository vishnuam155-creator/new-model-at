import React from 'react';
import Modal from './Modal';

interface UpgradeLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeLimitModal: React.FC<UpgradeLimitModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Limit Reached</h2>
        <p className="text-gray-600 mb-6">
          Your current plan has reached its maximum uploads.<br />
          Please <strong>upgrade your plan</strong> to continue using Resume Checker.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onUpgrade}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Upgrade Now
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpgradeLimitModal;