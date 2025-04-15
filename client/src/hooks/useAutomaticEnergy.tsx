import { useEffect, useRef } from "react";
import { usePlantStore } from "@/lib/stores/usePlantStore";

export function useAutomaticEnergy() {
  const { energyPerSecond, addEnergy } = usePlantStore();
  const lastTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Only set up timer if we have auto energy
    if (energyPerSecond <= 0) return;
    
    // Set up animation frame for energy generation
    const updateEnergy = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        requestAnimationFrame(updateEnergy);
        return;
      }
      
      // Calculate time difference in seconds
      const deltaTime = (time - lastTimeRef.current) / 1000;
      
      // Add energy based on time passed
      const energyToAdd = energyPerSecond * deltaTime;
      if (energyToAdd > 0) {
        addEnergy(energyToAdd);
      }
      
      // Update last time
      lastTimeRef.current = time;
      
      // Request next frame
      requestAnimationFrame(updateEnergy);
    };
    
    // Start the loop
    const animationId = requestAnimationFrame(updateEnergy);
    
    // Clean up animation frame on unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [energyPerSecond, addEnergy]);
  
  return null;
}
