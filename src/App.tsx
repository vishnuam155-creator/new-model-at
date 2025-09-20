import React, { useState } from 'react';
import Navigation from './components/Navigation';
import TypingText from './components/TypingText';
import FileUpload from './components/FileUpload';
import JobDescriptionToggle from './components/JobDescriptionToggle';
import ResultsSection from './components/ResultsSection';
import LoginWarningModal from './components/LoginWarningModal';
import UpgradeLimitModal from './components/UpgradeLimitModal';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import { UsageData } from './types/auth';

const API_BASE = "http://127.0.0.1:8000"; // change when deployed

function App() {
  const { authState } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'with_jd' | 'without_jd'>('with_jd');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [resultContent, setResultContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const heroText = "Stop getting lost in the resume black hole. Our AI-powered ATS Resume Checker and Builder helps you craft a professional resume that gets noticed by recruiters";

  const handleModeChange = (newMode: 'with_jd' | 'without_jd') => {
    setMode(newMode);
    if (newMode === 'with_jd') {
      setCompanyName('');
    } else {
      setJobDescription('');
    }
  };

  const checkUsageLimit = async (): Promise<UsageData | null> => {
    try {
      const response = await fetch(`${API_BASE}/resume_checker/`, {
        method: "GET",
        headers: authState.authToken ? { Authorization: `Token ${authState.authToken}` } : {},
        credentials: "include"
      });
      return await response.json();
    } catch (error) {
      console.error('Error checking usage:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent, action: string = 'percentage') => {
    e.preventDefault();

    // Validation
    if (!selectedFile) {
      alert("⚠️ Please upload a document before submitting.");
      return;
    }
    if (mode === 'with_jd' && !jobDescription.trim()) {
      alert("⚠️ Please paste the Job Description before submitting.");
      return;
    }
    if (mode === 'without_jd' && !companyName.trim()) {
      alert("⚠️ Please enter the Post/Job details before submitting.");
      return;
    }

    // Check usage limits
    const usageData = await checkUsageLimit();
    if (!usageData) {
      alert("Error checking usage limits. Please try again.");
      return;
    }

    if (usageData.error) {
      alert(usageData.error);
      return;
    }

    if (!authState.isAuthenticated) {
      // User is not logged in → show login warning after free uploads
      if (usageData.uploads_used >= usageData.limit) {
        setShowLoginWarning(true);
        return;
      }
    } else {
      // User is logged in → show professional popup when plan limit reached
      if (usageData.uploads_used >= usageData.limit) {
        setShowUpgradeModal(true);
        return;
      }
    }

    // Submit form
    setIsLoading(true);
    setResultContent("Processing... please wait.");
    setShowResults(true);

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('mode', mode);
      formData.append('action', action);
      
      if (mode === 'with_jd') {
        formData.append('job_desc', jobDescription);
      } else {
        formData.append('company_name', companyName);
      }

      const response = await fetch(`${API_BASE}/resume_checker/`, {
        method: "POST",
        headers: authState.authToken ? { Authorization: `Token ${authState.authToken}` } : {},
        body: formData,
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        setResultContent(data.response);
      } else {
        setResultContent(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      setResultContent("Error: Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = () => {
    window.location.href = './resume_maker.html';
  };

  const handleUpgrade = () => {
    window.location.href = './subscription.html';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Document Upload and Job Description
          </h1>
          <TypingText text={heroText} speed={50} className="text-lg max-w-4xl mx-auto leading-relaxed" />
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={(e) => handleSubmit(e, 'percentage')}>
            <FileUpload 
              selectedFile={selectedFile} 
              onFileSelect={setSelectedFile} 
            />
            
            <div className="space-y-6">
              <JobDescriptionToggle mode={mode} onModeChange={handleModeChange} />
              
              {mode === 'with_jd' ? (
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste JD"
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Post Name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleCreateResume}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Create Resume
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit
                </button>
              </div>
              
              <p className="text-center text-gray-600 text-sm">
                If Resume Score below 70% Create New Resume
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Results Section */}
      <ResultsSection 
        isVisible={showResults}
        content={resultContent}
        isLoading={isLoading}
      />

      {/* Modals */}
      <LoginWarningModal 
        isOpen={showLoginWarning}
        onClose={() => setShowLoginWarning(false)}
      />
      
      <UpgradeLimitModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />

      <Footer />
    </div>
  );
}

export default App;