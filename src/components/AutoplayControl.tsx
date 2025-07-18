import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AutoplayControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  onReset: () => void;
  currentFormation: string;
  progress: number;
  duration: number;
  onDurationChange: (duration: number) => void;
  includeCustom: boolean;
  onIncludeCustomChange: (include: boolean) => void;
  hasCustomFormations: boolean;
}

export const AutoplayControl: React.FC<AutoplayControlProps> = ({
  isPlaying,
  onToggle,
  onReset,
  currentFormation,
  progress,
  duration,
  onDurationChange,
  includeCustom,
  onIncludeCustomChange,
  hasCustomFormations
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Autoplay Control</h3>
        <button
          onClick={onReset}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          title="Reset to first formation"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggle}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
            ${isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
            }
          `}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
        
        <div className="flex-1">
          <div className="text-xs text-gray-400 mb-1">
            Current: {currentFormation}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <label className="block text-sm text-gray-400 mb-2">
          Formation Duration: {duration}s
        </label>
        <input
          type="range"
          min="2"
          max="15"
          step="1"
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>2s</span>
          <span>15s</span>
        </div>
      </div>
      
      {hasCustomFormations && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <label className="flex items-center space-x-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={includeCustom}
              onChange={(e) => onIncludeCustomChange(e.target.checked)}
              className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span>Include custom formations in autoplay</span>
          </label>
        </div>
      )}
    </div>
  );
};