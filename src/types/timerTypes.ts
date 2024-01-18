export interface Timer {
    totalTime: number;
    isPlaying: boolean;
    onFinish?: () => void;
    groupTimerIsPlaying: boolean;
    resetTriggered: boolean;
    updateTime: (totalTime: number, index: number) => void;
    activeTimerIndex: number;
    id: number;
    name: string;
}

export interface TimerTransfer {
  totalTime: number;
  isPlaying: boolean;
  groupTimerIsPlaying: boolean;
  resetTriggered: boolean;
}