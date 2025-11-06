
import React, { useState, useMemo, useEffect } from 'react';
import type { Player } from '../../types';
import { PlayerCard } from '../PlayerCard';
import { RarityLevel } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface CollectionScreenProps {
  collection: Player[];
  onSellPlayer: (playerId: string) => void;
  onCardClick: (player: Player) => void;
  onSellDuplicates: () => void;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.5 5a1 1 0 112 0v5.586l1.207-1.207a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 10.586V5z" />
    </svg>
);


export const CollectionScreen: React.FC<CollectionScreenProps> = ({ collection, onSellPlayer, onCardClick, onSellDuplicates }) => {
  const [newCardIds, setNewCardIds] = useLocalStorage<string[]>('newCardIds', []);
  const [filters, setFilters] = useState({ rarity: '', search: '' });
  const [sortBy, setSortBy] = useState('media');

  useEffect(() => {
    // When a new card is added, this identifies it and adds it to the `newCardIds` list.
    const newIds = collection.filter(p => !newCardIds.includes(p.id)).map(p => p.id);
    if(newIds.length > 0){
        setNewCardIds(prev => [...prev, ...newIds]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection.length]);

  const handleCardClickAndMarkOld = (player: Player) => {
    onCardClick(player);
    if(newCardIds.includes(player.id)) {
        setNewCardIds(prev => prev.filter(id => id !== player.id));
    }
  };


  const filteredAndSortedCollection = useMemo(() => {
    let result = [...collection];

    // Filtering
    if (filters.rarity) {
      result = result.filter(p => p.rarity.level === filters.rarity);
    }
    if (filters.search) {
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.club.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.pais.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'media') return b.media - a.media;
      if (sortBy === 'valor') return b.valor - a.valor;
      return 0;
    });

    return result;
  }, [collection, filters, sortBy]);

  const hasDuplicates = collection.length !== new Set(collection.map(p => p.nombre)).size;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">My Collection</h2>
        {hasDuplicates && (
           <button 
             onClick={onSellDuplicates}
             className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-colors text-sm"
           >
             Sell Duplicates
           </button>
        )}
      </div>
      
      {/* Filters and Sorting */}
      <div className="mb-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg space-y-2">
          <input 
              type="text"
              placeholder="Search by name, club, country..."
              value={filters.search}
              onChange={(e) => setFilters(f => ({...f, search: e.target.value}))}
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
          <div className="flex gap-2">
              <select value={filters.rarity} onChange={(e) => setFilters(f => ({...f, rarity: e.target.value}))} className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
                  <option value="">All Rarities</option>
                  {Object.values(RarityLevel).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
                  <option value="media">Sort by Rating</option>
                  <option value="valor">Sort by Value</option>
              </select>
          </div>
      </div>

      {collection.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-16">
          <p className="text-lg">Your collection is empty.</p>
          <p>Go to the store to buy some packs!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredAndSortedCollection.map(player => {
            const sellPrice = Math.round(player.valor / 2);
            const isNew = newCardIds.includes(player.id);
            return (
                <div key={player.id} className="flex flex-col items-center space-y-2 relative">
                    {isNew && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20 animate-new-banner shadow-lg">
                        NEW!
                      </div>
                    )}
                    <div onClick={() => handleCardClickAndMarkOld(player)} className="cursor-pointer w-full aspect-[3/4]">
                        <PlayerCard player={player} />
                    </div>
                    <button
                        onClick={() => onSellPlayer(player.id)}
                        className="w-full flex items-center justify-center space-x-2 bg-red-700/80 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                        <span>Sell</span>
                        <div className="flex items-center">
                            <CoinIcon />
                            <span>{sellPrice.toLocaleString()}</span>
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
