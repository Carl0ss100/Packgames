
import React, { useState, useCallback, useEffect } from 'react';
import { StoreScreen } from './components/screens/StoreScreen';
import { CollectionScreen } from './components/screens/CollectionScreen';
import { PackOpeningScreen } from './components/screens/PackOpeningScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { MarketScreen } from './components/screens/MarketScreen';
import { PlayerDetailsScreen } from './components/screens/PlayerDetailsScreen';
import { AchievementsScreen } from './components/screens/AchievementsScreen';
import { AlbumScreen } from './components/screens/AlbumScreen';
import { SquadBuilderScreen } from './components/screens/SquadBuilderScreen';
import { MatchResultScreen } from './components/screens/MatchResultScreen';
import { DailyRewardModal } from './components/DailyRewardModal';
import { LevelUpModal } from './components/LevelUpModal';
import { AchievementToast } from './components/AchievementToast';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Player, Pack, Screen, UserProfile, Achievement, CompletedAchievement, Theme, Squad, Formation, DetailedMatchResult, SquadPosition, MatchResult } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { generatePlayer } from './utils/playerGenerator';
import { PLAYER_POOL } from './players';
import { ACHIEVEMENTS, getNextLevelXP, FORMATIONS } from './constants';
import { calculateSquadRating, calculateSquadChemistry } from './utils/squadUtils';


