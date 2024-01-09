export interface Timer {
    totalTime: number;
    isPlaying: boolean;
    onFinish?: () => void;
    groupTimerIsPlaying: boolean;
}