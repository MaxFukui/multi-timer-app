import React, { useEffect, useState } from "react";
import TimerComponent from "./Timer.component";
import { Timer } from "../types/timerTypes";
import { TimerGroup } from "../types/timerGroup";

const TimerGroupComponent: React.FC<TimerGroup> = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [playing, setPlaying] = useState(false);
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
  const [completedTimers, setCompletedTimers] = useState(0);

  const handleTimerComplete = () => {
    setCompletedTimers(completedTimers + 1);
  };

  const handleStart = () => {
    if (timers.length > 0) {
      // Reset all timers to not playing
      setTimers(timers.map((timer) => ({ ...timer, isPlaying: false })));

      // Set the first timer to play
      setActiveTimerIndex(0);
      setPlaying(true);
      setTimers(
        timers.map((timer, index) => ({
          ...timer,
          isPlaying: index === 0,
        }))
      );
    }
  };

  const handleStop = () => {
    setPlaying(false);
    setTimers(timers.map((timer) => ({ ...timer, isPlaying: false })));
  };

  const addTimer = () => {
    setTimers([
      ...timers,
      { totalTime: 5, isPlaying: false, groupTimerIsPlaying: false },
    ]);
  };

  const removeTimer = (timerIndex: number) => {
    setTimers(timers.filter((_, index) => index !== timerIndex));
  };

  const handleTimerFinish = () => {
    if (activeTimerIndex < timers.length - 1) {
      setActiveTimerIndex(activeTimerIndex + 1);
    } else {
      setPlaying(false);
      new Audio("wav/ended.mp3").play();
    }
  };

  useEffect(() => {
    setTimers(
      timers.map((timer, index) => ({
        ...timer,
        isPlaying: index === activeTimerIndex,
      }))
    );
    handleTimerComplete();
  }, [activeTimerIndex]);

  return (
    <div>
      {timers.map((timer, index) => (
        <div key={index}>
          <TimerComponent
            totalTime={timer.totalTime}
            isPlaying={timer.isPlaying}
            onFinish={
              index === activeTimerIndex ? handleTimerFinish : undefined
            }
            groupTimerIsPlaying={playing}
          />
          <button onClick={() => removeTimer(index)} disabled={playing}>
            Remove Timer
          </button>
        </div>
      ))}
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Pause</button>
        <button onClick={addTimer}>Add Timer</button>
      </div>
    </div>
  );
};

export default TimerGroupComponent;
