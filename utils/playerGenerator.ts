
import type { Player, Pack } from '../types';
import { RarityLevel } from '../types';
import { RARITIES } from '../constants';
import { PLAYER_POOL } from '../players';

function selectRarity(pack?: Pack): RarityLevel {
  const rand = Math.random();
  let cumulativeProbability = 0;

  const probabilities = pack 
    ? pack.rarityProbabilities
    : {
        [RarityLevel.Common]: RARITIES.Common.probability,
        [RarityLevel.Rare]: RARITIES.Rare.probability,
        [RarityLevel.Epic]: RARITIES.Epic.probability,
        [RarityLevel.Legendary]: RARITIES.Legendary.probability,
        [RarityLevel.Special]: RARITIES.Special.probability,
      };

  for (const key in probabilities) {
      const rarityKey = key as RarityLevel;
      cumulativeProbability += probabilities[rarityKey];
      if (rand <= cumulativeProbability) {
          return rarityKey;
      }
  }
  
  return RarityLevel.Common; // Fallback
}

function mapRarityLevelToString(level: RarityLevel): string {
    switch (level) {
        case RarityLevel.Special: return 'Especial';
        case RarityLevel.Legendary: return 'Legendaria';
        case RarityLevel.Epic: return 'Épica';
        case RarityLevel.Rare: return 'Rara';
        case RarityLevel.Common: return 'Común';
    }
}

export function generatePlayer(pack?: Pack): Player {
  const rarityLevel = selectRarity(pack);
  const rarityString = mapRarityLevelToString(rarityLevel);
  const rarity = RARITIES[rarityLevel];

  let eligiblePlayers = PLAYER_POOL.filter(p => p.rareza === rarityString);

  if (eligiblePlayers.length === 0) {
      // Fallback if no players for the selected rarity (e.g., Legendary in a basic pack)
      eligiblePlayers = PLAYER_POOL.filter(p => p.rareza === 'Rara');
      if (eligiblePlayers.length === 0) {
        eligiblePlayers = PLAYER_POOL.filter(p => p.rareza === 'Común');
      }
      if (eligiblePlayers.length === 0) {
        // Absolute fallback if pools are empty
        eligiblePlayers = PLAYER_POOL;
      }
  }

  const basePlayer = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];

  return {
    id: `${basePlayer.id}-${Date.now()}-${Math.random()}`, // Make ID more unique
    nombre: basePlayer.nombre,
    media: basePlayer.media,
    posicion: basePlayer.posicion,
    pais: basePlayer.pais,
    club: basePlayer.club,
    valor: basePlayer.valor,
    rarity,
    stats: { goals: 0, assists: 0, appearances: 0 },
  };
}
