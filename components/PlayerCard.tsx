
import React from 'react';
import type { Player } from '../types';
import { RarityLevel } from '../types';

interface PlayerCardProps {
  player: Player;
  isAnimated?: boolean;
  size?: 'small' | 'medium';
}

const Flag: React.FC<{ country: string; isSmall?: boolean }> = ({ country, isSmall = false }) => {
    const countryCode: { [key: string]: string } = {
        'Portugal': 'PT', 'Argentina': 'AR', 'Francia': 'FR', 'Noruega': 'NO',
        'Bélgica': 'BE', 'Brasil': 'BR', 'Egipto': 'EG', 'Polonia': 'PL',
        'Inglaterra': 'GB', 'Alemania': 'DE', 'Uruguay': 'UY', 'España': 'ES',
        'Países Bajos': 'NL', 'Eslovenia': 'SI', 'Senegal': 'SN', 'Croacia': 'HR',
        'Corea del Sur': 'KR', 'Marruecos': 'MA', 'Nigeria': 'NG', 'Italia': 'IT',
        'Serbia': 'RS', 'Austria': 'AT', 'Eslovaquia': 'SK', 'Chile': 'CL',
        'Costa Rica': 'CR', 'Georgia': 'GE', 'Hungría': 'HU', 'Argelia': 'DZ',
    };

    const code = countryCode[country];
    if (!code) return null;

    return <img src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} alt={country} className={`${isSmall ? 'w-5 h-3' : 'w-8 h-5'} object-cover rounded-sm`} />;
};


export const PlayerCard: React.FC<PlayerCardProps> = ({ player, isAnimated = false, size = 'medium' }) => {
  const animationClass = isAnimated ? 'animate-fade-in-up' : '';
  const isSpecial = player.rarity.level === RarityLevel.Special;
  const isSmall = size === 'small';

  return (
    <div 
        className={`relative w-full h-full rounded-2xl border-2 overflow-hidden transition-all duration-300 transform hover:scale-105 ${player.rarity.color} ${player.rarity.glow} ${animationClass}`}
        style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
    >
      <div className="absolute inset-0 bg-black/20 z-0"></div>
       {isSpecial && <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/az-subtle.png')"}}></div>}
      <div className={`h-full flex flex-col justify-between ${isSmall ? 'p-1 leading-tight' : 'p-2'} text-white relative z-10`}>
        <div className="flex justify-between items-start">
          <div>
            <div className={`font-extrabold ${isSpecial ? 'text-cyan-200' : ''} ${isSmall ? 'text-sm sm:text-base' : 'text-xl sm:text-2xl'}`}>{player.media}</div>
            <div className={`font-bold ${isSmall ? 'text-[9px] sm:text-[10px]' : 'text-xs'}`}>{player.posicion}</div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Flag country={player.pais} isSmall={isSmall} />
            <div className={`font-semibold text-right ${isSmall ? 'text-[7px] sm:text-[8px]' : 'text-[10px]'}`}>{player.club}</div>
          </div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm rounded-md p-1 text-center">
            <div className={`font-bold truncate ${isSmall ? 'text-[10px] sm:text-xs' : 'text-sm'}`}>{player.nombre}</div>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${player.rarity.color.replace('bg-', 'bg-opacity-50 ')}`}></div>
    </div>
  );
};
