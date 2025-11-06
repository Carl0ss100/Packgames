
import React, { useMemo } from 'react';
import type { Player, Squad, SquadPosition } from '../../types';
import { POSITION_MAP } from '../../constants';

interface PlayerSelectionModalProps {
    collection: Player[];
    squad: Squad;
    position: SquadPosition;
    onSelect: (player: Player) => void;
    onClose: () => void;
}

export const PlayerSelectionModal: React.FC<PlayerSelectionModalProps> = ({ collection, squad, position, onSelect, onClose }) => {
    
    const eligiblePlayers = useMemo(() => {
        const generalPosition = Object.keys(POSITION_MAP).find(key => POSITION_MAP[key].includes(position));
        
        // Get the names of all players currently in other squad positions.
        // This prevents selecting a player who is already on the team in a different slot,
        // but allows re-selecting the same player or a different version of them for the current slot.
        const playerNamesInOtherPositions = new Set(
            Object.entries(squad)
                .filter(([pos, player]) => player && pos !== position) // Filter for players in other positions
                .map(([, player]) => player!.nombre)
        );

        return collection
            .filter(p => !playerNamesInOtherPositions.has(p.nombre)) // Player name is not in another position
            .filter(p => p.posicion === generalPosition) // Matches the general position type (DEF, MED, etc.)
            .sort((a,b) => b.media - a.media); // Sort by rating
    }, [collection, squad, position]);
    

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 w-full max-w-md h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Select a Player for {position}</h2>
                    <button onClick={onClose} className="text-white font-bold text-2xl">&times;</button>
                </div>
                <div className="flex-1 overflow-y-auto pr-2">
                    {eligiblePlayers.length > 0 ? (
                         <ul className="space-y-2">
                            {eligiblePlayers.map(player => (
                                <li key={player.id} onClick={() => onSelect(player)} className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer bg-gray-700 hover:bg-purple-800 transition-colors">
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-white text-xl ${player.rarity.color}`}>
                                        {player.media}
                                    </div>
                                    <div>
                                        <p className="font-bold">{player.nombre}</p>
                                        <p className="text-sm text-gray-400">{player.club}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-400 py-10">
                            No eligible players in your collection for this position.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};