import React from 'react';
import type { Rarity, Pack, Achievement, Formation } from './types';
import { RarityLevel } from './types';

export const RARITIES: Record<RarityLevel, Rarity> = {
    [RarityLevel.Common]: {
        level: RarityLevel.Common,
        color: 'bg-gray-600 border-gray-500',
        glow: 'shadow-lg shadow-gray-500/40 dark:shadow-gray-500/40',
        probability: 0.65,
        ratingRange: [75, 81],
    },
    [RarityLevel.Rare]: {
        level: RarityLevel.Rare,
        color: 'bg-blue-700 border-blue-500',
        glow: 'shadow-xl shadow-blue-500/50 dark:shadow-blue-500/50',
        probability: 0.25,
        ratingRange: [82, 86],
    },
    [RarityLevel.Epic]: {
        level: RarityLevel.Epic,
        color: 'bg-purple-800 border-purple-600',
        glow: 'shadow-2xl shadow-purple-500/60 dark:shadow-purple-500/60',
        probability: 0.08,
        ratingRange: [87, 90],
    },
    [RarityLevel.Legendary]: {
        level: RarityLevel.Legendary,
        color: 'bg-amber-500 border-amber-400',
        glow: 'shadow-2xl shadow-amber-400/70 dark:shadow-amber-400/70',
        probability: 0.02,
        ratingRange: [91, 99],
    },
    [RarityLevel.Special]: {
        level: RarityLevel.Special,
        color: 'bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300',
        glow: 'shadow-2xl shadow-cyan-400/80 dark:shadow-cyan-400/80',
        probability: 0.00, // Only in special packs
        ratingRange: [90, 99],
    },
};

export const PACKS: Pack[] = [
    {
        id: 'bronze',
        name: 'Basic Pack',
        cost: 500,
        color: 'from-orange-800 to-yellow-900',
        description: 'A good chance for a Rare player.',
        rarityProbabilities: {
            [RarityLevel.Common]: 0.70,
            [RarityLevel.Rare]: 0.25,
            [RarityLevel.Epic]: 0.05,
            [RarityLevel.Legendary]: 0.00,
            [RarityLevel.Special]: 0.00,
        }
    },
    {
        id: 'silver',
        name: 'Mega Pack',
        cost: 2500,
        color: 'from-slate-600 to-slate-800',
        description: 'High chance for a Rare, possibility of an Epic.',
        rarityProbabilities: {
            [RarityLevel.Common]: 0.40,
            [RarityLevel.Rare]: 0.45,
            [RarityLevel.Epic]: 0.13,
            [RarityLevel.Legendary]: 0.02,
            [RarityLevel.Special]: 0.00,
        }
    },
    {
        id: 'gold',
        name: 'Ultimate Pack',
        cost: 7500,
        color: 'from-amber-500 to-yellow-700',
        description: 'Guaranteed Epic, with a shot at a Legendary!',
        rarityProbabilities: {
            [RarityLevel.Common]: 0.00,
            [RarityLevel.Rare]: 0.50,
            [RarityLevel.Epic]: 0.40,
            [RarityLevel.Legendary]: 0.10,
            [RarityLevel.Special]: 0.00,
        }
    },
    {
        id: 'icon_pack',
        name: 'Icons Pack',
        cost: 20000,
        color: 'from-cyan-500 to-blue-700',
        description: 'Guaranteed Special ICON card!',
        requiredLevel: 5,
        rarityProbabilities: {
            [RarityLevel.Common]: 0.00,
            [RarityLevel.Rare]: 0.00,
            [RarityLevel.Epic]: 0.50,
            [RarityLevel.Legendary]: 0.40,
            [RarityLevel.Special]: 0.10,
        }
    },
];

const iconClass = "h-6 w-6";
// FIX: Replaced JSX syntax with React.createElement to fix parsing errors in a .ts file.
export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'open_1_pack',
        title: 'Pack Opener',
        description: 'Open your first pack.',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v4a1 1 0 001 1h12a1 1 0 001-1v-4a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" })),
        check: (stats) => stats.packsOpened >= 1,
        reward: { coins: 100 },
    },
    {
        id: 'open_10_packs',
        title: 'Addicted',
        description: 'Open 10 packs.',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v4a1 1 0 001 1h12a1 1 0 001-1v-4a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" })),
        check: (stats) => stats.packsOpened >= 10,
        reward: { coins: 500 },
    },
    {
        id: 'get_legendary',
        title: 'Golden Touch',
        description: 'Find a Legendary player.',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" })),
        check: (stats) => stats.legendaries >= 1,
        reward: { coins: 2000 },
    },
    {
        id: 'collect_50_cards',
        title: 'Collector',
        description: 'Have 50 cards in your collection.',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })),
        check: (stats) => stats.cardsCollected >= 50,
        reward: { coins: 1000 },
    },
    {
        id: 'reach_50k_value',
        title: 'Millionaire Club',
        description: 'Reach a collection value of 50,000.',
        icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: iconClass, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.88 2.88a1 1 0 101.414-1.414L11 10.586V6z", clipRule: "evenodd" })),
        check: (stats) => stats.collectionValue >= 50000,
        reward: { coins: 5000 },
    },
];


export const getNextLevelXP = (level: number) => {
    return Math.floor(100 * Math.pow(1.2, level - 1));
};

export const FORMATIONS: Record<string, Formation> = {
    '4-3-3': {
        name: '4-3-3',
        positions: [
            { id: 'GK', top: '90%', left: '50%', adj: ['LCB', 'RCB'] },
            { id: 'LB', top: '70%', left: '15%', adj: ['LCB', 'LCM'] },
            { id: 'LCB', top: '75%', left: '35%', adj: ['GK', 'LB', 'RCB', 'LCM'] },
            { id: 'RCB', top: '75%', left: '65%', adj: ['GK', 'LCB', 'RB', 'RCM'] },
            { id: 'RB', top: '70%', left: '85%', adj: ['RCB', 'RCM'] },
            { id: 'LCM', top: '50%', left: '30%', adj: ['LB', 'LCB', 'CM', 'LW'] },
            { id: 'CM', top: '45%', left: '50%', adj: ['LCM', 'RCM', 'ST'] },
            { id: 'RCM', top: '50%', left: '70%', adj: ['RB', 'RCB', 'CM', 'RW'] },
            { id: 'LW', top: '25%', left: '20%', adj: ['LCM', 'ST'] },
            { id: 'ST', top: '15%', left: '50%', adj: ['LW', 'CM', 'RW'] },
            { id: 'RW', top: '25%', left: '80%', adj: ['RCM', 'ST'] },
        ],
    },
};

export const POSITION_MAP: Record<string, string[]> = {
    'POR': ['GK'],
    'DEF': ['LB', 'LCB', 'RCB', 'RB'],
    'MED': ['LCM', 'CM', 'RCM'],
    'DEL': ['LW', 'ST', 'RW'],
};
