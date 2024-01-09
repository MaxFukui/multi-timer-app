import React, { useEffect, useState } from "react";
import TimerComponent from "./Timer.component";
import { Timer } from "../types/timerTypes";
import { TimerGroup } from "../types/timerGroup";

const TimerGroupComponent: React.FC<TimerGroup> = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [playing, setPlaying] = useState(false);
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
  const [completedTimers, setCompletedTimers] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [initialTimers, setInitialTimers] = useState<Timer[]>([]);

  const handleTimerComplete = () => {
    setCompletedTimers(completedTimers + 1);
  };

  const cloneTimers = (timersToClone: Timer[]) => {
    return timersToClone.map((timer) => ({ ...timer }));
  };

  const handleStart = () => {
    setInitialTimers(cloneTimers(timers));
    if (timers.length > 0 && !isStarted) {
      setTimers(
        timers.map((timer, index) => {
          return { ...timer, isPlaying: index === 0 };
        })
      );
      setPlaying(true);
      setIsStarted(true);
    }
  };

  const handleReset = () => {
    setTimers(cloneTimers(initialTimers));
    setActiveTimerIndex(0);
    setCompletedTimers(0);
    setPlaying(false);
    setIsStarted(false);
  };

  const handlePausePlay = () => {
    const nextPlayingState = !playing;
    setPlaying(nextPlayingState);
    if (nextPlayingState) {
      setTimers(
        timers.map((timer, index) => ({
          ...timer,
          isPlaying: index === activeTimerIndex,
        }))
      );
    } else {
      setTimers(
        timers.map((timer) => ({
          ...timer,
          isPlaying: false,
        }))
      );
    }
  };

  const addTimer = () => {
    const newTimers = [
      ...timers,
      { totalTime: 5, isPlaying: false, groupTimerIsPlaying: false },
    ];
    setTimers(newTimers);
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
        <button onClick={handleStart} disabled={isStarted}>
          Start
        </button>
        <button onClick={handlePausePlay}>
          {playing ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={addTimer}>Add Timer</button>
      </div>
    </div>
  );
};

export default TimerGroupComponent;
