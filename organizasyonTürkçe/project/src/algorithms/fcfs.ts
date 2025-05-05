/**
 * First-Come, First-Served (FCFS) Disk Scheduling Algorithm
 * 
 * In FCFS, the disk head simply processes all requests in the order they were received.
 * This is the simplest disk scheduling algorithm.
 */

export interface AlgorithmResult {
  headMovements: number[];
  totalSeekTime: number;
  averageSeekTime: number;
}

export const calculateFCFS = (
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

  const positions = [...diskPositions];
  const headMovements = [initialHeadPosition, ...positions];
  
  let totalSeekTime = 0;
  let currentPosition = initialHeadPosition;
  
  for (const nextPosition of positions) {
    const seekDistance = Math.abs(nextPosition - currentPosition);
    totalSeekTime += seekDistance;
    currentPosition = nextPosition;
  }
  
  const averageSeekTime = totalSeekTime / positions.length;
  
  return {
    headMovements,
    totalSeekTime,
    averageSeekTime,
  };
};

export const getFCFSDescription = (): string => {
  return `First Come First Served (FCFS) algoritmasi var olan en basit disk zamanlama algoritmalarından biridir.
    Bu algoritma, disk erişim taleplerini aldıkları sıraya göre işler ve herhangi bir yeniden sıralama yapmaz.
    Bu basitlik, FCFS'nin uygulanmasını kolaylaştırırken, disk üzerindeki talepler arasında büyük mesafeler varsa
    kötü performansa yol açabilir. Bu durum, başlığın diskin tamamında ileri geri hareket etmesine neden olur
    (bu duruma "thrashing" denir).`;
};