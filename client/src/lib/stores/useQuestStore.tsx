import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usePlantStore } from "./usePlantStore";
import { quests } from "../quests";

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'energy' | 'clicks' | 'stage' | 'upgrade';
  target: number;
  progress: number;
  reward: number;
  completed: boolean;
  claimed: boolean;
}

interface QuestState {
  quests: Quest[];
  completeQuest: (questId: string) => void;
  checkQuestCompletion: () => void;
}

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      quests: quests,
      
      completeQuest: (questId) => {
        set((state) => ({
          quests: state.quests.map((quest) => {
            if (quest.id === questId) {
              return {
                ...quest,
                claimed: true,
              };
            }
            return quest;
          }),
        }));
      },
      
      checkQuestCompletion: () => {
        const plantStore = usePlantStore.getState();
        const { energy, plantStage, upgradeStats } = plantStore;
        
        set((state) => ({
          quests: state.quests.map((quest) => {
            if (quest.completed) return quest;
            
            let newProgress = quest.progress;
            
            // Update progress based on quest type
            if (quest.type === 'energy') {
              newProgress = energy;
            } else if (quest.type === 'stage') {
              newProgress = plantStage;
            } else if (quest.type === 'upgrade') {
              // Sum up all upgrade levels
              newProgress = Object.values(upgradeStats).reduce(
                (sum, stat) => sum + stat.level, 0
              );
            }
            
            // Check if quest is completed
            const completed = newProgress >= quest.target;
            
            return {
              ...quest,
              progress: newProgress,
              completed,
            };
          }),
        }));
      },
    }),
    {
      name: "pflanzen-power-quests",
    }
  )
);
