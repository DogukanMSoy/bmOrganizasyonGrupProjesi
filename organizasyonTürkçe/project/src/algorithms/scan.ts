/**
 * SCAN Disk Scheduling Algorithm (Elevator Algorithm)
 * 
 * In SCAN, the disk arm starts at one end and moves toward the other end,
 * servicing requests along the way. When it reaches the other end, it reverses direction.
 * This algorithm is also known as the elevator algorithm.
 */

import { AlgorithmResult } from './fcfs';

export const calculateSCAN = (
  diskPositions: number[],
  initialHeadPosition: number,
  diskSize: number
): AlgorithmResult => {
  // Clone array to avoid modifying the original
  const positions = [...diskPositions];
  
  // Sort all positions
  const sortedPositions = [...positions].sort((a, b) => a - b);
  
  // Find the position where we should start scanning
  const startIndex = sortedPositions.findIndex(pos => pos >= initialHeadPosition);
  
  // Split into right and left parts
  const rightPart = startIndex === -1 ? [] : sortedPositions.slice(startIndex);
  const leftPart = startIndex === -1 ? sortedPositions.reverse() : sortedPositions.slice(0, startIndex).reverse();
  
  // Add disk boundaries if needed
  if (rightPart.length > 0 && rightPart[rightPart.length - 1] < diskSize - 1) {
    rightPart.push(diskSize - 1);
  }
  
  // Combine movements: start → right part → left part
  const sequence = [initialHeadPosition, ...rightPart, ...leftPart];
  
  // Calculate total seek time
  let totalSeekTime = 0;
  let currentPosition = initialHeadPosition;
  
  for (let i = 1; i < sequence.length; i++) {
    const nextPosition = sequence[i];
    const seekDistance = Math.abs(nextPosition - currentPosition);
    totalSeekTime += seekDistance;
    currentPosition = nextPosition;
  }
  
  const averageSeekTime = positions.length > 0 ? totalSeekTime / positions.length : 0;
  
  return {
    headMovements: sequence,
    totalSeekTime,
    averageSeekTime,
  };
};

export const getSCANDescription = (): string => {
  return `SCAN algoritması (aynı zamanda asansör algoritması olarak da bilinir), disk başlığını diskin bir ucundan diğerine
    hareket ettirerek, yol boyunca talepleri işler. Uca ulaştığında yön değiştirir.

    Bu yaklaşım, taleplerin aç kalmasını önler ve FCFS'den daha öngörülebilir bir bekleme süresi sağlar.
    Algoritma, diskin yüzeyinde yukarı ve aşağı hareket eden bir asansör gibi "tarama" yaptığı için bu ismi alır.
    Bu algoritma, disk üzerindeki taleplerin daha düzenli bir şekilde işlenmesini sağlar ve başlığın
    diskin her iki ucunda da hareket etmesini sağlar. Bu, başlığın diskin tamamında ileri geri hareket etmesini
    önler ve taleplerin daha düzenli bir şekilde işlenmesini sağlar.`;
};