export interface DronePosition {
  x: number;
  y: number;
  z: number;
  color?: string;
}

export interface Formation {
  id: string;
  name: string;
  positions: DronePosition[];
  duration?: number;
  description?: string;
}

export interface DroneShowConfig {
  numDrones: number;
  transitionDuration: number;
  autoplayInterval: number;
  cameraDistance: number;
}