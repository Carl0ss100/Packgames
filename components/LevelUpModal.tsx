
import React from 'react';

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, onClose }) => {
  const reward = level * 500;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500 rounded-2xl shadow-2xl p-6 text-center animate-fade-in-up w-full max-w-sm">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Level Up!</h2>
        <p className="text-gray-300 my-4">Congratulations! You've reached</p>
        <div className="my-6 flex flex-col items-center">
            <span className="text-6xl font-extrabold text-white tracking-tight">Level {level}</span>
            <span className="text-lg font-bold text-yellow-300 mt-4">Reward: {reward.toLocaleString()} Coins</span>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
