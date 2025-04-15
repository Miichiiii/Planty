export type UpgradeType = 'leaves' | 'stem' | 'roots';

interface UpgradeLevel {
  value: number;
  cost: number;
}

export interface Upgrade {
  name: string;
  description: string;
  effectDescription: string;
  levels: Record<number, UpgradeLevel>;
}

export const upgrades: Record<UpgradeType, Upgrade> = {
  leaves: {
    name: 'Leaves',
    description: 'Increases energy gained per click',
    effectDescription: '+{value} energy per click',
    levels: {
      1: { value: 1, cost: 10 },
      2: { value: 2, cost: 50 },
      3: { value: 4, cost: 200 },
      4: { value: 8, cost: 500 },
      5: { value: 15, cost: 1000 },
      6: { value: 25, cost: 2500 },
      7: { value: 40, cost: 5000 },
      8: { value: 60, cost: 10000 },
      9: { value: 100, cost: 25000 },
      10: { value: 150, cost: 50000 },
      11: { value: 250, cost: 100000 },
      12: { value: 400, cost: 250000 },
      13: { value: 700, cost: 500000 },
      14: { value: 1200, cost: 1000000 },
      15: { value: 2000, cost: 2500000 },
    },
  },
  stem: {
    name: 'Stem',
    description: 'Generates energy automatically over time',
    effectDescription: '{value} energy per second',
    levels: {
      1: { value: 0.1, cost: 25 },
      2: { value: 0.3, cost: 100 },
      3: { value: 0.7, cost: 300 },
      4: { value: 1.5, cost: 750 },
      5: { value: 3, cost: 1500 },
      6: { value: 5, cost: 3000 },
      7: { value: 8, cost: 6000 },
      8: { value: 15, cost: 12000 },
      9: { value: 25, cost: 25000 },
      10: { value: 40, cost: 50000 },
      11: { value: 70, cost: 100000 },
      12: { value: 120, cost: 250000 },
      13: { value: 200, cost: 500000 },
      14: { value: 350, cost: 1000000 },
      15: { value: 600, cost: 2500000 },
    },
  },
  roots: {
    name: 'Roots',
    description: 'Multiplies all energy gains',
    effectDescription: '+{value}% to all energy gains',
    levels: {
      1: { value: 5, cost: 50 },
      2: { value: 10, cost: 200 },
      3: { value: 15, cost: 500 },
      4: { value: 20, cost: 1200 },
      5: { value: 30, cost: 3000 },
      6: { value: 40, cost: 7500 },
      7: { value: 50, cost: 20000 },
      8: { value: 75, cost: 50000 },
      9: { value: 100, cost: 125000 },
      10: { value: 150, cost: 300000 },
      11: { value: 200, cost: 750000 },
      12: { value: 300, cost: 1500000 },
      13: { value: 400, cost: 3000000 },
      14: { value: 500, cost: 7500000 },
      15: { value: 750, cost: 15000000 },
    },
  },
};
