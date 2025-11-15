import { useState } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';

interface CharacterDesignPageProps {
  playerName: string;
  onNext: (characterName: string, avatar: string, gender: string, skinColor: string) => void;
  onBack: () => void;
}

// 6 different character emoji avatars
const AVATAR_OPTIONS = [
  '👨',
  '👩',
  '🧑',
  '👦',
  '👧',
  '🧒',
];

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male', emoji: '♂️' },
  { label: 'Female', value: 'female', emoji: '♀️' },
  { label: 'Non-binary', value: 'non-binary', emoji: '⚧️' },
  { label: 'Other', value: 'other', emoji: '✨' },
];

const SKIN_COLOR_OPTIONS = [
  { label: 'Light', value: 'light', color: '#FFE4C4' },
  { label: 'Medium Light', value: 'medium-light', color: '#F0C89E' },
  { label: 'Medium', value: 'medium', color: '#D4A574' },
  { label: 'Medium Dark', value: 'medium-dark', color: '#C68642' },
  { label: 'Dark', value: 'dark', color: '#8D5524' },
  { label: 'Very Dark', value: 'very-dark', color: '#5C3317' },
];

export function CharacterDesignPage({ playerName, onNext, onBack }: CharacterDesignPageProps) {
  const [characterName, setCharacterName] = useState('Helka');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [selectedGender, setSelectedGender] = useState('female');
  const [selectedSkinColor, setSelectedSkinColor] = useState('medium-light');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (characterName.trim() && selectedAvatar && selectedGender && selectedSkinColor) {
      onNext(characterName.trim(), selectedAvatar, selectedGender, selectedSkinColor);
    }
  };

  const isValid = characterName.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-4"
      >
        {/* Header */}
        <div className="text-center mb-3">
          <h2 className="text-gray-800 mb-1">✨ Design Your Character</h2>
          <p className="text-gray-600 text-xs">Create your avatar, {playerName}!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Character Name & Preview Combined */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1 text-gray-700 mb-1 text-xs">
                <User className="w-3 h-3 text-purple-500" />
                <span>Name</span>
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Character name"
                className="w-full px-2 py-1.5 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all text-gray-800 text-xs"
                maxLength={20}
              />
            </div>
            
            {/* Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border-2 border-purple-200 flex items-center gap-2">
              <div className="text-3xl">{selectedAvatar}</div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-xs truncate">{characterName || 'Preview'}</p>
                <p className="text-gray-600 text-[10px] truncate">
                  {GENDER_OPTIONS.find(g => g.value === selectedGender)?.emoji} {SKIN_COLOR_OPTIONS.find(s => s.value === selectedSkinColor)?.label}
                </p>
              </div>
            </div>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="text-gray-700 mb-1 block text-xs">
              Avatar
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {AVATAR_OPTIONS.map((avatar) => (
                <motion.button
                  key={avatar}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                    selectedAvatar === avatar
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ring-2 ring-purple-300'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="text-gray-700 mb-1 block text-xs">
              Gender
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {GENDER_OPTIONS.map((gender) => (
                <motion.button
                  key={gender.value}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGender(gender.value)}
                  className={`py-1.5 px-2 rounded-lg transition-all ${
                    selectedGender === gender.value
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-lg">{gender.emoji}</div>
                  <div className="text-[10px]">{gender.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Skin Color Selection */}
          <div>
            <label className="text-gray-700 mb-1 block text-xs">
              Skin Tone
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {SKIN_COLOR_OPTIONS.map((skinColor) => (
                <motion.button
                  key={skinColor.value}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkinColor(skinColor.value)}
                  className={`aspect-square rounded-lg transition-all flex items-center justify-center ${
                    selectedSkinColor === skinColor.value
                      ? 'ring-2 ring-purple-500 shadow-lg'
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}
                  style={{ backgroundColor: skinColor.color }}
                >
                  {selectedSkinColor === skinColor.value && (
                    <span className="text-lg">✓</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onBack}
              className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all flex items-center gap-1 text-xs"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!isValid}
              className={`flex-1 py-2 rounded-lg shadow-lg transition-all flex items-center justify-center gap-1 text-xs ${
                isValid
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Next Step</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </div>
        </form>

        {/* Progress Indicator */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        </div>
        <p className="text-center text-gray-500 text-[10px] mt-1">Step 2 of 3</p>
      </motion.div>
    </div>
  );
}