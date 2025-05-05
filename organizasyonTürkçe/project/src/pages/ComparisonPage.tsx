import React, { useEffect, useState } from 'react';
import InputForm from '../components/InputForm';
import { calculateFCFS, getFCFSDescription } from '../algorithms/fcfs';
import { calculateSCAN, getSCANDescription } from '../algorithms/scan';
import { calculateSSTF, getSSTFDescription } from '../algorithms/sstf';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonPageProps {
  inputs: {
    diskPositions: number[];
    initialHeadPosition: number;
    diskSize: number;
  };
  onInputChange: (inputs: {
    diskPositions: number[];
    initialHeadPosition: number;
    diskSize: number;
  }) => void;
}

interface AlgorithmComparison {
  name: string;
  totalSeekTime: number;
  averageSeekTime: number;
  headMovements: number[];
  color: string;
  description: string;
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ inputs, onInputChange }) => {
  const { diskPositions, initialHeadPosition, diskSize } = inputs;
  const [results, setResults] = useState<AlgorithmComparison[]>([]);
 const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const fcfsResult = calculateFCFS(diskPositions, initialHeadPosition);
    const scanResult = calculateSCAN(diskPositions, initialHeadPosition, diskSize);
    const sstfResult = calculateSSTF(diskPositions, initialHeadPosition);
    
    const comparisons: AlgorithmComparison[] = [
      {
        name: 'FCFS',
        totalSeekTime: fcfsResult.totalSeekTime,
        averageSeekTime: fcfsResult.averageSeekTime,
        headMovements: fcfsResult.headMovements,
        color: 'rgb(59, 130, 246)', // Blue
        description: getFCFSDescription(),
      },
      {
        name: 'SCAN',
        totalSeekTime: scanResult.totalSeekTime,
        averageSeekTime: scanResult.averageSeekTime,
        headMovements: scanResult.headMovements,
        color: 'rgb(239, 68, 68)', // Red
        description: getSCANDescription(),
      },
      {
        name: 'SSTF',
        totalSeekTime: sstfResult.totalSeekTime,
        averageSeekTime: sstfResult.averageSeekTime,
        headMovements: sstfResult.headMovements,
        color: 'rgb(34, 197, 94)', // Green
        description: getSSTFDescription(),
      },
    ];
    
    setResults(comparisons);
    
    // Determine winner (lowest total seek time)
   
    
   
  }, [diskPositions, initialHeadPosition, diskSize]);

  const reset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStep >= Math.max(...results.map(r => r.headMovements.length)) - 1) {
      reset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const nextStep = () => {
    const maxSteps = Math.max(...results.map(r => r.headMovements.length));
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isPlaying) {
      timeoutId = setTimeout(() => {
        nextStep();
      }, 1000 / speed);
    }
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, currentStep, speed]);
  
  const totalSeekTimeData = {
    labels: results.map(r => r.name),
    datasets: [
      {
        label: 'Toplam Arama Süresi',
        data: results.map(r => r.totalSeekTime),
        backgroundColor: results.map(r => r.color),
        borderColor: results.map(r => r.color),
        borderWidth: 1,
      },
    ],
  };
  
  const averageSeekTimeData = {
    labels: results.map(r => r.name),
    datasets: [
      {
        label: 'Ortalama Arama Süresi',
        data: results.map(r => r.averageSeekTime),
        backgroundColor: results.map(r => r.color),
        borderColor: results.map(r => r.color),
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const getPositionPercentage = (position: number) => (position / diskSize) * 100;
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Algoritma Karşılaştırması
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <InputForm 
            diskPositions={diskPositions}
            initialHeadPosition={initialHeadPosition}
            diskSize={diskSize}
            onInputChange={onInputChange}
          />
          
          
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Performans Karşılaştırması</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Toplam Arama Süresi</h3>
                <div className="h-64">
                  <Bar data={totalSeekTimeData} options={chartOptions} />
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Ortalama Arama Süresi</h3>
                <div className="h-64">
                  <Bar data={averageSeekTimeData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Combined Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Canlı Karşılaştırma</h2>
            
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
                
                {/* Algorithm paths */}
                {results.map((result) => (
                  <svg key={result.name} className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                    {result.headMovements.slice(0, currentStep + 1).map((pos, idx) => {
                      if (idx === 0) return null;
                      const x1 = `${((idx - 1) / (result.headMovements.length - 1)) * 100}%`;
                      const y1 = `${100 - getPositionPercentage(result.headMovements[idx - 1])}%`;
                      const x2 = `${(idx / (result.headMovements.length - 1)) * 100}%`;
                      const y2 = `${100 - getPositionPercentage(pos)}%`;
                      
                      return (
                        <motion.line
                          key={idx}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={result.color}
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      );
                    })}
                    
                    {/* Current position marker */}
                    {currentStep >= 0 && currentStep < result.headMovements.length && (
                      <motion.circle
                        cx={`${(currentStep / (result.headMovements.length - 1)) * 100}%`}
                        cy={`${100 - getPositionPercentage(result.headMovements[currentStep])}%`}
                        r="4"
                        fill={result.color}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </svg>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-4 mb-4">
                {results.map((result) => (
                  <div key={result.name} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: result.color }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{result.name}</span>
                  </div>
                ))}
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
                    disabled={currentStep >= Math.max(...results.map(r => r.headMovements.length)) - 1}
                    className={`p-2 rounded-full transition-colors ${
                      currentStep >= Math.max(...results.map(r => r.headMovements.length)) - 1
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
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Algoritma Seçme Rehberi</h2>
        
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
          Doğru algoritmayı seçmek, iş yükü desenleri, adalet gereksinimleri ve sistem performans hedefleri gibi çeşitli faktörlere bağlıdır.
          İşte hızlı bir rehber:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">FCFS'i seçin eğer:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Basitlik performanstan daha önemli ise</li>
                <li>Adil olması önceliğiniz ise</li>
                <li>Requests are naturally close together</li>
                <li>Girdilerin sırası birbirine yakın ise</li>
                <li>Sistem yüklemesi hafif ise</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">SCAN'i seçin eğer:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Sistem çok fazla girdi ile yükleniyor ise</li>
                <li>Hem adil olması hem performans önemli ise</li>
                <li>Tahmin edilebilir geri dönüş süreleri istiyorsanız</li>
                <li>Girdiler diske dağılacak şekilde geliyor ise</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">SSTF'i seçin eğer:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Toplam arama süresini en aza indirmek önceliğiniz ise</li>
                <li>Performans adil sürelerden önemli ise</li>
                <li>Girdi yükü belirsiz ise</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;