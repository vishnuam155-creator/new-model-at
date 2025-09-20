import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0] || null;
    onFileSelect(file);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="w-full mb-6">
      <div 
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="documentUpload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
        <label htmlFor="documentUpload" className="cursor-pointer flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <span className="text-lg font-medium text-gray-700">
            {selectedFile ? selectedFile.name : 'Upload document'}
          </span>
          <span className="text-sm text-gray-500 mt-2">
            Drag & drop or click to select (PDF, DOC, DOCX)
          </span>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;