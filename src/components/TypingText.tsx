import React from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, className = "" }) => {
  const displayedText = useTypingEffect(text, speed);

  return (
    <p className={`text-center text-gray-800 ${className}`}>
      {displayedText}
    </p>
  );
};

export default TypingText;