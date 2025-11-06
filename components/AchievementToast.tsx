
import React from 'react';
import type { Achievement } from '../types';

interface AchievementToastProps {
  achievement: Achievement;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievement }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-sm z-50 p-4">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl shadow-2xl p-4 flex items-center space-x-4 animate-slide-in-down">
            <div className="bg-white/20 p-2 rounded-full">
                {achievement.icon}
            </div>
            <div>
                <h3 className="font-bold">Achievement Unlocked!</h3>
                <p className="text-sm">{achievement.title}</p>
            </div>
        </div>
    </div>
  );
};
