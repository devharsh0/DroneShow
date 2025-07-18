import { DronePosition } from '../types/drone';

const letterPatterns: { [key: string]: number[][] } = {
  'A': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [0, 6], [7, 6]
  ],
  'B': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [6, 1],
    [0, 2], [6, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
    [0, 4], [6, 4],
    [0, 5], [6, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'C': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'D': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
    [0, 1], [6, 1],
    [0, 2], [7, 2],
    [0, 3], [7, 3],
    [0, 4], [7, 4],
    [0, 5], [6, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]
  ],
  'E': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [0, 1],
    [0, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
    [0, 4],
    [0, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6]
  ],
  'F': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [0, 1],
    [0, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
    [0, 4],
    [0, 5],
    [0, 6]
  ],
  'G': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2],
    [0, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'H': [
    [0, 0], [7, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [0, 6], [7, 6]
  ],
  'I': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'J': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [0, 4], [5, 4],
    [0, 5], [5, 5],
    [1, 6], [2, 6], [3, 6], [4, 6]
  ],
  'K': [
    [0, 0], [6, 0],
    [0, 1], [5, 1],
    [0, 2], [4, 2],
    [0, 3], [1, 3], [2, 3], [3, 3],
    [0, 4], [4, 4],
    [0, 5], [5, 5],
    [0, 6], [6, 6]
  ],
  'L': [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'M': [
    [0, 0], [7, 0],
    [0, 1], [1, 1], [6, 1], [7, 1],
    [0, 2], [2, 2], [5, 2], [7, 2],
    [0, 3], [3, 3], [4, 3], [7, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [0, 6], [7, 6]
  ],
  'N': [
    [0, 0], [7, 0],
    [0, 1], [1, 1], [7, 1],
    [0, 2], [2, 2], [7, 2],
    [0, 3], [3, 3], [7, 3],
    [0, 4], [4, 4], [7, 4],
    [0, 5], [5, 5], [7, 5],
    [0, 6], [6, 6], [7, 6]
  ],
  'O': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [7, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'P': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [0, 4],
    [0, 5],
    [0, 6]
  ],
  'Q': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [4, 3], [7, 3],
    [0, 4], [5, 4], [7, 4],
    [0, 5], [6, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6]
  ],
  'R': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [0, 4], [4, 4],
    [0, 5], [5, 5],
    [0, 6], [6, 6]
  ],
  'S': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [0, 1],
    [0, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [7, 4],
    [7, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'T': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6]
  ],
  'U': [
    [0, 0], [7, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [7, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  'V': [
    [0, 0], [7, 0],
    [0, 1], [7, 1],
    [1, 2], [6, 2],
    [1, 3], [6, 3],
    [2, 4], [5, 4],
    [2, 5], [5, 5],
    [3, 6], [4, 6]
  ],
  'W': [
    [0, 0], [7, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [0, 3], [3, 3], [4, 3], [7, 3],
    [0, 4], [2, 4], [5, 4], [7, 4],
    [0, 5], [1, 5], [6, 5], [7, 5],
    [0, 6], [7, 6]
  ],
  'X': [
    [0, 0], [7, 0],
    [1, 1], [6, 1],
    [2, 2], [5, 2],
    [3, 3], [4, 3],
    [2, 4], [5, 4],
    [1, 5], [6, 5],
    [0, 6], [7, 6]
  ],
  'Y': [
    [0, 0], [7, 0],
    [1, 1], [6, 1],
    [2, 2], [5, 2],
    [3, 3], [4, 3],
    [3, 4],
    [3, 5],
    [3, 6]
  ],
  'Z': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [6, 1],
    [5, 2],
    [4, 3],
    [3, 4],
    [2, 5],
    [1, 6],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6]
  ],
  '0': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [6, 1], [7, 1],
    [0, 2], [5, 2], [7, 2],
    [0, 3], [4, 3], [7, 3],
    [0, 4], [3, 4], [7, 4],
    [0, 5], [2, 5], [7, 5],
    [0, 6], [1, 6], [7, 6],
    [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]
  ],
  '1': [
    [2, 0], [3, 0],
    [1, 1], [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  '2': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [7, 2],
    [6, 3],
    [5, 4],
    [4, 5],
    [3, 6],
    [2, 7],
    [1, 8],
    [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9]
  ],
  '3': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [7, 1],
    [7, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [7, 4],
    [7, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  '4': [
    [0, 0], [6, 0],
    [0, 1], [6, 1],
    [0, 2], [6, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [6, 4],
    [6, 5],
    [6, 6]
  ],
  '5': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [0, 1],
    [0, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [7, 4],
    [7, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  '6': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1],
    [0, 2],
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  '7': [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [7, 1],
    [6, 2],
    [5, 3],
    [4, 4],
    [3, 5],
    [2, 6]
  ],
  '8': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [0, 4], [7, 4],
    [0, 5], [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  '9': [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [7, 1],
    [0, 2], [7, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
    [7, 4],
    [7, 5],
    [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]
  ],
  ' ': [] // Space character
};

export function generateTextFormation(text: string): DronePosition[] {
  const positions: DronePosition[] = [];
  const letters = text.toUpperCase().split('');
  const letterSpacing = 10;
  const scale = 1.5;
  
  let currentX = -(letters.length * letterSpacing) / 2;
  
  letters.forEach((letter, letterIndex) => {
    const pattern = letterPatterns[letter] || [];
    const hue = (letterIndex * 60) % 360;
    
    pattern.forEach(([x, y]) => {
      positions.push({
        x: currentX + x * scale,
        y: (3 - y) * scale,
        z: Math.sin(letterIndex + x * 0.1) * 2,
        color: `hsl(${hue}, 100%, 70%)`
      });
    });
    
    currentX += letterSpacing;
  });
  
  return positions;
}