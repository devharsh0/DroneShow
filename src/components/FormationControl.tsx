import React from 'react';
import { Formation } from '../types/drone';

interface FormationControlProps {
  formation: Formation;
  isActive: boolean;
  onClick: () => void;
}

export const FormationControl: React.FC<FormationControlProps> = ({
  formation,
  isActive,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
        ${isActive 
          ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
          : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
        }
      `}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {formation.name.charAt(0)}
          </span>
        </div>
        <div className="text-center">
          <h3 className="text-white font-medium text-sm">{formation.name}</h3>
          <p className="text-gray-400 text-xs mt-1">{formation.description}</p>
        </div>
      </div>
      
      {isActive && (
        <div className="absolute inset-0 rounded-lg bg-blue-400/10 animate-pulse"></div>
      )}
    </button>
  );
};