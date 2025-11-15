import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calendar, ArrowRight } from 'lucide-react';

interface PersonalInfoPageProps {
  onNext: (name: string, age: number) => void;
}

export function PersonalInfoPage({ onNext }: PersonalInfoPageProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && age) {
      onNext(name.trim(), parseInt(age));
    }
  };

  const isValid = name.trim().length > 0 && age && parseInt(age) >= 12 && parseInt(age) <= 18;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-800 text-3xl mb-2">👋 Welcome to Helka's World!</h1>
          <p className="text-gray-600">Let's get to know you first</p>
          
          {/* Important Notice */}
          <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-blue-800 text-sm">
              ℹ️ <strong>Note:</strong> No information will be saved. This is just for personalizing your game experience!
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <User className="w-5 h-5 text-purple-500" />
              <span>What's your name?</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all text-gray-800"
              maxLength={30}
            />
          </div>

          {/* Age Input */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Calendar className="w-5 h-5 text-pink-500" />
              <span>How old are you?</span>
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age (12-18)"
              min="12"
              max="18"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all text-gray-800"
            />
            <p className="text-gray-500 text-sm mt-1">Ages 12-18 only</p>
          </div>

          {/* Email and Password - DISABLED for faster playtesting */}
          {/* 
          <div className="opacity-50 pointer-events-none">
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Mail className="w-5 h-5 text-blue-500" />
              <span>Parent's Email (Disabled for playtesting)</span>
            </label>
            <input
              type="email"
              disabled
              placeholder="parent@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-100"
            />
          </div>

          <div className="opacity-50 pointer-events-none">
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Lock className="w-5 h-5 text-indigo-500" />
              <span>Password (Disabled for playtesting)</span>
            </label>
            <input
              type="password"
              disabled
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-100"
            />
          </div>
          */}

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
              isValid
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Next Step</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>

        {/* Progress Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-2">Step 1 of 3</p>
      </motion.div>
    </div>
  );
}
