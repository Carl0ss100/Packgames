
import React, { useState, useEffect, useMemo } from 'react';
import type { Pack, Player } from '../../types';
import { RarityLevel } from '../../types';
import { generatePlayer } from '../../utils/playerGenerator';
import { PlayerCard } from '../PlayerCard';
import { playSound } from '../../utils/sound';

interface PackOpeningScreenProps {
  pack: Pack;
  onPackFinished: (players: Player[]) => void;
  onClose: () => void;
  collection: Player[];
}

type Step = 'initial' | 'generating' | 'revealing' | 'finished';

const PACK_SIZE = 9;

export const PackOpeningScreen: React.FC<PackOpeningScreenProps> = ({ pack, onPackFinished, onClose, collection }) => {
  const [step, setStep] = useState<Step>('initial');
  const [packPlayers, setPackPlayers] = useState<Player[]>([]);
  const [isHighRarity, setIsHighRarity] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Player | null>(null);

  const highestRarityInPack = useMemo(() => {
    if (packPlayers.length === 0) return null;
    const rarities = packPlayers.map(p => p.rarity.level);
    if (rarities.includes(RarityLevel.Special)) return RarityLevel.Special;
    if (rarities.includes(RarityLevel.Legendary)) return RarityLevel.Legendary;
    return null;
  }, [packPlayers]);

  const handleInitialClick = () => {
    if (step === 'initial') {
      playSound('open');
      setStep('generating');
      
      setTimeout(() => {
        const newPlayers = Array.from({ length: PACK_SIZE }, () => generatePlayer(pack));
        newPlayers.sort((a, b) => b.media - a.media);
        setPackPlayers(newPlayers);
        
        const highRarity = newPlayers.some(p => p.rarity.level === RarityLevel.Legendary || p.rarity.level === RarityLevel.Special);
        setIsHighRarity(highRarity);

        const animationDuration = highRarity ? 1200 : 0;
        
        setTimeout(() => {
            setStep('revealing');
        }, animationDuration);

      }, 1500);
    }
  };

  const handleContinue = () => {
    onPackFinished(packPlayers);
    onClose();
  };
  
  useEffect(() => {
    if (step === 'revealing') {
      const timer = setTimeout(() => {
        setStep('finished');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const renderContent = () => {
    switch (step) {
      case 'initial':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center cursor-pointer group" onClick={handleInitialClick}>
            <div className={`w-48 h-64 sm:w-56 sm:h-80 rounded-2xl bg-gradient-to-br ${pack.color} shadow-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 border-4 border-black/20`}>
              <h2 className="text-3xl font-bold text-white" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>{pack.name}</h2>
            </div>
            <p className="mt-6 text-lg text-gray-300 tracking-wider">Tap to open!</p>
          </div>
        );
      case 'generating':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <div className={`relative w-48 h-64 sm:w-56 sm:h-80 rounded-lg bg-gradient-to-br ${pack.color} shadow-2xl flex items-center justify-center animate-spin-slow overflow-hidden ${isHighRarity ? 'animate-legendary-reveal' : ''}`}>
               <div className="shine-effect"></div>
            </div>
            <p className="mt-6 text-lg animate-pulse tracking-wider">Opening...</p>
          </div>
        );
      case 'revealing':
      case 'finished':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>{pack.name}</h2>
            
            <div className="grid grid-cols-3 gap-4 place-items-center w-full max-w-2xl">
              {packPlayers.map((player, index) => {
                const isDuplicate = collection.some(p => p.nombre === player.nombre);
                return (
                  <div 
                    key={index} 
                    className="w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-40 cursor-pointer transition-transform duration-300 hover:scale-110" 
                    onClick={() => setSelectedCard(player)}
                    style={{animation: `fade-in-up 0.5s ease-out ${index * 0.05}s forwards`, opacity: 0}}
                  >
                    <div className="relative w-full h-full">
                        <PlayerCard player={player} size="small" />
                        {isDuplicate && (
                            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-500 text-black text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full z-20">DUPE</div>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-14 flex items-center justify-center mt-2">
                {step === 'finished' && (
                  <button onClick={handleContinue} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-full transition-colors shadow-lg animate-fade-in-up">
                    Continue
                  </button>
                )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-gray-900 to-gray-800 text-center z-40 animate-screen-fade-in">
      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-screen-fade-in"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="relative w-64 h-96 sm:w-72 sm:h-[28rem] animate-fade-in-up transition-transform duration-300 hover:scale-105" 
            onClick={(e) => e.stopPropagation()}
          >
            <PlayerCard player={selectedCard} />
          </div>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};
