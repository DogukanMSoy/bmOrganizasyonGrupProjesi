import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface AlgorithmVisualizerProps {
  title: string;
  description: string;
  diskPositions: number[];
  headMovements: number[];
  totalSeekTime: number;
  averageSeekTime: number;
  initialHeadPosition: number;
  diskSize: number;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  title,
  description,
  diskPositions,
  headMovements,
  totalSeekTime,
  averageSeekTime,
  initialHeadPosition,
  diskSize,
}) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const reset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStep >= headMovements.length - 1) {
      reset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const nextStep = () => {
    if (currentStep < headMovements.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    
    if (isPlaying && currentStep < headMovements.length - 1) {
      timeoutId = setTimeout(() => {
        nextStep();
      }, 1000 / speed);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isPlaying, currentStep, speed, headMovements.length]);

  const getPositionPercentage = (position: number) => (position / diskSize) * 100;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <div className="h-60 relative mb-4">
          {/* Grid lines */}
          <div className="absolute inset-0 border-b border-gray-300 dark:border-gray-600">
            {Array.from({ length: 11 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full border-t border-gray-200 dark:border-gray-600"
                style={{ top: `${i * 10}%` }}
              >
                <span className="absolute -left-12 -mt-2 text-xs text-gray-500 dark:text-gray-400 w-10 text-right">
                  {Math.round((10 - i) * 0.1 * diskSize)}
                </span>
              </div>
            ))}
          </div>
          
          {/* Initial head position line */}
          <div 
            className="absolute w-full border-t-2 border-blue-300 dark:border-blue-600"
            style={{ top: `${100 - getPositionPercentage(initialHeadPosition)}%` }}
          >
            <span className="absolute -right-16 -mt-2 text-xs font-medium text-blue-500 dark:text-blue-400">
              Başlangıç: {initialHeadPosition}
            </span>
          </div>
          
          {/* Disk positions markers */}
          {diskPositions.map((pos, idx) => (
            <div
              key={idx}
              className="absolute h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"
              style={{ 
                top: `${100 - getPositionPercentage(pos)}%`,
                left: `${(idx / (diskPositions.length - 1)) * 100}%` 
              }}
            >
              <span className="absolute -mt-5 -ml-2 text-xs text-gray-600 dark:text-gray-300">{pos}</span>
            </div>
          ))}
          
          {/* Head movement visualization */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {headMovements.slice(0, currentStep + 1).map((pos, idx) => {
              if (idx === 0) return null;
              const x1 = `${((idx - 1) / (headMovements.length - 1)) * 100}%`;
              const y1 = `${100 - getPositionPercentage(headMovements[idx - 1])}%`;
              const x2 = `${(idx / (headMovements.length - 1)) * 100}%`;
              const y2 = `${100 - getPositionPercentage(pos)}%`;
              
              return (
                <motion.line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgb(99 102 241)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </svg>
          
          {/* Current position marker */}
          {currentStep >= 0 && (
            <motion.div
              className="absolute h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 z-30"
              style={{ 
                top: `${100 - getPositionPercentage(headMovements[currentStep])}%`,
                left: `${(currentStep / (headMovements.length - 1)) * 100}%`,
                marginTop: '-8px',
                marginLeft: '-8px'
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Adım {currentStep + 1}: {headMovements[currentStep]}
                </span>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={togglePlay}
              className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={nextStep}
              disabled={currentStep >= headMovements.length - 1}
              className={`p-2 rounded-full transition-colors ${
                currentStep >= headMovements.length - 1 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                  : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
              }`}
            >
              <SkipForward size={20} />
            </button>
            <button 
              onClick={reset}
              className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Hız:</span>
            <select 
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-1 text-sm text-gray-800 dark:text-gray-200"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={3}>3x</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Toplam Arama Süresi</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalSeekTime}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Ortalama Arama Süresi</h3>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{averageSeekTime.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;