
import React from 'react';

interface HeaderProps {
    coins: number;
    level: number;
    xp: number;
    nextLevelXP: number;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 5a1 1 0 112 0v5.586l1.207-1.207a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 10.586V5z" />
    </svg>
);

const LevelIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ coins, level, xp, nextLevelXP }) => {
    const xpPercentage = (xp / nextLevelXP) * 100;

    return (
        <header className="p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-gray-300/70 dark:bg-gray-900/70 rounded-full px-4 py-2">
                    <LevelIcon />
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-300">
                        LVL {level}
                    </span>
                </div>
                 <div className="flex items-center space-x-2 bg-gray-300/70 dark:bg-gray-900/70 rounded-full px-4 py-2">
                    <CoinIcon />
                    <span className="text-lg font-bold text-yellow-600 dark:text-yellow-300 tracking-wider">
                        {coins.toLocaleString()}
                    </span>
                </div>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${xpPercentage}%` }}
                ></div>
            </div>
        </header>
    );
}
