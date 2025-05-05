/**
 * Shortest Seek Time First (SSTF) Disk Scheduling Algorithm
 * 
 * In SSTF, the disk head moves to the closest request first.
 * This minimizes seek time but may cause starvation for some requests.
 */

import { AlgorithmResult } from './fcfs';

export const calculateSSTF = (
  diskPositions: number[],
  initialHeadPosition: number
): AlgorithmResult => {
  if (!diskPositions.length) {
    return {
      headMovements: [initialHeadPosition],
      totalSeekTime: 0,
      averageSeekTime: 0
    };
  }

  const unserviced = [...diskPositions];
  const headMovements = [initialHeadPosition];
  
  let totalSeekTime = 0;
  let currentPosition = initialHeadPosition;
  
  while (unserviced.length > 0) {
    let shortestDistance = Infinity;
    let closestIndex = -1;
    
    for (let i = 0; i < unserviced.length; i++) {
      const distance = Math.abs(unserviced[i] - currentPosition);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestIndex = i;
      }
    }
    
    const nextPosition = unserviced[closestIndex];
    headMovements.push(nextPosition);
    totalSeekTime += shortestDistance;
    currentPosition = nextPosition;
    
    unserviced.splice(closestIndex, 1);
  }
  
  const averageSeekTime = diskPositions.length > 0 ? totalSeekTime / diskPositions.length : 0;
  
  return {
    headMovements,
    totalSeekTime,
    averageSeekTime,
  };
};

export const getSSTFDescription = (): string => {
  return `En Kısa Seek Zamanı İlk (SSTF) algoritması, mevcut konumdan en az başlık hareketi gerektiren isteği seçer.
    Bu algoritma, gelen isteklerin sırasına bakmaksızın en kısa seek zamanını minimize eder.

    Bu yaklaşım toplam seek zamanını minimize etse de, bazı isteklerin "açlık" durumuna düşmesine neden olabilir.
    Eğer yeni istekler sürekli olarak mevcut başlık konumuna daha yakınsa, daha eski isteklerin daha uzak olması durumunda
    bu durum ortaya çıkabilir.`;
};