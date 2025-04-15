import { usePlantStore } from "../lib/stores/usePlantStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { plantStages } from "../lib/plantStages";

export default function EnergyCounter() {
  const { energy, plantStage } = usePlantStore();
  const [displayedEnergy, setDisplayedEnergy] = useState(energy);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentPlantStage = plantStages[plantStage];
  const nextPlantStage = plantStages[plantStage + 1];
  const progressToNextStage = nextPlantStage 
    ? Math.min(energy / nextPlantStage.requiredEnergy, 1) * 100 
    : 100;
  
  // Smooth animation for energy counter
  useEffect(() => {
    if (energy !== displayedEnergy) {
      setIsAnimating(true);
      
      // Animate with a small delay for visual effect
      const timeout = setTimeout(() => {
        setDisplayedEnergy(energy);
        setIsAnimating(false);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [energy, displayedEnergy]);

  return (
    <div className="w-full max-w-md mt-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-green-800">Solar Energy</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={isAnimating ? "animating" : "static"}
            initial={{ scale: isAnimating ? 1.2 : 1, color: "#f59e0b" }}
            animate={{ scale: 1, color: "#000000" }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold flex items-center"
          >
            {displayedEnergy.toLocaleString()} <span className="text-yellow-500 ml-1">☀️</span>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Plant Stage: {currentPlantStage.name}</span>
          {nextPlantStage && (
            <span>Next: {nextPlantStage.name} ({nextPlantStage.requiredEnergy.toLocaleString()} ☀️)</span>
          )}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressToNextStage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
