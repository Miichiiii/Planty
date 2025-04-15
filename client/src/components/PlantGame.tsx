import { useEffect } from "react";
import { usePlantStore } from "../lib/stores/usePlantStore";
import Plant from "./Plant";
import UpgradePanel from "./UpgradePanel";
import EnergyCounter from "./EnergyCounter";
import QuestPanel from "./QuestPanel";
import { useQuestStore } from "../lib/stores/useQuestStore";
import { useGameSounds } from "../hooks/useGameSounds";
import { useAutomaticEnergy } from "../hooks/useAutomaticEnergy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAudio } from "@/lib/stores/useAudio";

export default function PlantGame() {
  const { loadGame, saveGame, energy } = usePlantStore();
  const { checkQuestCompletion } = useQuestStore();
  const { toggleMute, isMuted } = useAudio();
  
  // Initialize game sounds
  useGameSounds();
  
  // Set up automatic energy generation from upgrades
  useAutomaticEnergy();

  // Load game data on initial render
  useEffect(() => {
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save game data when energy changes
  useEffect(() => {
    saveGame();
    checkQuestCompletion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [energy]);

  return (
    <div className="flex flex-col items-center w-full max-w-6xl p-4 gap-6">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-4xl font-bold text-green-800">PflanzenPower</h1>
        <button 
          onClick={() => {
            toggleMute();
            toast(isMuted ? "Sound turned on!" : "Sound turned off!");
          }}
          className="p-2 rounded-full bg-green-100 hover:bg-green-200"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </header>
      
      <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-h-[500px] flex flex-col items-center justify-center">
          <Plant />
          <EnergyCounter />
        </div>
        
        <div className="flex-1">
          <Tabs defaultValue="upgrades" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="upgrades" className="flex-1">Upgrades</TabsTrigger>
              <TabsTrigger value="quests" className="flex-1">Quests</TabsTrigger>
            </TabsList>
            <TabsContent value="upgrades">
              <UpgradePanel />
            </TabsContent>
            <TabsContent value="quests">
              <QuestPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <footer className="mt-auto text-sm text-gray-500">
        PflanzenPower v1.0 - Grow your plant to greatness!
      </footer>
    </div>
  );
}
