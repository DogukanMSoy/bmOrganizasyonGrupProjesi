import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import InputForm from '../components/InputForm';
import { calculateSCAN, getSCANDescription } from '../algorithms/scan';

interface SCANPageProps {
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

const SCANPage: React.FC<SCANPageProps> = ({ inputs, onInputChange }) => {
  const { diskPositions, initialHeadPosition, diskSize } = inputs;
  const result = calculateSCAN(diskPositions, initialHeadPosition, diskSize);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      SCAN Algoritması (Asansör)
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
            title="SCAN Visualization"
            description={getSCANDescription()}
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
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">SCAN Algoritması Nasıl Çalışır</h2>
        
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
          SCAN algoritması, aynı zamanda asansör algoritması olarak da bilinir, disk kafasını diskin bir ucundan diğerine hareket ettirir,
          yol boyunca taleplere hizmet eder. Uca ulaştığında, yönünü tersine çevirir ve geri hareket eder, taleplere hizmet etmeye devam eder.
          </p>
          <p>
            <strong>Algoritma Adımları:</strong>
          </p>
          <ol className="list-decimal list-inside pl-4 space-y-2">
            <li>Başlangıç pozisyonundan bir yöne doğru harekete başlar</li>
            <li>Sabit yönde hareket ederken yoldaki taleplere hizmet eder</li>
            <li>Diskin sonuna ulaştığında yönünü tersine çevirir</li>
            <li>Yeni yönünde sabit harekete devam edip taleplere hizmet eder</li>
            <li>Disk içerisinde ileri geri harekete devam edip süreci tekrarlar</li>
          </ol>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Avantajları</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Çoğu iş yükünde FCFS'ten iyi performans gösterir</li>
              <li>Prevents starvation of requests</li>
              <li>Uygulaması basit ve davranışı öngörülebilirdir</li>
              <li>Yüksek iş yükünde iyi sonuç çıkartır</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Dezavantajları</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Diskin uç kısımlarındaki talepler uzun bekleme süresine maruz kalabilir</li>
              <li>Başlık hemen konumundan geçtikten sonra gelen talepler tüm döngüyü beklemek zorunda kalır</li>
              <li>FCFS'ten daha karmaşık bir uygulamaya sahip</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Dünyamızdan Bir Örnek</h3>
            <p>
            SCAN algoritması, asansörlerin katlar arasında hareket etme şekliyle benzerlik gösterir:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Asansör (disk başlığı) bina içerisinde yukarı doğru hareket eder ve talep olan katlarda durur</li>
              <li>Asansör en tepeye ulaştığında, ters yöne döner ve aşağı inmeye başlar, talep olan her katta durmaya devam eder</li>
              <li>Bu yapı devam eder her kata iki yönde de hizmet verir</li>
            </ul>
            <p className="mt-2">
            Bu sebeple SCAN algoritması işletim sistemlerinde "asansör algoritması" olarak adlandırılır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCANPage;