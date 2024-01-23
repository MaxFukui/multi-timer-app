export interface Timer {
    totalTime: number;
    isPlaying: boolean;
    onFinish?: () => boolean | void;
    groupTimerIsPlaying: boolean;
    resetTriggered: boolean;
    updateTime: (totalTime: number, index: number) => void;
    activeTimerIndex: number;
    id: number;
    name: string;
    handleChangeTimerName: (name: string, index: number) => void;
}

export interface TimerTransfer {
  totalTime: number;
  isPlaying: boolean;
  groupTimerIsPlaying: boolean;
  resetTriggered: boolean;
}