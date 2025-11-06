import type { ReactElement } from 'react';

export enum RarityLevel {
    Common = 'Common',
    Rare = 'Rare',
    Epic = 'Epic',
    Legendary = 'Legendary',
    Special = 'Special',
}

export interface Rarity {
    level: RarityLevel;
    color: string;
    glow: string;
    probability: number;
    ratingRange: [number, number];
}

export interface PlayerData {
  id: number;
  nombre: string;
  media: number;
  posicion: string;
  club: string;
  pais: string;
  rareza: string;
  valor: number;
}


export interface Player {
    id: string;
    nombre: string;
    media: number;
    posicion: string;
    pais: string;
    club: string;
    rarity: Rarity;
    valor: number;
    stats?: {
        goals: number;
        assists: number;
        appearances: number;
    };
}

export interface Pack {
    name: string;
    cost: number;
    color: string;
    description: string;
    id: string;
    requiredLevel?: number;
    rarityProbabilities: {
        [RarityLevel.Common]: number;
        [RarityLevel.Rare]: number;
        [RarityLevel.Epic]: number;
        [RarityLevel.Legendary]: number;
        [RarityLevel.Special]: number;
    }
}

export type Screen = 'STORE' | 'COLLECTION' | 'PACK_OPENING' | 'SETTINGS' | 'MARKET' | 'PLAYER_DETAILS' | 'ACHIEVEMENTS' | 'ALBUM' | 'SQUAD_BUILDER' | 'MATCH_RESULT';

export type Theme = 'light' | 'dark';

export interface UserProfile {
    level: number;
    xp: number;
    packsOpened: number;
}

export interface AchievementStats {
    packsOpened: number;
    cardsCollected: number;
    legendaries: number;
    coins: number;
    collectionValue: number;
    uniquePlayers: number;
}


export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: ReactElement;
    check: (stats: AchievementStats) => boolean;
    reward: {
        coins: number;
    }
}

export interface CompletedAchievement {
    id: string;
    completedAt: number;
    claimed?: boolean;
}

// Squad Builder Types
export type GeneralPosition = 'POR' | 'DEF' | 'MED' | 'DEL';

export type SquadPosition = 
  'GK' | 
  'LB' | 'LCB' | 'RCB' | 'RB' |
  'LDM' | 'CDM' | 'RDM' | 
  'LM' | 'LCM' | 'CM' | 'RCM' | 'RM' |
  'LW' | 'ST' | 'RW' | 'CF';

export type Squad = {
    [key in SquadPosition]?: Player;
};

export interface Formation {
    name: string;
    positions: {
        id: SquadPosition;
        top: string;
        left: string;
        adj: SquadPosition[];
    }[];
}

export type MatchResult = 'W' | 'D' | 'L';

export interface DetailedMatchResult {
    outcome: MatchResult;
    score: string;
    scorers: string[];
}