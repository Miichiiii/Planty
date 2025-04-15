import { usePlantStore } from "../lib/stores/usePlantStore";
import { upgrades, UpgradeType } from "../lib/upgrades";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { toast } from "sonner";
import { useAudio } from "@/lib/stores/useAudio";

export default function UpgradePanel() {
  const { 
    energy, 
    upgradeStats, 
    purchaseUpgrade, 
    clickPower, 
    energyPerSecond 
  } = usePlantStore();
  
  const { playSuccess } = useAudio();
  
  const handlePurchase = (type: UpgradeType, level: number, cost: number) => {
    if (energy >= cost) {
      purchaseUpgrade(type, level, cost);
      playSuccess();
      toast.success(`Upgraded ${type} to level ${level}!`);
    } else {
      toast.error("Not enough energy!");
    }
  };
  
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Click Power</CardTitle>
            <CardDescription>Energy gained per click</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-500">{clickPower} ☀️</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Auto Power</CardTitle>
            <CardDescription>Energy gained per second</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">{energyPerSecond.toFixed(1)} ☀️/s</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Available Upgrades</h2>
      
      {Object.entries(upgrades).map(([upgradeType, upgradeDetails]) => {
        const type = upgradeType as UpgradeType;
        const currentLevel = upgradeStats[type].level;
        const nextLevel = currentLevel + 1;
        const upgrade = upgradeDetails.levels[nextLevel];
        
        // If no more upgrades available, return null
        if (!upgrade) return null;
        
        const canAfford = energy >= upgrade.cost;
        
        return (
          <Card key={type} className={`mb-2 border ${canAfford ? 'border-green-200' : 'border-gray-200'}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>
                  <div className="flex items-center gap-2">
                    {type === 'leaves' && '🍃'}
                    {type === 'stem' && '🌱'}
                    {type === 'roots' && '🌾'}
                    {upgradeDetails.name} (Lvl {currentLevel})
                  </div>
                </CardTitle>
                <span className={`font-semibold ${canAfford ? 'text-green-600' : 'text-red-500'}`}>
                  {upgrade.cost} ☀️
                </span>
              </div>
              <CardDescription>{upgradeDetails.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="space-y-1">
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>Effect:</span> 
                  <span className="font-medium text-blue-600">
                    {upgradeDetails.effectDescription.replace('{value}', String(upgrade.value))}
                  </span>
                </div>
                
                <Progress value={(energy / upgrade.cost) * 100} max={100} className="h-2" />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handlePurchase(type, nextLevel, upgrade.cost)}
                className="w-full"
                disabled={!canAfford}
                variant={canAfford ? "default" : "outline"}
              >
                Purchase Upgrade
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
