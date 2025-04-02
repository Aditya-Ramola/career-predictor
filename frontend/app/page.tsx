"use client";

import { useState } from "react";
import { careerDetails } from "./careers";

const BACKEND_URL = "https://career-predictor-9n26.vercel.app"; // Update this with your backend URL

const questions = [
  { key: "Maths", text: "Do you like Maths?" },
  { key: "Science", text: "Are you interested in Science?" },
  { key: "Creativity", text: "Are you creative?" },
  { key: "Communication", text: "Do you have good communication skills?" },
  { key: "Tech Interest", text: "Are you interested in technology?" },
  { key: "Analytical Thinking", text: "Do you like solving analytical problems?" },
  { key: "Leadership", text: "Do you have leadership qualities?" },
  { key: "Writing Skills", text: "Are you good at writing?" },
  { key: "Medical Knowledge", text: "Do you have interest in medical field?" },
  { key: "Problem Solving", text: "Are you good at problem solving?" },
  { key: "Business Acumen", text: "Are you interested in business?" },
  { key: "Passion for Teaching", text: "Do you like teaching others?" },
  { key: "Interest in Law", text: "Do you like legal studies?" },
  { key: "Musical Talent", text: "Do you play any musical instrument?" },
  { key: "Empathy", text: "Do you understand and care about others' feelings?" },
];

export default function Home() {
  const [form, setForm] = useState<{ [key: string]: number }>({});
  const [career, setCareer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const questionsPerStep = 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to get prediction. Please try again.");
      const data = await res.json();
      setCareer(data.career);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
      setCareer(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center p-4 sm:p-8 transition-all duration-500">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 text-center animate-fade-in">
          Career Predictor 🚀
        </h1>
        
        {!career && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-8 shadow-2xl mb-8 transition-all duration-500">
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
                    className="transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <label className="block text-white text-base sm:text-lg mb-3 font-medium">
                      {q.text}
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

        {career && !error && careerDetails[career] && (
          <div className="animate-fade-in bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your Ideal Career</h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-300">{career}</h3>
            </div>

            <div className="grid gap-6 text-white">
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-blue-200">Description</h4>
                <p className="text-base sm:text-lg">{careerDetails[career].description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-blue-200">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {careerDetails[career].skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-600/30 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-blue-200">Education Path</h4>
                <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                  {careerDetails[career].education.map((edu) => (
                    <li key={edu}>{edu}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-blue-200">Average Salary Range</h4>
                <p className="text-xl sm:text-2xl font-semibold text-green-300">
                  {careerDetails[career].averageSalary}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setCareer(null);
                setForm({});
                setCurrentStep(0);
              }}
              className="w-full px-6 py-3 mt-8 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 text-sm sm:text-base font-medium"
            >
              Start Over
            </button>
          </div>
        )}

        <footer className="mt-10 text-white/80 text-center text-sm sm:text-base">
          Made with ❤️ by <span className="font-bold">Aditya Ramola</span>
        </footer>
      </div>
    </div>
  );
}
