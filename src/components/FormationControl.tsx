import { Formation } from '../types/drone';

export const formations: Formation[] = [
  {
    id: 'line',
    name: 'Line Formation',
    description: 'Drones align in a straight line',
    positions: Array.from({ length: 50 }, (_, i) => ({
      x: (i - 24.5) * 2,
      y: 0,
      z: 0,
      color: `hsl(${(i * 7) % 360}, 100%, 60%)`
    }))
  },
  {
    id: 'circle',
    name: 'Circle Formation',
    description: 'Perfect circular arrangement',
    positions: Array.from({ length: 50 }, (_, i) => {
      const angle = (i / 50) * Math.PI * 2;
      const radius = 20;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.sin(angle * 2) * 5,
        color: `hsl(${(i * 7) % 360}, 100%, 70%)`
      };
    })
  },
  {
    id: 'heart',
    name: 'Heart Formation',
    description: 'Romantic heart shape',
    positions: Array.from({ length: 50 }, (_, i) => {
      const t = (i / 50) * Math.PI * 2;
      const scale = 8;
      return {
        x: scale * 16 * Math.pow(Math.sin(t), 3),
        y: scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
        z: Math.sin(t * 3) * 3,
        color: `hsl(${320 + Math.sin(t) * 40}, 100%, ${60 + Math.cos(t * 2) * 20}%)`
      };
    })
  },
  {
    id: 'star',
    name: 'Star Formation',
    description: 'Five-pointed star pattern',
    positions: Array.from({ length: 50 }, (_, i) => {
      const angle = (i / 50) * Math.PI * 2;
      const radius = (i % 10 < 5) ? 25 : 12;
      const starAngle = (Math.floor(i / 10) * 2 * Math.PI) / 5;
      return {
        x: Math.cos(angle + starAngle) * radius,
        y: Math.sin(angle + starAngle) * radius,
        z: Math.sin(angle * 3) * 4,
        color: `hsl(${45 + (i * 5) % 60}, 100%, 65%)`
      };
    })
  },
  {
    id: 'spiral',
    name: 'Spiral Formation',
    description: 'Ascending spiral pattern',
    positions: Array.from({ length: 50 }, (_, i) => {
      const t = (i / 50) * Math.PI * 6;
      const radius = 15 + (i / 50) * 10;
      return {
        x: Math.cos(t) * radius,
        y: Math.sin(t) * radius,
        z: (i / 50) * 30 - 15,
        color: `hsl(${(i * 8) % 360}, 100%, 60%)`
      };
    })
  },
  {
    id: 'wave',
    name: 'Wave Formation',
    description: 'Flowing wave pattern',
    positions: Array.from({ length: 50 }, (_, i) => {
      const x = (i - 24.5) * 1.5;
      const t = x * 0.1;
      return {
        x,
        y: Math.sin(t) * 10 + Math.cos(t * 2) * 5,
        z: Math.sin(t * 1.5) * 8,
        color: `hsl(${200 + Math.sin(t) * 60}, 100%, 70%)`
      };
    })
  },
  {
    id: '2025',
    name: '2025 Text',
    description: 'New Year 2025',
    positions: [
      // 2
      ...Array.from({ length: 15 }, (_, i) => {
        const coords = [
          [-25, 12], [-20, 12], [-15, 12], [-15, 6], [-20, 6], [-25, 6], [-25, 0], [-20, 0], [-15, 0], [-15, -6], [-20, -6], [-25, -6], [-25, -12], [-20, -12], [-15, -12]
        ];
        return { x: coords[i][0], y: coords[i][1], z: Math.sin(i * 0.5) * 2, color: '#ff6b6b' };
      }),
      // 0
      ...Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 8;
        return {
          x: -5 + Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: Math.sin(i * 0.8) * 3,
          color: '#4ecdc4'
        };
      }),
      // 2
      ...Array.from({ length: 15 }, (_, i) => {
        const coords = [
          [10, 12], [15, 12], [20, 12], [20, 6], [15, 6], [10, 6], [10, 0], [15, 0], [20, 0], [20, -6], [15, -6], [10, -6], [10, -12], [15, -12], [20, -12]
        ];
        return { x: coords[i][0], y: coords[i][1], z: Math.sin(i * 0.5) * 2, color: '#45b7d1' };
      }),
      // 5
      ...Array.from({ length: 18 }, (_, i) => {
        const coords = [
          [25, 12], [30, 12], [35, 12], [25, 6], [25, 0], [30, 0], [35, 0], [35, -6], [30, -6], [25, -6], [25, -12], [30, -12], [35, -12]
        ];
        if (i < coords.length) {
          return { x: coords[i][0], y: coords[i][1], z: Math.sin(i * 0.4) * 2, color: '#ffd93d' };
        }
        return { x: 30, y: 0, z: 0, color: '#ffd93d' };
      })
    ]
  },
  {
    id: 'cube',
    name: 'Cube Formation',
    description: '3D cube structure',
    positions: Array.from({ length: 50 }, (_, i) => {
      const size = 15;
      const edge = Math.floor(i / 8);
      const pos = i % 8;
      const corners = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];
      
      if (pos < 8) {
        return {
          x: corners[pos][0] * size + (Math.random() - 0.5) * 2,
          y: corners[pos][1] * size + (Math.random() - 0.5) * 2,
          z: corners[pos][2] * size + (Math.random() - 0.5) * 2,
          color: `hsl(${(pos * 45) % 360}, 100%, 65%)`
        };
      }
      
      return {
        x: (Math.random() - 0.5) * size * 2,
        y: (Math.random() - 0.5) * size * 2,
        z: (Math.random() - 0.5) * size * 2,
        color: `hsl(${(i * 7) % 360}, 100%, 60%)`
      };
    })
  },
  {
    id: 'galaxy',
    name: 'Galaxy Formation',
    description: 'Spiral galaxy pattern',
    positions: Array.from({ length: 50 }, (_, i) => {
      const arm = Math.floor(i / 12.5);
      const t = (i % 12.5) / 12.5;
      const angle = arm * Math.PI * 0.5 + t * Math.PI * 4;
      const radius = 5 + t * 20;
      
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (Math.random() - 0.5) * 8 + Math.sin(t * Math.PI * 2) * 3,
        color: `hsl(${240 + (i * 3) % 120}, 100%, ${50 + Math.sin(t * Math.PI) * 30}%)`
      };
    })
  }
];

export const getFormation = (id: string): Formation | undefined => {
  return formations.find(f => f.id === id);
};

export const getRandomFormation = (): Formation => {
  return formations[Math.floor(Math.random() * formations.length)];
};