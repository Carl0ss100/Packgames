
import React from 'react';
import type { Player } from '../../types';
import { PlayerCard } from '../PlayerCard';

interface MarketScreenProps {
  marketPlayers: Player[];
  onBuyPlayer: (player: Player) => void;
  coins: number;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
    </svg>
);


export const MarketScreen: React.FC<MarketScreenProps> = ({ marketPlayers, onBuyPlayer, coins }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Player Market</h2>
      {marketPlayers.length === 0 ? (
        <div className="text-center text-gray-400 mt-16">
          <p className="text-lg">The market is currently empty.</p>
          <p>Check back later for new players!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {marketPlayers.map(player => {
            const buyPrice = player.valor;
            const canAfford = coins >= buyPrice;
            return (
                <div key={player.id} className="flex flex-col items-center space-y-2">
                    <div className="w-full aspect-[3/4]">
                      <PlayerCard player={player} />
                    </div>
                    <button
                        onClick={() => onBuyPlayer(player)}
                        disabled={!canAfford}
                        className={`w-full flex items-center justify-center space-x-2 font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                            canAfford 
                            ? 'bg-green-800/80 hover:bg-green-700 text-white' 
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <span>Buy</span>
                        <div className="flex items-center">
                            <CoinIcon />
                            <span>{buyPrice.toLocaleString()}</span>
                        </div>
                    </button>
                </div>
            )
          })}
        </div>
      )}
    </div>
  );
};