const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('STORE');
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');
  const [profile, setProfile] = useLocalStorage<UserProfile>('userProfile', { level: 1, xp: 0, packsOpened: 0 });
  const [coins, setCoins] = useLocalStorage<number>('userCoins', 10000);
  const [collection, setCollection] = useLocalStorage<Player[]>('userCollection', []);
  const [squad, setSquad] = useLocalStorage<Squad>('userSquad', {});
  const [formation, setFormation] = useLocalStorage<Formation>('userFormation', FORMATIONS['4-3-3']);
  const [openedPack, setOpenedPack] = useState<Pack | null>(null);
  const [marketPlayers, setMarketPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [lastRewardTime, setLastRewardTime] = useLocalStorage<number | null>('lastRewardTime', null);
  const [consecutiveDays, setConsecutiveDays] = useLocalStorage<number>('consecutiveDays', 0);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState<number | null>(null);
  const [completedAchievements, setCompletedAchievements] = useLocalStorage<CompletedAchievement[]>('completedAchievements', []);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
  const [matchResults, setMatchResults] = useState<DetailedMatchResult[] | null>(null);
  
  const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;
  const FORTY_EIGHT_HOURS_IN_MS = 2 * TWENTY_FOUR_HOURS_IN_MS;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Daily Reward Logic
  useEffect(() => {
    const now = Date.now();
    if (!lastRewardTime) { // First time playing
        setShowRewardModal(true);
        return;
    }
    const timeSinceLastReward = now - lastRewardTime;
    if (timeSinceLastReward > TWENTY_FOUR_HOURS_IN_MS) {
        if (timeSinceLastReward > FORTY_EIGHT_HOURS_IN_MS) {
            setConsecutiveDays(1); // Streak broken
        } else {
            setConsecutiveDays(d => d + 1);
        }
        setShowRewardModal(true);
    }
  }, [lastRewardTime, setConsecutiveDays]);

  const handleClaimReward = () => {
    const rewardCoins = 1000 + (consecutiveDays * 100);
    setCoins(c => c + rewardCoins);
    setLastRewardTime(Date.now());
    setShowRewardModal(false);
    alert(`You claimed your daily reward of ${rewardCoins.toLocaleString()} coins! Consecutive days: ${consecutiveDays}`);
  };

  const gainXP = useCallback((amount: number) => {
    setProfile(prev => {
        const newXP = prev.xp + amount;
        const neededXP = getNextLevelXP(prev.level);
        if (newXP >= neededXP) {
            const newLevel = prev.level + 1;
            setShowLevelUpModal(newLevel);
            setCoins(c => c + newLevel * 500); // Level up coin reward
            return { ...prev, xp: newXP - neededXP, level: newLevel };
        }
        return { ...prev, xp: newXP };
    });
  }, [setProfile, setCoins]);
  
  const checkAchievements = useCallback(() => {
    const stats = {
        packsOpened: profile.packsOpened,
        cardsCollected: collection.length,
        legendaries: collection.filter(p => p.rarity.level === 'Legendary').length,
        coins: coins,
        collectionValue: collection.reduce((sum, player) => sum + player.valor, 0),
        uniquePlayers: new Set(collection.map(p => p.nombre)).size
    };

    for (const achievement of ACHIEVEMENTS) {
        if (completedAchievements.some(ca => ca.id === achievement.id)) continue;

        if (achievement.check(stats)) {
            const newAchievements = [achievement];
            setRecentAchievement(newAchievements[0]); // Show one toast at a time
            setTimeout(() => setRecentAchievement(null), 3000);
            setCompletedAchievements(prev => [...prev, ...newAchievements.map(a => ({ id: a.id, completedAt: Date.now() }))]);
        }
    }
  }, [profile.packsOpened, collection, coins, completedAchievements, setCompletedAchievements]);

  useEffect(() => {
      checkAchievements();
  }, [checkAchievements]);

  const handleClaimAchievement = (achievementId: string) => {
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      const isCompleted = completedAchievements.some(ca => ca.id === achievementId && !ca.claimed);
      if (achievement && isCompleted) {
          setCoins(c => c + achievement.reward.coins);
          setCompletedAchievements(prev => prev.map(ca => ca.id === achievementId ? {...ca, claimed: true} : ca));
      }
  };

  const collectionValue = collection.reduce((sum, player) => sum + player.valor, 0);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
        setProfile({ level: 1, xp: 0, packsOpened: 0 });
        setCoins(10000);
        setCollection([]);
        setSquad({});
        setLastRewardTime(null);
        setConsecutiveDays(0);
        setCompletedAchievements([]);
        setScreen('STORE');
    }
  };
  
  const handlePackPurchase = (pack: Pack) => {
    if (coins >= pack.cost) {
      setCoins(prev => prev - pack.cost);
      gainXP(25);
      setOpenedPack(pack);
      setScreen('PACK_OPENING');
    } else {
      alert("Not enough coins!");
    }
  };

  const handlePlayersOpened = useCallback((players: Player[]) => {
    setCollection(prev => [...prev, ...players].sort((a,b) => b.media - a.media));
    setProfile(prev => ({...prev, packsOpened: prev.packsOpened + 1}));
  }, [setCollection, setProfile]);

  const handleSellPlayer = (playerId: string) => {
      const playerToSell = collection.find(p => p.id === playerId);
      if (!playerToSell) return;

      const sellPrice = Math.round(playerToSell.valor / 2);
      setCollection(prev => prev.filter(p => p.id !== playerId));
      // Also remove from squad if they are there
      setSquad(prev => {
          const newSquad = {...prev};
          for(const pos in newSquad) {
              if (newSquad[pos as SquadPosition]?.id === playerId) {
                  delete newSquad[pos as SquadPosition];
              }
          }
          return newSquad;
      });
      setCoins(prev => prev + sellPrice);
      gainXP(2);
  };

  const handleSellPlayerFromDetails = (playerId: string) => {
    handleSellPlayer(playerId);
    setScreen('COLLECTION');
  };
  
  const handleSellDuplicates = () => {
    const seen = new Set<string>();
    const duplicates = collection.filter(player => {
        if (seen.has(player.nombre)) {
            return true;
        }
        seen.add(player.nombre);
        return false;
    });

    if (duplicates.length === 0) {
        alert("No duplicate players to sell!");
        return;
    }

    const coinsEarned = duplicates.reduce((sum, player) => sum + Math.round(player.valor / 2), 0);
    const duplicateIds = new Set(duplicates.map(d => d.id));
    
    setCollection(prev => prev.filter(p => !duplicateIds.has(p.id)));
    setCoins(prev => prev + coinsEarned);
    gainXP(duplicates.length * 2);
    alert(`Sold ${duplicates.length} duplicates for ${coinsEarned.toLocaleString()} coins!`);
  };

  const handleBuyPlayer = (playerToBuy: Player) => {
      const buyPrice = playerToBuy.valor;
      if(coins >= buyPrice) {
          setCoins(prev => prev - buyPrice);
          setCollection(prev => [...prev, playerToBuy].sort((a,b) => b.media - a.media));
          setMarketPlayers(prev => prev.filter(p => p.id !== playerToBuy.id));
          alert(`${playerToBuy.nombre} purchased!`);
      } else {
          alert("Not enough coins!");
      }
  };

  const handleCardClick = (player: Player) => {
      setSelectedPlayer(player);
      setScreen('PLAYER_DETAILS');
  }
  
  const handleUpdateSquad = (position: SquadPosition, player: Player) => {
      setSquad(prev => ({ ...prev, [position]: player }));
  }

  const handleSimulateMatches = () => {
    const squadRating = calculateSquadRating(squad, formation);
    const squadChemistry = calculateSquadChemistry(squad, formation);
    const detailedResults: DetailedMatchResult[] = [];
    const statsUpdate: Record<string, { goals: number, assists: number }> = {};

    const attackers = Object.values(squad).filter((p): p is Player => p?.posicion === 'DEL');
    const midfielders = Object.values(squad).filter((p): p is Player => p?.posicion === 'MED');

    Object.values(squad).forEach(player => {
        if (player) {
            statsUpdate[player.id] = { goals: 0, assists: 0 };
        }
    });

    for (let i = 0; i < 5; i++) {
        const winProbability = 0.5 + (squadRating - 85) * 0.02 + (squadChemistry - 80) * 0.005;
        const rand = Math.random();
        
        let outcome: MatchResult;
        if (rand < winProbability - 0.15) outcome = 'W';
        else if (rand < winProbability + 0.15) outcome = 'D';
        else outcome = 'L';
        
        let goalsScored = 0;
        let goalsConceded = 0;
        
        if (outcome === 'W') {
            goalsScored = Math.floor(Math.random() * 3) + 1;
            goalsConceded = Math.floor(Math.random() * goalsScored);
        } else if (outcome === 'D') {
            goalsScored = Math.floor(Math.random() * 3);
            goalsConceded = goalsScored;
        } else { // 'L'
            goalsConceded = Math.floor(Math.random() * 3) + 1;
            goalsScored = Math.floor(Math.random() * goalsConceded);
        }

        const score = `${goalsScored}-${goalsConceded}`;
        const matchScorers: string[] = [];
        
        for (let g = 0; g < goalsScored; g++) {
            const scorerPool = [...attackers, ...attackers, ...midfielders];
            if (scorerPool.length > 0) {
                const scorer = scorerPool[Math.floor(Math.random() * scorerPool.length)];
                matchScorers.push(scorer.nombre);
                if (statsUpdate[scorer.id]) {
                    statsUpdate[scorer.id].goals += 1;
                }
            }
        }

        const assistsToGive = Math.floor(goalsScored * 0.8);
        for (let a = 0; a < assistsToGive; a++) {
            const assisterPool = [...midfielders, ...midfielders, ...attackers];
            if (assisterPool.length > 0) {
                const assister = assisterPool[Math.floor(Math.random() * assisterPool.length)];
                if (statsUpdate[assister.id]) {
                    statsUpdate[assister.id].assists += 1;
                }
            }
        }
        
        detailedResults.push({ outcome, score, scorers: matchScorers });
    }
    
    const squadPlayerIds = new Set(Object.values(squad).filter(p => p).map(p => p!.id));

    const updatedCollection = collection.map(p => {
        if (squadPlayerIds.has(p.id)) {
            const updates = statsUpdate[p.id] || { goals: 0, assists: 0 };
            const currentStats = p.stats || { goals: 0, assists: 0, appearances: 0 };
            const newStats = {
                goals: currentStats.goals + updates.goals,
                assists: currentStats.assists + updates.assists,
                appearances: currentStats.appearances + 5
            };
            return { ...p, stats: newStats };
        }
        return p;
    });

    setCollection(updatedCollection);
    setMatchResults(detailedResults);
    setScreen('MATCH_RESULT');
  };

  const handleClaimMatchRewards = (rewards: {coins: number, xp: number}) => {
    setCoins(c => c + rewards.coins);
    gainXP(rewards.xp);
    setMatchResults(null);
    setScreen('SQUAD_BUILDER');
  };

  useEffect(() => {
    if (screen === 'MARKET' && marketPlayers.length === 0) {
        const newMarketPlayers = Array.from({ length: 5 }, () => generatePlayer());
        setMarketPlayers(newMarketPlayers);
    }
  }, [screen, marketPlayers.length]);


  const renderScreen = () => {
    const screenProps = {
        'STORE': <StoreScreen onPackPurchase={handlePackPurchase} userLevel={profile.level} navigate={setScreen} />,
        'COLLECTION': <CollectionScreen collection={collection} onSellPlayer={handleSellPlayer} onCardClick={handleCardClick} onSellDuplicates={handleSellDuplicates} />,
        'MARKET': <MarketScreen marketPlayers={marketPlayers} onBuyPlayer={handleBuyPlayer} coins={coins} />,
        'SQUAD_BUILDER': <SquadBuilderScreen squad={squad} collection={collection} formation={formation} onUpdateSquad={handleUpdateSquad} onSimulate={handleSimulateMatches} />,
        'ALBUM': <AlbumScreen collection={collection} fullPlayerPool={PLAYER_POOL} />,
        'ACHIEVEMENTS': <AchievementsScreen 
            completedAchievements={completedAchievements} 
            onClaim={handleClaimAchievement}
            stats={{
                packsOpened: profile.packsOpened,
                cardsCollected: collection.length,
                legendaries: collection.filter(p => p.rarity.level === 'Legendary').length,
                coins: coins,
                collectionValue: collectionValue,
                uniquePlayers: new Set(collection.map(p => p.nombre)).size
            }}
        />,
        'SETTINGS': <SettingsScreen 
            onReset={handleReset} 
            theme={theme}
            setTheme={setTheme}
        />,
        'PACK_OPENING': openedPack ? (
            <PackOpeningScreen 
                pack={openedPack} 
                onPackFinished={handlePlayersOpened}
                onClose={() => {
                    setScreen('STORE');
                    setOpenedPack(null);
                }} 
                collection={collection}
            />
        ) : null,
    };
    // @ts-ignore
    return screenProps[screen] || screenProps['STORE'];
  };
  
  const isNavVisible = screen !== 'PACK_OPENING' && screen !== 'PLAYER_DETAILS' && screen !== 'MATCH_RESULT';
  const nextLevelXP = getNextLevelXP(profile.level);

  return (
    <div className={`${theme} font-sans antialiased`}>
        <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b from-gray-800 to-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
            <div className="container mx-auto max-w-lg p-4">
                {showRewardModal && <DailyRewardModal onClaim={handleClaimReward} amount={1000 + (consecutiveDays * 100)} consecutiveDays={consecutiveDays} />}
                {showLevelUpModal && <LevelUpModal level={showLevelUpModal} onClose={() => setShowLevelUpModal(null)} />}
                {recentAchievement && <AchievementToast achievement={recentAchievement} />}
                
                {screen === 'PLAYER_DETAILS' && selectedPlayer && (
                  <PlayerDetailsScreen 
                    player={selectedPlayer} 
                    onBack={() => setScreen('COLLECTION')} 
                    onSell={handleSellPlayerFromDetails}
                  />
                )}

                {isNavVisible && <Header coins={coins} level={profile.level} xp={profile.xp} nextLevelXP={nextLevelXP} />}
                
                <main key={screen} className="mt-4 pb-20 animate-screen-fade-in">
                    {renderScreen()}
                </main>
                
                {screen === 'MATCH_RESULT' && matchResults && (
                  <MatchResultScreen results={matchResults} onClaim={handleClaimMatchRewards} />
                )}

                {isNavVisible && <BottomNav activeScreen={screen} setScreen={setScreen} />}
            </div>
        </div>
    </div>
  );
};

export default App;