import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; 2024 QuotientOne All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <a 
              href="https://privacypolicy-quotient-one.carrd.co/" 
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a 
              href="https://privacypolicy-quotient-one.carrd.co/" 
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            <a 
              href="https://quotient-one.web.app/" 
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              QuotientOne
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;