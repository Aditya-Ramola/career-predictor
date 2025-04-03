"use client";

import { useState, useEffect } from "react";
import { careerDetails } from "./careers";

const BACKEND_URL = "https://career-predictor-six.vercel.app"; // Deployed backend URL

const questions = [
  { key: "Maths", text: "Do you enjoy solving mathematical problems?" },
  { key: "Science", text: "Are you fascinated by scientific discoveries and experiments?" },
  { key: "Creativity", text: "Do you enjoy expressing yourself through creative activities?" },
  { key: "Communication", text: "Are you comfortable speaking in front of groups?" },
  { key: "Tech Interest", text: "Do you keep up with the latest technology trends?" },
  { key: "Analytical Thinking", text: "Do you enjoy breaking down complex problems?" },
  { key: "Leadership", text: "Do you naturally take charge in group situations?" },
  { key: "Writing Skills", text: "Do you enjoy writing and expressing ideas through text?" },
  { key: "Medical Knowledge", text: "Are you interested in human anatomy and health?" },
  { key: "Problem Solving", text: "Do you like finding innovative solutions to challenges?" },
  { key: "Business Acumen", text: "Are you interested in business strategies and markets?" },
  { key: "Passion for Teaching", text: "Do you enjoy explaining concepts to others?" },
  { key: "Interest in Law", text: "Are you interested in legal systems and justice?" },
  { key: "Musical Talent", text: "Do you have a good sense of rhythm and melody?" },
  { key: "Empathy", text: "Can you easily understand others' emotions?" },
  { key: "Visual Arts", text: "Do you enjoy drawing, painting, or digital design?" },
  { key: "Physical Activity", text: "Do you prefer active, hands-on work?" },
  { key: "Research", text: "Do you enjoy gathering and analyzing information?" },
  { key: "Nature Interest", text: "Are you passionate about environment and nature?" },
  { key: "Technical Skills", text: "Are you good at working with tools and machines?" },
  { key: "Social Service", text: "Do you feel motivated to help others?" },
  { key: "Organization", text: "Are you good at planning and organizing?" },
  { key: "Innovation", text: "Do you often think of new ideas or approaches?" },
  { key: "Detail Oriented", text: "Do you pay close attention to details?" },
  { key: "Public Speaking", text: "Are you comfortable addressing large audiences?" },
  { key: "Data Analysis", text: "Do you enjoy working with data and statistics?" },
  { key: "Project Management", text: "Can you effectively coordinate multiple tasks?" },
  { key: "Customer Service", text: "Do you enjoy helping and serving customers?" },
  { key: "Design Thinking", text: "Do you have an eye for aesthetics and design?" },
  { key: "Financial Interest", text: "Are you interested in finance and investments?" },
  { key: "Language Skills", text: "Are you good at learning new languages?" },
  { key: "Team Collaboration", text: "Do you work well in team environments?" },
  { key: "Critical Thinking", text: "Do you question assumptions and analyze arguments?" },
  { key: "Entrepreneurial", text: "Are you interested in starting your own business?" },
  { key: "Digital Skills", text: "Are you proficient with digital tools and software?" },
  { key: "Mechanical Aptitude", text: "Do you understand how machines and systems work?" },
  { key: "Sales Ability", text: "Are you good at persuading others?" },
  { key: "Scientific Method", text: "Do you enjoy conducting experiments?" },
  { key: "Artistic Expression", text: "Do you have a strong creative vision?" },
  { key: "Risk Taking", text: "Are you comfortable taking calculated risks?" },
  { key: "Adaptability", text: "Can you easily adapt to new situations?" },
  { key: "Strategic Thinking", text: "Do you excel at long-term planning?" },
  { key: "Cultural Awareness", text: "Are you interested in different cultures?" },
  { key: "Problem Diagnosis", text: "Are you good at identifying root causes?" },
  { key: "Resource Management", text: "Can you efficiently manage resources?" },
  { key: "Emotional Intelligence", text: "Can you manage your emotions effectively?" },
  { key: "Spatial Awareness", text: "Are you good at visualizing in 3D?" },
  { key: "Time Management", text: "Are you good at managing your time?" },
  { key: "Conflict Resolution", text: "Are you good at resolving disagreements?" },
  { key: "Learning Agility", text: "Do you learn new skills quickly?" }
];

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center justify-between w-full mb-6 overflow-x-auto px-2 py-1 -mx-2 scrollbar-hide">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center flex-shrink-0">
          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
            i === currentStep
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : i < currentStep
              ? 'bg-indigo-500/50 text-white'
              : 'bg-gray-800 text-gray-400'
          }`}>
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`h-0.5 w-4 sm:w-12 md:w-24 mx-1 sm:mx-2 ${
              i < currentStep
                ? 'bg-indigo-500/50'
                : 'bg-gray-800'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

const InitialLoadingScreen = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showContent) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-lg mx-auto p-4">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur animate-pulse"></div>
            <h1 className="relative bg-gray-900 rounded-lg px-8 py-4">
              <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
                Career Predictor
              </span>
            </h1>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-t-4 border-purple-500 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border-t-4 border-pink-500 animate-spin-slower"></div>
            </div>
          </div>

          <div className="mt-8 relative">
            <div className="text-gray-400 text-sm sm:text-base animate-pulse">
              Made with <span className="text-red-400">❤️</span> by
            </div>
            <div className="text-lg sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
              Aditya Ramola
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingAnimation = () => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full mx-4 text-center border border-gray-800">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-300/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
        </div>
        <div className="text-white text-lg font-medium">Analyzing Responses</div>
        <div className="text-gray-400 text-sm">Finding your ideal career path...</div>
      </div>
    </div>
  </div>
);

