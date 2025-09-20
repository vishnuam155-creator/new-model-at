import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ResultsSectionProps {
  isVisible: boolean;
  content: string;
  isLoading: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ isVisible, content, isLoading }) => {
  if (!isVisible) return null;

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br>');
  };

  const formattedContent = formatContent(content);
  const hasListItems = formattedContent.includes('<li>');
  const finalContent = hasListItems ? `<ul class="list-disc list-inside space-y-2">${formattedContent}</ul>` : formattedContent;

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">AI Evaluation</h2>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 italic">Processing... please wait.</span>
            </div>
          ) : (
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: finalContent }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;