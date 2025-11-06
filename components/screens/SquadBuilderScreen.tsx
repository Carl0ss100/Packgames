import React, { useState, useMemo } from 'react';
import type { Player, Squad, Formation, SquadPosition } from '../../types';
import { PlayerCard } from '../PlayerCard';
import { PlayerSelectionModal } from '../PlayerSelectionModal';
import { calculateSquadRating, calculateSquadChemistry } from '../../utils/squadUtils';

interface SquadBuilderScreenProps {
  squad: Squad;
  collection: Player[];
  formation: Formation;
  onUpdateSquad: (position: SquadPosition, player: Player) => void;
  onSimulate: () => void;
}

const PositionSlot: React.FC<{
  player: Player | undefined;
  position: SquadPosition;
  onClick: () => void;
}> = ({ player, position, onClick }) => (
  <div onClick={onClick} className="w-16 h-16 sm:w-20 sm:h-20 cursor-pointer transition-transform transform hover:scale-110">
    {player ? (
      <div className="relative text-xs">
          <div className="w-full aspect-[3/4] bg-gray-800 rounded-lg flex flex-col items-center justify-end p-1 text-center shadow-md">
            <div className="absolute top-1 left-1 text-base font-extrabold text-white">{player.media}</div>
            <div className="bg-black/30 backdrop-blur-sm rounded-md px-1 py-0.5">
                <span className="font-bold text-white truncate">{player.nombre.split(' ').pop()}</span>
            </div>
        </div>
      </div>
    ) : (
      <div className="w-full h-full bg-black/30 border-2 border-dashed border-gray-400 rounded-full flex flex-col items-center justify-center">
        <span className="text-white text-xs font-bold">{position}</span>
        <span className="text-white text-xl font-bold">+</span>
      </div>
    )}
  </div>
);

export const SquadBuilderScreen: React.FC<SquadBuilderScreenProps> = ({ squad, collection, formation, onUpdateSquad, onSimulate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<SquadPosition | null>(null);

  const squadRating = useMemo(() => calculateSquadRating(squad, formation), [squad, formation]);
  const squadChemistry = useMemo(() => calculateSquadChemistry(squad, formation), [squad, formation]);

  const handlePositionClick = (position: SquadPosition) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };
  
  const handlePlayerSelect = (player: Player) => {
    if(selectedPosition) {
        onUpdateSquad(selectedPosition, player);
    }
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  const isSquadFull = Object.keys(squad).length === formation.positions.length;

  return (
    <div>
      {isModalOpen && selectedPosition && (
        <PlayerSelectionModal
          collection={collection}
          squad={squad}
          position={selectedPosition}
          onSelect={handlePlayerSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">Squad Builder</h2>
      
      <div className="flex justify-around items-center bg-gray-200 dark:bg-gray-800 p-2 rounded-lg mb-4">
        <div className="text-center">
          <div className="text-xs font-bold text-gray-500">RATING</div>
          <div className="text-2xl font-extrabold">{squadRating}</div>
        </div>
        <div className="text-center">
          <div className="text-xs font-bold text-gray-500">CHEMISTRY</div>
          <div className="text-2xl font-extrabold">{squadChemistry}</div>
        </div>
      </div>

      <div className="relative pitch aspect-[3/4] max-w-full mx-auto rounded-lg p-4 overflow-hidden border-2 border-white/30">
        {formation.positions.map(pos => (
          <div key={pos.id} className="absolute" style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}>
            <PositionSlot player={squad[pos.id]} position={pos.id} onClick={() => handlePositionClick(pos.id)} />
          </div>
        ))}
      </div>

      <div className="mt-4">
          <button
            onClick={onSimulate}
            disabled={!isSquadFull}
            className={`w-full font-bold py-4 px-4 rounded-lg transition-all ${isSquadFull ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
          >
            {isSquadFull ? "Simulate Weekend" : "Complete Your Squad"}
          </button>
      </div>

    </div>
  );
};
