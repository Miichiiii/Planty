import { Howl } from "howler";

// Define sound types and their associated files
export const sounds = {
  background: {
    src: "/sounds/background.mp3",
    options: {
      loop: true,
      volume: 0.3,
      preload: true,
    },
  },
  click: {
    src: "/sounds/hit.mp3",
    options: {
      volume: 0.4,
      preload: true,
    },
  },
  upgrade: {
    src: "/sounds/success.mp3",
    options: {
      volume: 0.5,
      preload: true,
    },
  },
};

// Load and cache sound instances
const soundInstances: Record<string, Howl> = {};

export const loadSound = (key: keyof typeof sounds): Howl => {
  if (!soundInstances[key]) {
    const sound = sounds[key];
    soundInstances[key] = new Howl({
      src: [sound.src],
      ...sound.options,
    });
  }
  return soundInstances[key];
};

// Play a sound
export const playSound = (key: keyof typeof sounds): void => {
  const sound = loadSound(key);
  sound.play();
};

// Stop a specific sound
export const stopSound = (key: keyof typeof sounds): void => {
  if (soundInstances[key]) {
    soundInstances[key].stop();
  }
};

// Stop all sounds
export const stopAllSounds = (): void => {
  Object.values(soundInstances).forEach((sound) => {
    sound.stop();
  });
};

// Set global volume for all sounds
export const setVolume = (volume: number): void => {
  Howler.volume(volume);
};

// Mute/unmute all sounds
export const toggleMute = (muted: boolean): void => {
  Howler.mute(muted);
};
