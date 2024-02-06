let isElectron = false;

// Check if the environment is Electron
if (typeof window !== "undefined") {
  isElectron = true;
}

export const playAudio = (audioFile: string) => {
  let audioPath = audioFile;

  if (isElectron) {
    const audio = new Audio("." + audioPath);
    audio.play();
    return;
  }

  new Audio(audioPath).play();
};
