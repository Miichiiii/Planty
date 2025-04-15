import { useState, useEffect, useRef } from "react";
import { usePlantStore } from "../lib/stores/usePlantStore";
import { plantStages } from "../lib/plantStages";
import { useAudio } from "../lib/stores/useAudio";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { toast } from "sonner";

// Component to render the plant in 3D
function Plant3D({ stageIndex }: { stageIndex: number }) {
  const stage = plantStages[stageIndex];

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      
      <group position={[0, -1, 0]} rotation={[0, Math.PI / 6, 0]}>
        {/* Base/Pot */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1.2, 1, 32]} />
          <meshStandardMaterial color="#964B00" />
        </mesh>
        
        {/* Soil */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshStandardMaterial color="#5D4037" roughness={1} />
        </mesh>
        
        {/* Stem */}
        <mesh position={[0, stage.stemHeight / 2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.15, stage.stemHeight, 8]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
        
        {/* Leaves */}
        {stage.leaves.map((leaf, index) => (
          <group key={index} position={[leaf.x, leaf.y, leaf.z]} rotation={[0, (index * Math.PI) / 3, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.3, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#81C784" side={2} />
            </mesh>
          </group>
        ))}
        
        {/* Flowers/Blooms if any */}
        {stage.flowers && stage.flowers.map((flower, index) => (
          <group key={`flower-${index}`} position={[flower.x, flower.y, flower.z]}>
            <mesh castShadow>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshStandardMaterial color={flower.color} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

export default function Plant() {
  const { 
    energy, 
    addEnergy, 
    clickPower, 
    plantStage, 
    checkEvolution,
    clickEffect,
    triggerClickEffect
  } = usePlantStore();
  
  const { playHit } = useAudio();
  const [isClicking, setIsClicking] = useState(false);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handlePlantClick = () => {
    // Add energy based on current click power
    addEnergy(clickPower);
    
    // Play hit sound
    playHit();
    
    // Trigger animation and click effect
    setIsClicking(true);
    triggerClickEffect();
    
    // Check if the plant can evolve
    const didEvolve = checkEvolution();
    if (didEvolve) {
      toast.success("Your plant evolved to a new stage!");
    }
    
    // Reset clicking state
    setTimeout(() => setIsClicking(false), 150);
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale(0.8);
      } else {
        setScale(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full max-w-md aspect-square">
      <motion.div 
        className="w-full h-full cursor-pointer"
        animate={{ 
          scale: isClicking ? 0.95 : 1,
        }}
        transition={{ duration: 0.1 }}
        onClick={handlePlantClick}
      >
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Plant3D stageIndex={plantStage} />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
        </Canvas>
      </motion.div>
      
      {/* Click effects - show sun icons when clicking */}
      {clickEffect.map((effect, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl pointer-events-none"
          initial={{ 
            x: effect.x, 
            y: effect.y, 
            opacity: 1, 
            scale: 0.5 
          }}
          animate={{ 
            y: effect.y - 80, 
            opacity: 0, 
            scale: 1 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ☀️+{clickPower}
        </motion.div>
      ))}
    </div>
  );
}
