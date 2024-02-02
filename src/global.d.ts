export {};

declare global {
    interface Window {
        electronAPI: {
            playAudio: (audioFile: string) => void;
        }
    }
}