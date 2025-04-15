import { Howl } from "howler";
import { useEffect } from "react";
import { Toaster } from "sonner";
import PlantGame from "./components/PlantGame";
import { useAudio } from "./lib/stores/useAudio";

function App() {
  // Initialize audio elements
  useEffect(() => {
    const backgroundMusic = new Howl({
      src: ["/sounds/background.mp3"],
      loop: true,
      volume: 0.3,
      preload: true,
    });

    const hitSound = new Howl({
      src: ["/sounds/hit.mp3"],
      volume: 0.4,
      preload: true,
    });

    const successSound = new Howl({
      src: ["/sounds/success.mp3"],
      volume: 0.5,
      preload: true,
    });

    // Store references in the audio store
    useAudio.getState().setBackgroundMusic(backgroundMusic);
    useAudio.getState().setHitSound(hitSound);
    useAudio.getState().setSuccessSound(successSound);

    return () => {
      // Clean up audio when component unmounts
      backgroundMusic.stop();
      backgroundMusic.unload();
      hitSound.unload();
      successSound.unload();
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <PlantGame />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
