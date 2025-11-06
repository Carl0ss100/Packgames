
import React from 'react';
import type { Theme } from '../../types';

interface SettingsScreenProps {
  onReset: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}


export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onReset, theme, setTheme }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">Settings</h2>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6 shadow-md">
        <h3 className="text-xl font-semibold mb-2">Theme</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose your preferred visual theme.
        </p>
        <div className="flex space-x-2">
            <button 
                onClick={() => setTheme('light')}
                className={`w-full font-bold py-2 px-4 rounded-lg transition-colors ${theme === 'light' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                Light
            </button>
            <button 
                onClick={() => setTheme('dark')}
                className={`w-full font-bold py-2 px-4 rounded-lg transition-colors ${theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                Dark
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-500">Reset Progress</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This will delete all your collected players and reset your coins. This action cannot be undone.
        </p>
        <button
          onClick={onReset}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};
