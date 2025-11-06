import React, { useMemo } from 'react';
import type { DetailedMatchResult, MatchResult } from '../../types';

interface MatchResultScreenProps {
  results: DetailedMatchResult[];
  onClaim: (rewards: {coins: number, xp: number}) => void;
}

const getResultColor = (result: MatchResult) => {
    if (result === 'W') return 'bg-green-500';
    if (result === 'D') return 'bg-yellow-500';
    return 'bg-red-500';
}

export const MatchResultScreen: React.FC<MatchResultScreenProps> = ({ results, onClaim }) => {

    const summary = useMemo(() => {
        const wins = results.filter(r => r.outcome === 'W').length;
        const draws = results.filter(r => r.outcome === 'D').length;
        const losses = results.filter(r => r.outcome === 'L').length;
        return { wins, draws, losses };
    }, [results]);

    const rewards = useMemo(() => {
        const coins = summary.wins * 1000 + summary.draws * 400 + summary.losses * 100;
        const xp = summary.wins * 20 + summary.draws * 10 + summary.losses * 5;
        return { coins, xp };
    }, [summary]);

    return (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500 rounded-2xl shadow-2xl p-6 text-center animate-fade-in-up w-full max-w-sm">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Match Results</h2>
                
                <div className="space-y-2 my-6 max-h-48 overflow-y-auto pr-2">
                    {results.map((result, index) => (
                        <div key={index} className="bg-gray-700/50 p-3 rounded-lg text-left"
                             style={{animation: `fade-in-up 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0}}>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">Match {index + 1}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-xl">{result.score}</span>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-md shadow-lg ${getResultColor(result.outcome)}`}>
                                        {result.outcome}
                                    </span>
                                </div>
                            </div>
                            {result.scorers.length > 0 && (
                                <div className="text-xs text-gray-300 mt-1">
                                    ⚽ {result.scorers.join(', ')}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-xl font-semibold my-4">
                    {summary.wins} Wins, {summary.draws} Draws, {summary.losses} Losses
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-bold">Rewards</h3>
                    <p className="text-yellow-300 text-2xl font-bold">{rewards.coins.toLocaleString()} Coins</p>
                    <p className="text-purple-300 text-2xl font-bold">{rewards.xp.toLocaleString()} XP</p>
                </div>

                <button
                    onClick={() => onClaim(rewards)}
                    className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
                >
                    Claim Rewards
                </button>
            </div>
        </div>
    );
};