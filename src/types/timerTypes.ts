export interface Timer {
    totalTime: number;
    isPlaying: boolean;
    onFinish?: () => void;
    groupTimerIsPlaying: boolean;
    resetTriggered: boolean;
    updateTime: (totalTime: number, index: number) => void;
    id: number;
}