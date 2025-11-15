import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { testQuestions } from '../data/testQuestions';

interface QuizPageProps {
  playerName: string;
  onComplete: (answers: Record<string, string>, totalScore: number, storylineTitle: string) => void;
  onBack: () => void;
}

export function QuizPage({ playerName, onComplete, onBack }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = testQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === testQuestions.length - 1;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;
  const totalQuestions = testQuestions.length;

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate total score from all answers
      let totalScore = 0;
      Object.entries(answers).forEach(([questionId, optionId]) => {
        const question = testQuestions.find(q => q.id === questionId);
        const option = question?.options.find(opt => opt.id === optionId);
        if (option) {
          totalScore += option.score;
        }
      });

      // ============================================
      // STORYLINE TITLE ASSIGNMENT BASED ON QUIZ SCORE
      // ============================================
      // The "storylineTitle" is determined by the total score from the Quiz.
      // Each of the 8 questions has options scored 0-3, so:
      // - Maximum possible score: 8 questions × 3 = 24 points
      // - Minimum possible score: 8 questions × 0 = 0 points
      //
      // Score ranges and their corresponding titles:
      // - 0-6 points: "From Rags to Riches" (poor/struggling financial background)
      // - 7-12 points: "Bohemian Life" (free-spirited, flexible lifestyle)
      // - 13-18 points: "Entrepreneur" (balanced, ambitious, strategic)
      // - 19-24 points: "Easy Life Looking for Adventure" (wealthy, stable background)
      //
      // This title is displayed on the Graduation Page and represents the
      // player's unique starting storyline based on their background and attitudes.
      // ============================================
      
      let storylineTitle = '';
      if (totalScore >= 0 && totalScore <= 6) {
        storylineTitle = 'From Rags to Riches';
      } else if (totalScore >= 7 && totalScore <= 12) {
        storylineTitle = 'Bohemian Life';
      } else if (totalScore >= 13 && totalScore <= 18) {
        storylineTitle = 'Entrepreneur';
      } else if (totalScore >= 19 && totalScore <= 24) {
        storylineTitle = 'Easy Life Looking for Adventure';
      }

      onComplete(answers, totalScore, storylineTitle);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-gray-800 mb-2">📋 Background Quiz</h2>
          <p className="text-gray-600">
            Hi {playerName}! Answer these questions to personalize your financial journey.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-4 border-2 border-purple-200">
            <p className="text-gray-800 text-center">
              {currentQuestion.text}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-white bg-white' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      )}
                    </div>
                    <span className="flex-1">{option.text}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrevious}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: hasAnsweredCurrent ? 1.02 : 1 }}
            whileTap={{ scale: hasAnsweredCurrent ? 0.98 : 1 }}
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              hasAnsweredCurrent
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{isLastQuestion ? 'Complete Quiz' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index < currentQuestionIndex + 1
                  ? 'w-8 bg-purple-500'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs mt-2">Step 3 of 4 - Background Quiz</p>
      </motion.div>
    </div>
  );
}
