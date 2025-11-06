import React from 'react';
import type { Pack, Screen } from '../../types';
import { PACKS } from '../../constants';

interface StoreScreenProps {
  onPackPurchase: (pack: Pack) => void;
  userLevel: number;
  navigate: (screen: Screen) => void;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 5a1 1 0 112 0v5.586l1.207-1.207a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 10.586V5z" />
    </svg>
);

const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
);

export const StoreScreen: React.FC<StoreScreenProps> = ({ onPackPurchase, userLevel, navigate }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">Store</h2>
      
      <div className="mb-6">
         <button
            onClick={() => navigate('MARKET')}
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Go to Player Market
          </button>
      </div>

      <div className="space-y-4">
        {PACKS.map(pack => {
            const isLocked = pack.requiredLevel && userLevel < pack.requiredLevel;

            return (
              <div key={pack.id} className={`p-4 rounded-lg shadow-lg flex flex-col items-center text-center bg-gradient-to-br ${pack.color} ${isLocked ? 'opacity-60' : ''}`}>
                <h3 className="text-2xl font-bold">{pack.name}</h3>
                <p className="text-gray-200 mb-4">{pack.description}</p>
                {isLocked ? (
                    <div className="flex items-center justify-center space-x-2 bg-gray-900/50 text-white font-bold py-2 px-6 rounded-full">
                        <LockIcon />
                        <span className="text-lg">Unlocks at Level {pack.requiredLevel}</span>
                    </div>
                ) : (
                    <button
                        onClick={() => onPackPurchase(pack)}
                        className="flex items-center justify-center space-x-2 bg-gray-900/50 hover:bg-gray-900/80 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                        <CoinIcon />
                        <span className="text-lg">{pack.cost.toLocaleString()}</span>
                    </button>
                )}
              </div>
            )
        })}
      </div>
    </div>
  );
};