const ShareButton = ({ careerMatches }: { careerMatches: { career: string; confidence: number }[] }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `🎯 My Career Predictor Results:\n\n${careerMatches.map((match, i) => 
    `${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} ${match.career} (${match.confidence}% match)`
  ).join('\n')}\n\nTry it yourself!`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Career Prediction Results',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-medium"
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <span>📤</span>
          <span>Share Results</span>
        </>
      )}
    </button>
  );
};

const useSound = () => {
  const playClick = () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/click.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
  };

  const playSuccess = () => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/success.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
  };

  return { playClick, playSuccess };
};

const KeyboardShortcuts = () => (
  <div className="fixed bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-400 border border-gray-700/50 hidden sm:block">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Y</kbd>
        <span>for Yes</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">N</kbd>
        <span>for No</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">←</kbd>
        <span>Previous</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">→</kbd>
        <span>Next</span>
      </div>
    </div>
  </div>
);

const ResultCard = ({ match, index, isExpanded, onToggle }: { 
  match: { career: string; confidence: number }; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const career = careerDetails[match.career];
  const [showSkillDetails, setShowSkillDetails] = useState(false);

  return (
    <div className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl transition-all duration-500 border ${
      index === 0 ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-gray-700/50'
    }`}>
      <div className="p-4 sm:p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            {index === 0 && (
              <div className="relative">
                <span className="text-yellow-400 text-xl sm:text-2xl animate-bounce-slow">👑</span>
                <div className="absolute -inset-2 rounded-full bg-yellow-400/20 animate-pulse"></div>
              </div>
            )}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-400">
              {index === 0 ? "Best Match" : `Alternative ${index}`}
            </h2>
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{match.career}</h3>
          
          <div className="relative inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30">
            <div 
              className="absolute left-0 top-0 bottom-0 rounded-full bg-indigo-600/20" 
              style={{ width: `${match.confidence}%` }}
            />
            <span className="relative text-gray-300 text-sm sm:text-base mr-2">Match Score:</span>
            <span className="relative text-lg sm:text-xl font-bold text-indigo-400">{match.confidence}%</span>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8">
          <div className="space-y-2">
            <h4 className="text-lg sm:text-xl font-semibold text-indigo-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Description
            </h4>
            <p className="text-sm sm:text-base md:text-lg text-gray-300">{career.description}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg sm:text-xl font-semibold text-indigo-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Required Skills
              </h4>
              <button 
                onClick={() => setShowSkillDetails(!showSkillDetails)}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {showSkillDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            <div className="grid gap-2">
              {career.skills.map((skill, idx) => (
                <div 
                  key={skill}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    showSkillDetails ? 'bg-gray-700/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 p-2">
                    <div className={`w-2 h-2 rounded-full ${
                      idx < 3 ? 'bg-green-400' : idx < 6 ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm sm:text-base text-gray-300">{skill}</span>
                    {showSkillDetails && (
                      <div className="ml-auto text-xs text-gray-400">
                        {idx < 3 ? 'Core Skill' : idx < 6 ? 'Important' : 'Beneficial'}
                      </div>
                    )}
                  </div>
                  {showSkillDetails && (
                    <div className="h-1 bg-gray-600/50">
                      <div 
                        className={`h-full ${
                          idx < 3 ? 'bg-green-400' : idx < 6 ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}
                        style={{ width: `${100 - (idx * 10)}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg sm:text-xl font-semibold text-indigo-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Education Path
            </h4>
            <div className="space-y-2">
              {career.education.map((edu, idx) => (
                <div 
                  key={edu}
                  className="flex items-start gap-3 p-2 rounded-lg bg-gray-700/30 border border-gray-600/30"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs text-indigo-400">
                    {idx + 1}
                  </div>
                  <span className="text-sm sm:text-base text-gray-300">{edu}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg sm:text-xl font-semibold text-indigo-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Salary Range
            </h4>
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
              <span className="text-xl sm:text-2xl font-bold text-green-400">
                {career.averageSalary}
              </span>
            </div>
          </div>

          {isExpanded && (
            <>
              <div className="space-y-3">
                <h4 className="text-lg sm:text-xl font-semibold text-indigo-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Career Growth
                </h4>
                <div className="grid gap-2">
                  <div className="p-3 rounded-lg bg-gray-700/30 border border-gray-600/30">
                    <div className="text-sm font-medium text-indigo-400 mb-1">Entry Level</div>
                    <div className="text-sm text-gray-300">Start with junior positions, focusing on fundamental skills and gaining practical experience.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-700/30 border border-gray-600/30">
                    <div className="text-sm font-medium text-indigo-400 mb-1">Mid Career</div>
                    <div className="text-sm text-gray-300">Progress to senior roles with increased responsibilities and specialized expertise.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-700/30 border border-gray-600/30">
                    <div className="text-sm font-medium text-indigo-400 mb-1">Advanced</div>
                    <div className="text-sm text-gray-300">Lead teams, manage projects, or become a subject matter expert in your field.</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg sm:text-xl font-semibold text-indigo-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Key Success Factors
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Continuous Learning",
                    "Problem Solving",
                    "Communication",
                    "Adaptability",
                    "Time Management",
                    "Team Collaboration"
                  ].map((factor) => (
                    <div 
                      key={factor}
                      className="p-2 rounded-lg bg-gray-700/30 border border-gray-600/30 text-sm text-gray-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {factor}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <button
        onClick={onToggle}
        className="w-full p-3 border-t border-gray-700/50 text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center gap-1"
      >
        {isExpanded ? (
          <>
            Show Less
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </>
        ) : (
          <>
            Show More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

const FunResultPage = ({ type, onStartOver }: { 
  type: 'all-no' | 'all-yes';
  onStartOver: () => void;
}) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (type === 'all-no') {
    return (
      <div className="animate-fade-in text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl animate-pulse"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 border border-red-500/30">
            <div className="text-6xl mb-6 animate-bounce">🤦‍♂️</div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text px-4 py-2">
              आपका तो कुछ नहीं हो सकता!
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6">
              (Aapka toh kuch nahi ho sakta!)
            </p>
            <div className="space-y-4 text-left max-w-lg mx-auto mb-8">
              <div className="bg-gray-700/50 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Career Crisis Alert!</span>
                </div>
                <p className="text-gray-300">Looks like you've mastered the art of saying "No" to everything! 😅</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border border-orange-500/20">
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-medium">Pro Tip:</span>
                </div>
                <p className="text-gray-300">Maybe try saying "Yes" to something... Anything... Just once? 🙏</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg border border-yellow-500/20">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">Fun Fact:</span>
                </div>
                <p className="text-gray-300">Even a potato eventually grows something! 🥔✨</p>
              </div>
            </div>
            <button
              onClick={onStartOver}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 active:scale-95 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg shadow-red-500/25"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Start Over
            </button>
          </div>
        </div>
        <div className="relative animate-float">
          <img 
            src="/meme-no.gif" 
            alt="Funny meme"
            className="rounded-lg shadow-2xl mx-auto max-w-sm"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-center space-y-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Add confetti effect here */}
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500/20 blur-3xl animate-pulse"></div>
        <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-10 border border-indigo-500/30">
          <div className="text-6xl mb-6 animate-bounce">👑</div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text px-4 py-2">
            आप तो बहुत महान हो!
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6">
            (Aap toh bahut mahan ho!)
          </p>
          <div className="space-y-4 text-left max-w-lg mx-auto mb-8">
            <div className="bg-gray-700/50 p-4 rounded-lg border border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-medium">Achievement Unlocked!</span>
              </div>
              <p className="text-gray-300">You've achieved the impossible - saying "Yes" to everything! You're either extremely talented or... extremely optimistic! 🌟</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-medium">Career Forecast:</span>
              </div>
              <p className="text-gray-300">With your incredible range of skills, you could be anything from a rocket scientist to a unicorn trainer! 🚀🦄</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg border border-pink-500/20">
              <div className="flex items-center gap-2 text-pink-400 mb-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Reality Check:</span>
              </div>
              <p className="text-gray-300">Even superheroes need to focus on something specific! Maybe try being a bit more selective? 😉</p>
            </div>
          </div>
          <button
            onClick={onStartOver}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 active:scale-95 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg shadow-indigo-500/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </button>
        </div>
      </div>
      <div className="relative animate-float">
        <img 
          src="/meme-yes.gif" 
          alt="Celebration meme"
          className="rounded-lg shadow-2xl mx-auto max-w-sm"
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [form, setForm] = useState<{ [key: string]: number }>({});
  const [careerMatches, setCareerMatches] = useState<{ career: string; confidence: number }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const questionsPerStep = 10;
  const { playClick, playSuccess } = useSound();
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedCards, setExpandedCards] = useState<number[]>([0]); // First card expanded by default

  const handleAnswer = (key: string, value: number) => {
    playClick();
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    playSuccess();

    // Check for all No's or all Yes's
    const answers = Object.values(form);
    const allNo = answers.length === questions.length && answers.every(a => a === 0);
    const allYes = answers.length === questions.length && answers.every(a => a === 1);

    if (allNo || allYes) {
      setCareerMatches([{ 
        career: allNo ? 'Nothing' : 'Everything',
        confidence: allNo ? 0 : 100 
      }]);
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting form data:", form);
      console.log("Number of answers:", Object.keys(form).length);
      
      const res = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(form),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to get prediction. Please try again.");
      }
      
      setCareerMatches(data.matches);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Detailed error:", error);
      console.error("Error type:", error.constructor.name);
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
      setError(error.message || "An unexpected error occurred");
      setCareerMatches(null);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestions = questions.slice(
    currentStep * questionsPerStep,
    (currentStep + 1) * questionsPerStep
  );

  const progress = (Object.keys(form).length / questions.length) * 100;
  const canProceed = currentQuestions.every((q) => form[q.key] !== undefined);

  const totalSteps = Math.ceil(questions.length / questionsPerStep);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!careerMatches) {
        const currentQuestion = currentQuestions[
          currentQuestions.findIndex(q => form[q.key] === undefined)
        ];
        
        if (currentQuestion) {
          if (e.key === "n" || e.key === "N") {
            setForm({ ...form, [currentQuestion.key]: 0 });
          } else if (e.key === "y" || e.key === "Y") {
            setForm({ ...form, [currentQuestion.key]: 1 });
          }
        }
        
        // Navigate between steps
        if (e.key === "ArrowLeft" && currentStep > 0) {
          setCurrentStep(currentStep - 1);
        } else if (e.key === "ArrowRight" && canProceed && currentStep < totalSteps - 1) {
          setCurrentStep(currentStep + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [form, currentQuestions, currentStep, canProceed, totalSteps, careerMatches]);

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleStartOver = () => {
    setCareerMatches(null);
    setForm({});
    setCurrentStep(0);
    setExpandedCards([0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-3 sm:p-4 md:p-8 transition-all duration-500">
      <InitialLoadingScreen />
      {loading && <LoadingAnimation />}
      <KeyboardShortcuts />
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Add confetti effect here if you want to use a confetti library */}
        </div>
      )}
      
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center animate-fade-in">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Career Predictor
          </span>
          <span className="text-indigo-400"> AI</span> 🚀
        </h1>
        
        {!careerMatches && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-3 sm:p-4 md:p-8 shadow-2xl mb-6 sm:mb-8 transition-all duration-500 border border-gray-700/50">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            
            <div className="relative w-full h-1.5 bg-gray-800 rounded-full mb-6">
              <div
                className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute -top-6 right-0 text-gray-400 text-xs sm:text-sm">
                {Math.round(progress)}%
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                {currentQuestions.map((q) => (
                  <div
                    key={q.key}
                    className={`transform transition-all duration-300 rounded-xl bg-gray-800/50 p-4 sm:p-5 border ${
                      form[q.key] === undefined ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-gray-700/50'
                    }`}
                  >
                    <label className="block text-gray-200 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 font-medium">
                      {q.text}
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.key, 0)}
                        className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${
                          form[q.key] === 0
                            ? "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                            : "bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700 active:scale-95"
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {form[q.key] === 0 && (
                            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          No
                        </span>
                        {form[q.key] === 0 && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-red-600/20 animate-gradient"></div>
                            <div className="absolute inset-0 opacity-25 bg-gradient-to-r from-rose-500 to-red-600 animate-pulse"></div>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.key, 1)}
                        className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${
                          form[q.key] === 1
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                            : "bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700 active:scale-95"
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {form[q.key] === 1 && (
                            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          Yes
                        </span>
                        {form[q.key] === 1 && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-600/20 animate-gradient"></div>
                            <div className="absolute inset-0 opacity-25 bg-gradient-to-r from-emerald-500 to-green-600 animate-pulse"></div>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-300 text-sm font-medium w-full sm:w-auto border border-gray-700"
                  >
                    ← Previous
                  </button>
                )}
                {currentStep < Math.ceil(questions.length / questionsPerStep) - 1 ? (
                  <button
                    type="button"
                    onClick={() => canProceed && setCurrentStep(currentStep + 1)}
                    disabled={!canProceed}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 text-sm font-medium w-full sm:w-auto
                      ${canProceed
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || Object.keys(form).length !== questions.length}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 text-sm font-medium w-full sm:w-auto
                      ${Object.keys(form).length === questions.length && !loading
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </span>
                    ) : (
                      "Get Your Career Path"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {error && (
          <div className="animate-fade-in bg-red-500/10 border border-red-500/30 text-red-400 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        {careerMatches && !error && (
          careerMatches[0].career === 'Nothing' ? (
            <FunResultPage type="all-no" onStartOver={handleStartOver} />
          ) : careerMatches[0].career === 'Everything' ? (
            <FunResultPage type="all-yes" onStartOver={handleStartOver} />
          ) : (
            <div className="animate-fade-in space-y-6 sm:space-y-8">
              {careerMatches.map((match, index) => (
                <ResultCard
                  key={match.career}
                  match={match}
                  index={index}
                  isExpanded={expandedCards.includes(index)}
                  onToggle={() => toggleCardExpansion(index)}
                />
              ))}

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={handleStartOver}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 active:scale-95 transition-all duration-300 text-sm sm:text-base font-medium border border-gray-700"
                >
                  Start Over
                </button>
                
                <ShareButton careerMatches={careerMatches} />
              </div>
            </div>
          )
        )}

        <footer className="mt-8 sm:mt-10 text-gray-500 text-center text-xs sm:text-sm">
          Made with <span className="text-red-400">❤️</span> by <span className="font-medium text-gray-400">Aditya Ramola</span>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        .animate-spin-slower {
          animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-bounce {
          animation: bounce 0.5s ease-in-out;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25%); }
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
