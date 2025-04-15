export interface PlantLeaf {
  x: number;
  y: number;
  z: number;
}

export interface PlantFlower {
  x: number;
  y: number;
  z: number;
  color: string;
}

export interface PlantStage {
  name: string;
  stemHeight: number;
  leaves: PlantLeaf[];
  flowers?: PlantFlower[];
  requiredEnergy: number;
}

export const plantStages: PlantStage[] = [
  // Stage 0: Seedling
  {
    name: "Seedling",
    stemHeight: 0.5,
    leaves: [
      { x: 0.2, y: 0.5, z: 0 },
      { x: -0.2, y: 0.5, z: 0 },
    ],
    requiredEnergy: 0,
  },
  
  // Stage 1: Small Plant
  {
    name: "Sprout",
    stemHeight: 1.0,
    leaves: [
      { x: 0.3, y: 0.6, z: 0 },
      { x: -0.3, y: 0.6, z: 0 },
      { x: 0.25, y: 0.9, z: 0.1 },
      { x: -0.25, y: 0.9, z: -0.1 },
    ],
    requiredEnergy: 100,
  },
  
  // Stage 2: Medium Plant
  {
    name: "Young Plant",
    stemHeight: 1.5,
    leaves: [
      { x: 0.4, y: 0.7, z: 0 },
      { x: -0.4, y: 0.7, z: 0 },
      { x: 0.3, y: 1.0, z: 0.2 },
      { x: -0.3, y: 1.0, z: -0.2 },
      { x: 0.2, y: 1.3, z: 0.1 },
      { x: -0.2, y: 1.3, z: -0.1 },
    ],
    requiredEnergy: 1000,
  },
  
  // Stage 3: Large Plant with small buds
  {
    name: "Budding Plant",
    stemHeight: 2.0,
    leaves: [
      { x: 0.5, y: 0.8, z: 0 },
      { x: -0.5, y: 0.8, z: 0 },
      { x: 0.4, y: 1.2, z: 0.3 },
      { x: -0.4, y: 1.2, z: -0.3 },
      { x: 0.3, y: 1.6, z: 0.2 },
      { x: -0.3, y: 1.6, z: -0.2 },
      { x: 0, y: 1.9, z: 0 },
    ],
    flowers: [
      { x: 0, y: 2.0, z: 0, color: "#FF9999" },
      { x: 0.2, y: 1.7, z: 0.2, color: "#FF9999" },
      { x: -0.2, y: 1.7, z: -0.2, color: "#FF9999" },
    ],
    requiredEnergy: 10000,
  },
  
  // Stage 4: Flowering Plant
  {
    name: "Flowering Plant",
    stemHeight: 2.5,
    leaves: [
      { x: 0.6, y: 0.9, z: 0 },
      { x: -0.6, y: 0.9, z: 0 },
      { x: 0.5, y: 1.3, z: 0.4 },
      { x: -0.5, y: 1.3, z: -0.4 },
      { x: 0.4, y: 1.7, z: 0.3 },
      { x: -0.4, y: 1.7, z: -0.3 },
      { x: 0.3, y: 2.1, z: 0.2 },
      { x: -0.3, y: 2.1, z: -0.2 },
      { x: 0, y: 2.4, z: 0 },
    ],
    flowers: [
      { x: 0, y: 2.5, z: 0, color: "#FF4D4D" },
      { x: 0.3, y: 2.2, z: 0.3, color: "#FF4D4D" },
      { x: -0.3, y: 2.2, z: -0.3, color: "#FF4D4D" },
      { x: 0.4, y: 1.8, z: 0.4, color: "#FF6666" },
      { x: -0.4, y: 1.8, z: -0.4, color: "#FF6666" },
      { x: 0.5, y: 1.4, z: 0.5, color: "#FF9999" },
      { x: -0.5, y: 1.4, z: -0.5, color: "#FF9999" },
    ],
    requiredEnergy: 100000,
  },
  
  // Stage 5: Majestic Blooming Plant
  {
    name: "Majestic Bloom",
    stemHeight: 3.0,
    leaves: [
      { x: 0.7, y: 1.0, z: 0 },
      { x: -0.7, y: 1.0, z: 0 },
      { x: 0.6, y: 1.4, z: 0.5 },
      { x: -0.6, y: 1.4, z: -0.5 },
      { x: 0.5, y: 1.8, z: 0.4 },
      { x: -0.5, y: 1.8, z: -0.4 },
      { x: 0.4, y: 2.2, z: 0.3 },
      { x: -0.4, y: 2.2, z: -0.3 },
      { x: 0.3, y: 2.6, z: 0.2 },
      { x: -0.3, y: 2.6, z: -0.2 },
      { x: 0, y: 2.9, z: 0 },
    ],
    flowers: [
      { x: 0, y: 3.0, z: 0, color: "#FF4D4D" },
      { x: 0.3, y: 2.7, z: 0.3, color: "#FF4D4D" },
      { x: -0.3, y: 2.7, z: -0.3, color: "#FF4D4D" },
      { x: 0.4, y: 2.3, z: 0.4, color: "#FF6666" },
      { x: -0.4, y: 2.3, z: -0.4, color: "#FF6666" },
      { x: 0.5, y: 1.9, z: 0.5, color: "#FF9999" },
      { x: -0.5, y: 1.9, z: -0.5, color: "#FF9999" },
      { x: 0.6, y: 1.5, z: 0.6, color: "#FFCCCC" },
      { x: -0.6, y: 1.5, z: -0.6, color: "#FFCCCC" },
      { x: 0, y: 2.5, z: 0.4, color: "#FFAAAA" },
      { x: 0, y: 2.5, z: -0.4, color: "#FFAAAA" },
      { x: 0.4, y: 2.5, z: 0, color: "#FF8888" },
      { x: -0.4, y: 2.5, z: 0, color: "#FF8888" },
    ],
    requiredEnergy: 1000000,
  },
];
