
import React from 'react';

interface DailyRewardModalProps {
  onClaim: () => void;
  amount: number;
  consecutiveDays: number;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 5a1 1 0 112 0v5.586l1.207-1.207a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 10.586V5z" />
    </svg>
);

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({ onClaim, amount, consecutiveDays }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500 rounded-2xl shadow-2xl p-6 text-center animate-fade-in-up w-full max-w-sm">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Daily Reward!</h2>
        <p className="text-gray-300 my-4">Claim your daily reward to keep the fun going!</p>
        <div className="my-6 flex flex-col items-center">
            <CoinIcon />
            <span className="text-4xl font-extrabold text-yellow-300 tracking-tight mt-2">{amount.toLocaleString()}</span>
            {consecutiveDays > 1 && (
                <span className="text-sm font-bold text-green-400 mt-1">{consecutiveDays} Day Streak!</span>
            )}
        </div>
        <button
          onClick={onClaim}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          Claim
        </button>
      </div>
    </div>
  );
};
