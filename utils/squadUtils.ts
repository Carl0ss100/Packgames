import type { Squad, Formation, Player } from '../types';

export const calculateSquadRating = (squad: Squad, formation: Formation): number => {
    const players = Object.values(squad).filter(p => p) as Player[];
    if (players.length === 0) return 0;
    
    const totalRating = players.reduce((sum, player) => sum + player.media, 0);
    return Math.round(totalRating / players.length);
};

export const calculateSquadChemistry = (squad: Squad, formation: Formation): number => {
    let totalChemistry = 0;
    
    for(const position of formation.positions) {
        const player = squad[position.id];
        if (!player) continue;

        let playerChem = 0;

        // Base chemistry for correct position
        if (player.posicion === position.id.substring(0,2) || player.posicion === position.id) {
             playerChem += 4; // Good base for correct position
        } else {
             playerChem += 1;
        }

        // Adjacency chemistry
        for(const adjacentPos of position.adj) {
            const neighbor = squad[adjacentPos];
            if (!neighbor) continue;

            if (player.club === neighbor.club) {
                playerChem += 2; // Strong link
            }
            if (player.pais === neighbor.pais) {
                playerChem += 1; // Weak link
            }
        }

        totalChemistry += Math.min(10, playerChem); // Cap player chemistry at 10
    }
    
    // Total chemistry is capped at 100
    return Math.min(100, totalChemistry);
};