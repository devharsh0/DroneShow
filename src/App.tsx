import React, { useEffect, useRef, useState } from 'react';
import { DroneShow } from './utils/droneShow';
import { formations } from './data/formations';
import { Formation } from './types/drone';
import { FormationControl } from './components/FormationControl';
import { AutoplayControl } from './components/AutoplayControl';
import { generateTextFormation } from './utils/textFormation';
import { Zap, Github } from 'lucide-react';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const droneShowRef = useRef<DroneShow | null>(null);
  const [currentFormation, setCurrentFormation] = useState<Formation | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [autoplayDuration, setAutoplayDuration] = useState(5000);
  const [customText, setCustomText] = useState('HELLO');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCustomTextInput, setShowCustomTextInput] = useState(false);
  const [customFormations, setCustomFormations] = useState<Formation[]>([]);
  const [includeCustomInAutoplay, setIncludeCustomInAutoplay] = useState(false);
  const autoplayIntervalRef = useRef<{ main: NodeJS.Timeout; progress: NodeJS.Timeout } | null>(null);
  const formationIndexRef = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      droneShowRef.current = new DroneShow(containerRef.current);
      
      // Start with first formation
      handleFormationChange(formations[0]);
    }

    return () => {
      if (droneShowRef.current) {
        droneShowRef.current.destroy();
      }
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current.main);
        clearInterval(autoplayIntervalRef.current.progress);
      }
    };
  }, []);

  const handleFormationChange = async (formation: Formation) => {
    if (isTransitioning || !droneShowRef.current) return;

    setIsTransitioning(true);
    setCurrentFormation(formation);
    
    try {
      await droneShowRef.current.transitionToFormation(formation);
    } finally {
      setIsTransitioning(false);
    }
  };

  const startAutoplay = () => {
    if (autoplayIntervalRef.current) return;

    setIsAutoplay(true);
    const allFormations = includeCustomInAutoplay 
      ? [...formations, ...customFormations]
      : formations;
    const interval = autoplayDuration * 1000; // Convert seconds to milliseconds
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += 1;
      setAutoplayProgress((progress / (interval / 100)) * 100);
    }, 100);

    const mainInterval = setInterval(() => {
      formationIndexRef.current = (formationIndexRef.current + 1) % allFormations.length;
      handleFormationChange(allFormations[formationIndexRef.current]);
      progress = 0;
      setAutoplayProgress(0);
    }, interval);

    autoplayIntervalRef.current = {
      main: mainInterval,
      progress: progressInterval
    };
  };

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current.main);
      clearInterval(autoplayIntervalRef.current.progress);
      autoplayIntervalRef.current = null;
    }
    setIsAutoplay(false);
    setAutoplayProgress(0);
  };

  const toggleAutoplay = () => {
    if (isAutoplay) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    formationIndexRef.current = 0;
    const allFormations = includeCustomInAutoplay 
      ? [...formations, ...customFormations]
      : formations;
    if (allFormations.length > 0) {
      handleFormationChange(allFormations[0]);
    }
  };

  const handleCustomTextSubmit = () => {
    if (!customText.trim()) return;
    
    const customFormation: Formation = {
      id: `custom-text-${Date.now()}`,
      name: `Custom: ${customText}`,
      description: `Custom text formation: "${customText}"`,
      positions: generateTextFormation(customText)
    };
    
    setCustomFormations(prev => [...prev, customFormation]);
    handleFormationChange(customFormation);
    setShowCustomTextInput(false);
    setCustomText('');
  };

  const removeCustomFormation = (formationId: string) => {
    setCustomFormations(prev => prev.filter(f => f.id !== formationId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="relative z-10 p-4 bg-black/20 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto flex items-center justify-between">
        
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DeveloperDrone Show
              </h1>
            
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* 3D Viewer */}
          <div className="xl:col-span-3">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
              <div 
                ref={containerRef}
                className="w-full h-[70vh] relative bg-transparent"
                style={{ overflow: 'hidden' }}
              >
              </div>
              
              {/* Status Bar */}
              <div className="p-4 bg-gray-800/50 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">Live</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Formation: <span className="text-white">{currentFormation?.name || 'None'}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  50 Drones Active
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Autoplay Control */}
            <AutoplayControl
              isPlaying={isAutoplay}
              onToggle={toggleAutoplay}
              onReset={resetAutoplay}
              currentFormation={currentFormation?.name || 'None'}
              progress={autoplayProgress}
              duration={autoplayDuration}
              onDurationChange={setAutoplayDuration}
              includeCustom={includeCustomInAutoplay}
              onIncludeCustomChange={setIncludeCustomInAutoplay}
              hasCustomFormations={customFormations.length > 0}
            />

            {/* Formation Grid */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-medium mb-4">Formation Library</h3>
              
              {/* Custom Text Formation */}
              <div className="mb-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Custom Text</span>
                  <button
                    onClick={() => setShowCustomTextInput(!showCustomTextInput)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {showCustomTextInput ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showCustomTextInput && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                      placeholder="Enter text..."
                      maxLength={10}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && handleCustomTextSubmit()}
                    />
                    <button
                      onClick={handleCustomTextSubmit}
                      disabled={!customText.trim() || isTransitioning}
                      className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
                    >
                      Create Formation
                    </button>
                  </div>
                )}
              </div>
              
              {/* Custom Formations List */}
              {customFormations.length > 0 && (
                <div className="mb-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                  <h4 className="text-sm text-gray-300 mb-2">Custom Formations</h4>
                  <div className="space-y-2">
                    {customFormations.map((formation) => (
                      <div key={formation.id} className="flex items-center justify-between bg-gray-800/50 p-2 rounded">
                        <button
                          onClick={() => handleFormationChange(formation)}
                          className="flex-1 text-left text-sm text-white hover:text-blue-400 transition-colors"
                        >
                          {formation.name}
                        </button>
                        <button
                          onClick={() => removeCustomFormation(formation.id)}
                          className="text-red-400 hover:text-red-300 text-xs px-2 py-1 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                {formations.map((formation) => (
                  <FormationControl
                    key={formation.id}
                    formation={formation}
                    isActive={currentFormation?.id === formation.id}
                    onClick={() => handleFormationChange(formation)}
                  />
                ))}
              </div>
            </div>

            {/* Info Panel */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-medium mb-3">Current Formation</h3>
              {currentFormation ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{currentFormation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Drones:</span>
                    <span className="text-white">{currentFormation.positions.length}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {currentFormation.description}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Select a formation to begin</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;