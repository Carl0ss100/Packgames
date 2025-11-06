
import React from 'react';
import type { Player, PlayerData } from '../../types';

interface AlbumScreenProps {
    collection: Player[];
    fullPlayerPool: PlayerData[];
}

const AlbumPlaceholder: React.FC<{ player: PlayerData }> = ({ player }) => (
    <div className="aspect-[3/4] w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center p-2 text-center border-2 border-dashed border-gray-400 dark:border-gray-500">
        <span className="text-3xl font-bold text-gray-400 dark:text-gray-500">?</span>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">{player.nombre}</span>
    </div>
);

const AlbumCard: React.FC<{ player: PlayerData }> = ({ player }) => {
    // A simplified card for the album view
    return (
         <div className="relative aspect-[3/4] w-full bg-gray-300 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-end p-2 text-center shadow-md">
            <div className="absolute top-2 left-2 text-xl font-extrabold text-gray-800 dark:text-white">{player.media}</div>
            <div className="bg-black/30 backdrop-blur-sm rounded-md px-2 py-1">
                <span className="text-xs font-bold text-white truncate">{player.nombre}</span>
            </div>
        </div>
    )
}

export const AlbumScreen: React.FC<AlbumScreenProps> = ({ collection, fullPlayerPool }) => {
    const collectedPlayerNames = new Set(collection.map(p => p.nombre));
    const sortedPlayerPool = [...fullPlayerPool].sort((a, b) => b.media - a.media);

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">Collection Album</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {sortedPlayerPool.map(playerData => {
                    const isCollected = collectedPlayerNames.has(playerData.nombre);
                    return (
                        <div key={playerData.id}>
                            {isCollected ? <AlbumCard player={playerData} /> : <AlbumPlaceholder player={playerData} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
