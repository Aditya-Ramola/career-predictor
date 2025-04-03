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
    <div className="flex items-center justify-between w-full mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            i === currentStep
              ? 'bg-blue-600 text-white'
              : i < currentStep
              ? 'bg-green-500 text-white'
              : 'bg-white/20 text-white'
          }`}>
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`h-1 w-12 sm:w-24 mx-2 ${
              i < currentStep
                ? 'bg-green-500'
                : 'bg-white/20'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

const LoadingAnimation = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md w-full mx-4 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
        </div>
        <div className="text-white text-xl font-medium">Analyzing Your Responses</div>
        <div className="text-white/80 text-sm">Finding the best career matches for you...</div>
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

export default function Home() {
  const [form, setForm] = useState<{ [key: string]: number }>({});
  const [careerMatches, setCareerMatches] = useState<{ career: string; confidence: number }[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const questionsPerStep = 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center p-4 sm:p-8 transition-all duration-500">
      {loading && <LoadingAnimation />}
      
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 text-center animate-fade-in">
          Career Predictor 🚀
        </h1>
        
        {!careerMatches && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-8 shadow-2xl mb-8 transition-all duration-500">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            
            <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute -top-6 right-0 text-white text-sm">
                {Math.round(progress)}%
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6">
                {currentQuestions.map((q) => (
                  <div
                    key={q.key}
                    className={`transform hover:scale-[1.02] transition-all duration-300 ${
                      form[q.key] === undefined ? 'ring-2 ring-blue-400 rounded-xl' : ''
                    }`}
                  >
                    <label className="block text-white text-base sm:text-lg mb-3 font-medium">
                      {q.text}
                      <span className="ml-2 text-sm text-white/60">
                        (Press Y/N to answer)
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, [q.key]: 0 })}
                        className={`px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                          form[q.key] === 0
                            ? "bg-red-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, [q.key]: 1 })}
                        className={`px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                          form[q.key] === 1
                            ? "bg-green-500 text-white"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 mt-6 sm:mt-8">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 text-sm font-medium w-full sm:w-auto"
                  >
                    ← Previous
                  </button>
                )}
                {currentStep < Math.ceil(questions.length / questionsPerStep) - 1 ? (
                  <button
                    type="button"
                    onClick={() => canProceed && setCurrentStep(currentStep + 1)}
                    disabled={!canProceed}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm font-medium w-full sm:w-auto
                      ${canProceed
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600/50 text-white/70 cursor-not-allowed"
                      }`}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || Object.keys(form).length !== questions.length}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm font-medium w-full sm:w-auto
                      ${Object.keys(form).length === questions.length && !loading
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-600/50 text-white/70 cursor-not-allowed"
                      }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          <div className="animate-fade-in bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {careerMatches && !error && careerDetails[careerMatches[0].career] && (
          <div className="animate-fade-in space-y-8">
            {careerMatches.map((match, index) => (
              <div key={match.career} className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-8 shadow-2xl transition-all duration-500 ${index === 0 ? 'ring-4 ring-blue-400' : ''}`}>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {index === 0 && <span className="text-yellow-400 text-2xl">👑</span>}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {index === 0 ? "Best Match" : `Alternative ${index}`}
                    </h2>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-blue-300">{match.career}</h3>
                  <div className="mt-4 flex justify-center items-center gap-2">
                    <div className="text-white text-lg">Match Score:</div>
                    <div className="text-2xl font-bold text-green-400">{match.confidence}%</div>
                  </div>
                </div>

                <div className="grid gap-6 text-white">
                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-blue-200">Description</h4>
                    <p className="text-base sm:text-lg">{careerDetails[match.career].description}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-blue-200">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {careerDetails[match.career].skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-blue-200">Education Path</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {careerDetails[match.career].education.map((edu) => (
                        <li key={edu} className="text-base sm:text-lg">{edu}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-blue-200">Average Salary Range</h4>
                    <p className="text-2xl font-bold text-green-400">
                      {careerDetails[match.career].averageSalary}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  setCareerMatches(null);
                  setForm({});
                  setCurrentStep(0);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 text-lg font-medium"
              >
                Start Over
              </button>
              
              <ShareButton careerMatches={careerMatches} />
            </div>
          </div>
        )}

        <footer className="mt-10 text-white/80 text-center text-sm sm:text-base">
          Made with ❤️ by <span className="font-bold">Aditya Ramola</span>
        </footer>
      </div>
    </div>
  );
}
