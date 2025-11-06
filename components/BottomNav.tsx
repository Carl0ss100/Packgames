import React from 'react';
import type { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  setScreen: (screen: Screen) => void;
}

const NavButton: React.FC<{
  onClick: () => void;
  label: string;
  icon: React.ReactElement<any>;
  isActive: boolean;
}> = ({ onClick, label, icon, isActive }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-purple-500 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    }`}
  >
    {React.cloneElement(icon, { className: 'h-6 w-6 mb-1' })}
    <span className={`text-xs font-medium ${isActive ? 'text-gray-900 dark:text-white' : ''}`}>{label}</span>
  </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setScreen }) => {  
  const navItems = [
    { screen: 'STORE', label: 'Store', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v4a1 1 0 001 1h12a1 1 0 001-1v-4a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg> },
    { screen: 'COLLECTION', label: 'Collection', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg> },
    { screen: 'SQUAD_BUILDER', label: 'Squad', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>},
    { screen: 'ACHIEVEMENTS', label: 'Achieve', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.323l-3.323 1.02a1 1 0 00-.677.949v3.416c0 .405.19.78.5.999l3.5 2.45a1 1 0 001.002 0l3.5-2.45a1 1 0 00.5-.999V6.29a1 1 0 00-.677-.949L11 4.323V3a1 1 0 00-1-1zm0 14.5a.5.5 0 01-.433-.743l2-3.5a.5.5 0 01.866.5l-2 3.5a.5.5 0 01-.433.243z" clipRule="evenodd" /></svg> },
    { screen: 'SETTINGS', label: 'Settings', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-300 dark:border-gray-700">
      <div className="flex justify-around">
        {navItems.map(item => (
          <NavButton
            key={item.screen}
            onClick={() => setScreen(item.screen as Screen)}
            label={item.label}
            icon={item.icon}
            isActive={activeScreen === item.screen}
          />
        ))}
      </div>
    </footer>
  );
};