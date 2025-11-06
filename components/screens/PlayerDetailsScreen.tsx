
import React from 'react';
import type { Player } from '../../types';
import { PlayerCard } from '../PlayerCard';

interface PlayerDetailsScreenProps {
  player: Player;
  onBack: () => void;
  onSell: (playerId: string) => void;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 5a1 1 0 112 0v5.586l1.207-1.207a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 10.586V5z" />
    </svg>
);


export const PlayerDetailsScreen: React.FC<PlayerDetailsScreenProps> = ({ player, onBack, onSell }) => {
  if (!player) {
    return (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="text-center text-white">
                <p>Player not found.</p>
                <button onClick={onBack} className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-full transition-colors">
                    Back to Collection
                </button>
            </div>
        </div>
    );
  }

  const sellPrice = Math.round(player.valor / 2);
  
  const stats = player.stats || {
    goals: 0,
    assists: 0,
    appearances: 0,
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 p-4 flex items-center justify-center">
      <div className="flex flex-col items-center animate-fade-in-up">
          <div className="w-80 aspect-[3/4]">
              <PlayerCard player={player} />
          </div>
          
          <div className="w-full max-w-sm bg-gray-800/50 p-4 rounded-lg mt-6 text-white">
              <h3 className="text-lg font-bold text-center mb-3 text-gray-300">Career Stats</h3>
              <div className="flex justify-around text-center">
                  <div>
                      <p className="text-2xl font-bold">{stats.goals}</p>
                      <p className="text-sm text-gray-400">Goals</p>
                  </div>
                  <div>
                      <p className="text-2xl font-bold">{stats.assists}</p>
                      <p className="text-sm text-gray-400">Assists</p>
                  </div>
                  <div>
                      <p className="text-2xl font-bold">{stats.appearances}</p>
                      <p className="text-sm text-gray-400">Apps</p>
                  </div>
              </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button 
                onClick={() => onSell(player.id)} 
                className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center space-x-2">
                <span>Sell for</span>
                <div className="flex items-center">
                    <CoinIcon />
                    <span className="ml-1">{sellPrice.toLocaleString()}</span>
                </div>
            </button>
            <button 
                onClick={onBack} 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
                Back to Collection
            </button>
          </div>
      </div>
    </div>
  );
};
