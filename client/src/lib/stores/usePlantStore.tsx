import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UpgradeType, upgrades } from "../upgrades";
import { plantStages } from "../plantStages";

interface ClickEffect {
  x: number;
  y: number;
  key: number;
}

interface UpgradeStats {
  level: number;
  value: number;
}

interface PlantState {
  // Core stats
  energy: number;
  clickPower: number;
  energyPerSecond: number;
  plantStage: number;
  
  // Upgrade stats
  upgradeStats: Record<UpgradeType, UpgradeStats>;
  
  // Click effects
  clickEffect: ClickEffect[];
  
  // Actions
  addEnergy: (amount: number) => void;
  purchaseUpgrade: (type: UpgradeType, level: number, cost: number) => void;
  checkEvolution: () => boolean;
  triggerClickEffect: () => void;
  
  // Persistence
  saveGame: () => void;
  loadGame: () => void;
  resetGame: () => void;
}

export const usePlantStore = create<PlantState>()(
  persist(
    (set, get) => ({
      // Initial stats
      energy: 0,
      clickPower: 1,
      energyPerSecond: 0,
      plantStage: 0,
      
      // Initial upgrade stats
      upgradeStats: {
        leaves: { level: 0, value: 0 },
        stem: { level: 0, value: 0 },
        roots: { level: 0, value: 0 },
      },
      
      // Click effects array
      clickEffect: [],
      
      // Add energy to the player's total
      addEnergy: (amount) => set((state) => ({ energy: state.energy + amount })),
      
      // Purchase an upgrade
      purchaseUpgrade: (type, level, cost) => {
        const state = get();
        
        // Check if player has enough energy
        if (state.energy < cost) return;
        
        // Define the upgrade effect based on type
        const upgrade = upgrades[type].levels[level];
        if (!upgrade) return;
        
        // Apply the upgrade
        const newStats = { ...state.upgradeStats };
        newStats[type] = { level, value: upgrade.value };
        
        // Calculate new click power and energy per second
        let newClickPower = state.clickPower;
        let newEnergyPerSecond = state.energyPerSecond;
        
        if (type === 'leaves') {
          newClickPower = 1 + newStats.leaves.value;
        } else if (type === 'stem') {
          newEnergyPerSecond = newStats.stem.value;
        } else if (type === 'roots') {
          // Roots provide a multiplier to both click power and energy per second
          const rootMultiplier = 1 + (newStats.roots.value / 100);
          newClickPower = (1 + newStats.leaves.value) * rootMultiplier;
          newEnergyPerSecond = newStats.stem.value * rootMultiplier;
        }
        
        // Update state
        set((state) => ({
          energy: state.energy - cost,
          upgradeStats: newStats,
          clickPower: newClickPower,
          energyPerSecond: newEnergyPerSecond,
        }));
      },
      
      // Check if the plant can evolve to the next stage
      checkEvolution: () => {
        const state = get();
        const nextStage = plantStages[state.plantStage + 1];
        
        if (nextStage && state.energy >= nextStage.requiredEnergy) {
          set({ plantStage: state.plantStage + 1 });
          return true;
        }
        
        return false;
      },
      
      // Add a click effect at a random position
      triggerClickEffect: () => {
        // Generate random position for the click effect within a radius
        const radius = 100; // pixels
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        const newEffect: ClickEffect = {
          x,
          y,
          key: Date.now(),
        };
        
        set((state) => ({
          clickEffect: [...state.clickEffect, newEffect],
        }));
        
        // Remove the effect after 1 second
        setTimeout(() => {
          set((state) => ({
            clickEffect: state.clickEffect.filter(effect => effect.key !== newEffect.key),
          }));
        }, 1000);
      },
      
      // Save game to localStorage (handled by zustand/persist)
      saveGame: () => {},
      
      // Load game from localStorage (handled by zustand/persist)
      loadGame: () => {},
      
      // Reset game progress
      resetGame: () => {
        set({
          energy: 0,
          clickPower: 1,
          energyPerSecond: 0,
          plantStage: 0,
          upgradeStats: {
            leaves: { level: 0, value: 0 },
            stem: { level: 0, value: 0 },
            roots: { level: 0, value: 0 },
          },
          clickEffect: [],
        });
      },
    }),
    {
      name: "pflanzen-power-storage",
    }
  )
);
