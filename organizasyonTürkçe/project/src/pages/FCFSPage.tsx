import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import InputForm from '../components/InputForm';
import { calculateFCFS, getFCFSDescription } from '../algorithms/fcfs';

interface FCFSPageProps {
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

const FCFSPage: React.FC<FCFSPageProps> = ({ inputs, onInputChange }) => {
  const { diskPositions, initialHeadPosition, diskSize } = inputs;
  const result = calculateFCFS(diskPositions, initialHeadPosition);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        First-Come, First-Served (FCFS)
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
        
        <div className="lg:col-span-2">
          <AlgorithmVisualizer
            title="FCFS Visualization"
            description={getFCFSDescription()}
            diskPositions={diskPositions}
            headMovements={result.headMovements}
            totalSeekTime={result.totalSeekTime}
            averageSeekTime={result.averageSeekTime}
            initialHeadPosition={initialHeadPosition}
            diskSize={diskSize}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">FCFS Nasıl Çalışır</h2>
        
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
          First Come First served algoritması en basit disk yönetim algoritmasıdır. İsminde de belirttiği gibi, ilk gelen ilk işleme alınır.
          Market kasaları gibi düşünün. İlk gelen müşteri ilk önce kasaya gelir ve kasiyer onu işlemeden diğer müşteriyi işlemez.
          </p>
          <p>
            <strong>Algoritma Adımları:</strong>
          </p>
          <ol className="list-decimal list-inside pl-4 space-y-2">
            <li>Girdilerin geldiği sıraya göre bir disk erişimi hazırlar</li>
            <li>Girdileri geldikleri sırayla işler</li>
            <li>Başlık ilk girdiye doğru harekete başlar</li>
            <li>İşlem tamamlandığında, sıradaki isteğe geçilir</li>
          </ol>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Avantajları</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Uygulaması kolay</li>
              <li>Girdilere adil bir yaklaşım</li>
              <li>Düşük CPU yükü</li>
              <li>Öngörülebilir hareketler</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Dezavantajları</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Can lead to poor performance with widely scattered requests</li>
              <li>Diske dağılmış girdilerde zayıf performansa sebep olabilir</li>
              <li>Arama süresini veya disk hareketini optimize etmez</li>
              <li>"Thrashing" dediğimiz gereğinden fazla disk hareketine sebep olabilir</li>
              <li>Diğer algoritmalara göre yüksek bekleme süresine sahip</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Kullanım Alanları</h3>
            <p>
            FCFS genelde şu tarz durumlarda kullanılır:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Girdilerin doğal olarak yakın gruplandıkları senaryolarda</li>
              <li>Sistem yükünün az olduğudu durumlarda</li>
              <li>Basitlik ve öngörülebilirlik gerektiren durumlarda</li>
              <li>Girdilere adil davranmanın performanstan önemli olduğu durumlarda</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FCFSPage;