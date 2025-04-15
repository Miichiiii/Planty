import { useQuestStore } from "../lib/stores/useQuestStore";
import { usePlantStore } from "../lib/stores/usePlantStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAudio } from "@/lib/stores/useAudio";

export default function QuestPanel() {
  const { quests, completeQuest } = useQuestStore();
  const { addEnergy } = usePlantStore();
  const { playSuccess } = useAudio();
  
  const handleClaimReward = (questId: string, reward: number) => {
    completeQuest(questId);
    addEnergy(reward);
    playSuccess();
    toast.success(`Claimed ${reward} energy as reward!`);
  };
  
  // Group quests by completion status
  const activeQuests = quests.filter(q => !q.completed && !q.claimed);
  const completedQuests = quests.filter(q => q.completed && !q.claimed);
  const claimedQuests = quests.filter(q => q.claimed);
  
  // If all quests are claimed, show a message
  if (activeQuests.length === 0 && completedQuests.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Quests</h2>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">All quests completed! New quests will appear soon.</p>
          </CardContent>
        </Card>
        
        {claimedQuests.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-500 mt-4 mb-2">Completed Quests</h3>
            {claimedQuests.map(quest => (
              <Card key={quest.id} className="mb-2 opacity-60">
                <CardHeader className="pb-2">
                  <CardTitle>{quest.title} ✓</CardTitle>
                  <CardDescription>{quest.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Quests</h2>
      
      {completedQuests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">Ready to Claim</h3>
          {completedQuests.map(quest => (
            <Card key={quest.id} className="mb-2 border-green-300 bg-green-50">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{quest.title}</CardTitle>
                  <span className="text-amber-500 font-bold">{quest.reward} ☀️</span>
                </div>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => handleClaimReward(quest.id, quest.reward)}
                >
                  Claim Reward
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {activeQuests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-2">Active Quests</h3>
          {activeQuests.map(quest => (
            <Card key={quest.id} className="mb-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{quest.title}</CardTitle>
                  <span className="text-amber-500 font-bold">{quest.reward} ☀️</span>
                </div>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` 
                    }}
                  />
                </div>
                <p className="text-right text-xs text-gray-500 mt-1">
                  {quest.progress} / {quest.target}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {claimedQuests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mt-4 mb-2">Completed Quests</h3>
          {claimedQuests.slice(0, 3).map(quest => (
            <Card key={quest.id} className="mb-2 opacity-60">
              <CardHeader className="pb-2">
                <CardTitle>{quest.title} ✓</CardTitle>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
          {claimedQuests.length > 3 && (
            <p className="text-sm text-gray-500 text-center">
              +{claimedQuests.length - 3} more completed quests
            </p>
          )}
        </div>
      )}
    </div>
  );
}
