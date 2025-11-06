
import React from 'react';
import type { Achievement, AchievementStats, CompletedAchievement } from '../../types';
import { ACHIEVEMENTS, getNextLevelXP } from '../../constants';
import { PLAYER_POOL } from '../../players';

interface AchievementsScreenProps {
    completedAchievements: CompletedAchievement[];
    onClaim: (achievementId: string) => void;
    stats: AchievementStats;
}

const StatBox: React.FC<{label: string, value: string | number}> = ({label, value}) => (
    <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-center">
        <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">{label}</div>
        <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
    </div>
);

const ProgressBar: React.FC<{ current: number; max: number }> = ({ current, max }) => {
    const percentage = Math.min((current / max) * 100, 100);
    return (
        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 mt-1">
            <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ completedAchievements, onClaim, stats }) => {
    const totalUniquePlayers = PLAYER_POOL.length;
    const collectionPercentage = ((stats.uniquePlayers / totalUniquePlayers) * 100).toFixed(1);

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-600">Stats & Achievements</h2>
            
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Your Stats</h3>
                <div className="grid grid-cols-3 gap-2">
                    <StatBox label="Packs Opened" value={stats.packsOpened} />
                    <StatBox label="Cards" value={stats.cardsCollected} />
                    <StatBox label="Legendaries" value={stats.legendaries} />
                    <StatBox label="Club Value" value={stats.collectionValue.toLocaleString()} />
                    <StatBox label="Unique" value={stats.uniquePlayers} />
                    <StatBox label="Completion" value={`${collectionPercentage}%`} />
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4 text-center">Achievements</h3>
                <div className="space-y-3">
                    {ACHIEVEMENTS.map(achievement => {
                        const completed = completedAchievements.find(ca => ca.id === achievement.id);
                        const isCompleted = !!completed;
                        const isClaimed = completed?.claimed || false;
                        
                        return (
                            <div key={achievement.id} className={`p-4 rounded-lg flex items-center space-x-4 ${isClaimed ? 'bg-gray-200 dark:bg-gray-800 opacity-60' : 'bg-white dark:bg-gray-800 shadow-md'}`}>
                                <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                    {achievement.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold">{achievement.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                                </div>
                                {isCompleted && !isClaimed && (
                                    <button 
                                        onClick={() => onClaim(achievement.id)}
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                        Claim
                                    </button>
                                )}
                                {isClaimed && (
                                    <div className="text-green-500 font-bold">Claimed</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
