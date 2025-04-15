import { useEffect } from "react";
import { Howl } from "howler";
import { useAudio } from "@/lib/stores/useAudio";

export function useGameSounds() {
  const { 
    backgroundMusic, 
    hitSound, 
    successSound, 
    isMuted 
  } = useAudio();

  // Start background music when component mounts
  useEffect(() => {
    if (backgroundMusic) {
      // Play and loop background music
      backgroundMusic.volume(0.3);
      
      // Only play if not muted
      if (!isMuted) {
        backgroundMusic.play();
      } else {
        backgroundMusic.pause();
      }
      
      // Cleanup on unmount
      return () => {
        backgroundMusic.stop();
      };
    }
  }, [backgroundMusic, isMuted]);

  // Setup hit sound
  useEffect(() => {
    if (hitSound) {
      hitSound.volume(0.4);
    }
  }, [hitSound]);

  // Setup success sound
  useEffect(() => {
    if (successSound) {
      successSound.volume(0.5);
    }
  }, [successSound]);

  // Listen for mute state changes
  useEffect(() => {
    if (backgroundMusic) {
      if (isMuted) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play();
      }
    }
  }, [isMuted, backgroundMusic]);

  return null;
}
