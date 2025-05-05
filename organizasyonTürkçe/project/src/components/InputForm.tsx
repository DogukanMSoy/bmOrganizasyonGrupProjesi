import React, { useState } from 'react';
import { PlusCircle, RefreshCw } from 'lucide-react';

interface InputFormProps {
  diskPositions: number[];
  initialHeadPosition: number;
  diskSize: number;
  onInputChange: (inputs: {
    diskPositions: number[];
    initialHeadPosition: number;
    diskSize: number;
  }) => void;
}

const InputForm: React.FC<InputFormProps> = ({
  diskPositions,
  initialHeadPosition,
  diskSize,
  onInputChange,
}) => {
  const [positions, setPositions] = useState<string>(diskPositions.join(', '));
  const [headPos, setHeadPos] = useState<number>(initialHeadPosition);
  const [diskSizeValue, setDiskSizeValue] = useState<number>(diskSize);
  const [error, setError] = useState<string | null>(null);

  const validateAndSubmit = () => {
    try {
      // Parse and validate disk positions
      const parsedPositions = positions
        .split(',')
        .map(pos => parseInt(pos.trim()))
        .filter(pos => !isNaN(pos));
      
      if (parsedPositions.length < 2) {
        throw new Error('Lütfen en az 2 disk pozisyonu girin.');
      }
      
      if (parsedPositions.some(pos => pos < 0 || pos > diskSizeValue)) {
        throw new Error(`Tüm pozisyonlar 0 ile ${diskSizeValue} arasında olmalıdır.`);
      }
      
      // Validate head position
      if (headPos < 0 || headPos > diskSizeValue) {
        throw new Error(`Başlık pozisyonu 0 ile ${diskSizeValue} arasında olmalıdır.`);
      }
      
      setError(null);
      onInputChange({
        diskPositions: parsedPositions,
        initialHeadPosition: headPos,
        diskSize: diskSizeValue,
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Geçersiz giriş.');
      }
    }
  };

  const handleRandomize = () => {
    const count = Math.floor(Math.random() * 8) + 3; // 3 to 10 random positions
    const randomPositions = Array.from({ length: count }, () => 
      Math.floor(Math.random() * diskSizeValue)
    );
    const randomHead = Math.floor(Math.random() * diskSizeValue);
    
    setPositions(randomPositions.join(', '));
    setHeadPos(randomHead);
    
    onInputChange({
      diskPositions: randomPositions,
      initialHeadPosition: randomHead,
      diskSize: diskSizeValue,
    });
  };

  const handlePreset = (preset: 'FCFS' | 'SCAN' | 'SSTF') => {
    let newPositions: number[] = [];
    let newHead = headPos;
    
    switch (preset) {
      case 'FCFS':
        newPositions = [55, 58, 60, 65, 70, 75, 80, 85, 90, 95];
        newHead = 50;
        break;
      case 'SCAN':
        newPositions = [190, 40, 155, 25, 140, 10, 172, 60, 188, 80];
        newHead = 100;
        break;
      case 'SSTF':
        newPositions = [105, 90, 110, 85, 20, 180, 95, 120, 88, 112];
        newHead = 100;
        break;
    }
    
    setPositions(newPositions.join(', '));
    setHeadPos(newHead);
    
    onInputChange({
      diskPositions: newPositions,
      initialHeadPosition: newHead,
      diskSize: diskSizeValue,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Algoritma Girdisi</h2>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="diskSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Disk Boyutu
          </label>
          <input
            type="number"
            id="diskSize"
            value={diskSizeValue}
            onChange={(e) => setDiskSizeValue(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div>
          <label htmlFor="headPosition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Başlangıç Pozisyonu
          </label>
          <input
            type="number"
            id="headPosition"
            value={headPos}
            onChange={(e) => setHeadPos(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div>
          <label htmlFor="diskPositions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Disk Pozisyonları (virgüllerle ayırın)
          </label>
          <textarea
            id="diskPositions"
            value={positions}
            onChange={(e) => setPositions(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="e.g., 98, 183, 37, 122, 14"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={validateAndSubmit}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            <PlusCircle size={16} className="mr-2" />
            Girdi Ekle
          </button>
          
          <button
            onClick={handleRandomize}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
          >
            <RefreshCw size={16} className="mr-2" />
            Karıştır
          </button>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hazır Örnekler:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePreset('FCFS')}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              FCFS
            </button>
            <button
              onClick={() => handlePreset('SCAN')}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              SCAN
            </button>
            <button
              onClick={() => handlePreset('SSTF')}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              SSTF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;