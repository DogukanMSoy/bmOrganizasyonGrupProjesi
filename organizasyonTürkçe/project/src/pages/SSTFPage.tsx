import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import InputForm from '../components/InputForm';
import { calculateSSTF, getSSTFDescription } from '../algorithms/sstf';

interface SSTFPageProps {
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

const SSTFPage: React.FC<SSTFPageProps> = ({ inputs, onInputChange }) => {
  const { diskPositions, initialHeadPosition, diskSize } = inputs;
  const result = calculateSSTF(diskPositions, initialHeadPosition);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Shortest Seek Time First (SSTF)
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
            title="SSTF Visualization"
            description={getSSTFDescription()}
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
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">SSTF Nasıl Çalışır</h2>
        
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
          En Kısa Arama Süresi İlk (SSTF) algoritması, mevcut kafa pozisyonundan en az seek süresini gerektiren disk taleplerini önceliklendirir.
          Her zaman en yakın bekleyen isteği hizmet eder, ne zaman geldiğine bakılmaksızın.
          </p>
          <p>
            <strong>Algoritma Adımları:</strong>
          </p>
          <ol className="list-decimal list-inside pl-4 space-y-2">
            <li>İlk konumundan işleme başlar</li>
            <li>Bulunduğu konuma en yakın konumda bekleyen isteği bulur</li>
            <li>Hedef konuma hareket ederek isteği hizmet eder</li>
            <li>Adım 2-3'ü tüm talepler hizmet edilene kadar tekrarlar</li>
          </ol>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Avantajları</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Higher throughput than FCFS</li>
              <li>Minimizes the total seek time and head movement</li>
              <li>Good performance for typical workloads</li>
              <li>Better average response time than FCFS</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Dezavantajları</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Bazı taleplerde çok uzun süreli beklemelere (starvation) sebep olabilir</li>
              <li>Öngörülemez bekleme süreleri</li>
              <li>Devamlı talep olan ağır yüklü işler için uygun değil</li>
              <li>More complex to implement than FCFS</li>
              <li>Uygulaması FCFS'e kıyasla daha kompleks</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Starvation Problemi</h3>
            <p>
              SSTF ile ilgili bir sorun, bazı taleplerin çok uzun süre beklemesi (starvation) durumudur.
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>If new requests continuously arrive near the current head position, requests far away may never be serviced</li>
              <li>Eğer yeni talepler devamlı başlangıç konumuna yakın gelirse uzak taleplere asla işlem yapılmayabilir</li>
              <li>Örneğin, eğer başlangıç pozisyonu 50 ise ve 40 ile 150 arası bir talep menzili ayarlanmışken devamlı 45-55 aralığında talepler gelirse 150'ye yakın olan talepler sonsuza kadar bekleyebilir</li>
              <li>Bu durum yoğun trafik olan sistemlerde özellikle sorun teşkil eder</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Kullanım Alanları</h3>
            <p>
              SSTF algoritması, aşağıdaki durumlar için uygundur:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Systems where minimizing head movement is critical</li>
              <li>Sistemler içindeki hareketi minimuma indirmek kritik olduğunda</li>
              <li>Taleplerin ortama eşit dağıldığı durumlarda</li>
              <li>Maksimum çıktının taleplere adil yaklaşımdan daha önemli olduğu durumlarda</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSTFPage;