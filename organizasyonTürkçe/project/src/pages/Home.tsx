import React from 'react';
import { ArrowRightIcon, BookIcon, CpuIcon, AreaChart, Stars } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'FCFS Algoritması',
    description: 'İlk gelen ilk hizmet (FCFS) algoritması, disk taleplerini optimizasyon yapmadan geldikleri sırayla işler.',
    icon: CpuIcon,
  },
  {
    name: 'SCAN Algoritması',
    description: 'Disk kafası bir yönde hareket ederken, o yöndeki tüm talepleri işler ve en son talepten sonra yön değiştirir.',
    icon: ArrowRightIcon,
  },
  {
    name: 'SSTF Algoritması',
    description: 'En yakın disk talebini seçerek, disk kafasının hareketini en aza indirmeye çalışır.',
    icon: Stars,
  },
  {
    name: 'Performanslarını Karşılaştır',
    description: 'Algoritmaların performansını karşılaştırmak için görselleştirme aracı ile farklı algoritmaların nasıl çalıştığını ve hangi durumlarda daha iyi performans gösterdiğini keşfedin.',
    icon: AreaChart,
  },
];

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
            <span className="text-indigo-600 dark:text-indigo-400">Disk Yönetim</span> Algoritmaları
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            İnteraktif görselleştirmeler ile disk zamanlama algoritmalarının nasıl çalıştığını anlamak ve performanslarını karşılaştırmak için.
          </p>
        </motion.div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center">
            <BookIcon className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">Disk Yönetim Algoritmaları Nedir?</h2>
          </div>
          <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              Disk Yönetim algoritmaları, işletim sistemleri tarafından disk girdi/çıktı taleplerinin hangi sırayla hizmet edileceğini belirlemek için kullanılan tekniklerdir.
              Temel hedef, disk kafa hareketini en aza indirmek, bu da arama süresini azaltır ve genel sistem performansını artırır.
            </p>
            <p>
              Birden çok program aynı anda bir diskten veri talep ettiğinde, işletim sistemi hangi isteği önce ele alacağına karar vermelidir.
              Farklı algoritmalar, bu kararı isteğin konumu, varış zamanı veya her ikisinin bir kombinasyonu gibi çeşitli faktörlere göre verir.
            </p>
            <p>
              Bu uygulama farklı disk zamanlama algoritmalarının nasıl çalıştığını görselleştirmenize ve anlamanıza yardımcı olur, böylece çeşitli senaryoların güçlü ve zayıf yönlerini görebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <feature.icon className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Öğrenmeye Hazır Mısın?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Üstteki arama çubuğundan bir algoritma seçerek, disk taleplerini nasıl ele
          aldığını görselleştirebilir veya karşılaştırma aracına atlayarak hangi algoritmanın belirli kullanım durumunuz için en iyi performansı gösterdiğini görebilirsiniz.
        </p>
        </section>
    </div>
  );
};

export default Home;