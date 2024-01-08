import React, { useState } from "react";
import TimerComponent from "./Timer.component";
import { Timer } from "../types/timerTypes";
import { TimerGroup } from "../types/timerGroup";

const TimerGroupComponent: React.FC<TimerGroup> = () => {
  const [timers, setTimers] = useState<Timer[]>([
    { totalTime: 0, isPlaying: false },
  ]);
  const [playing, setPlaying] = useState(false);

  const handleStart = () => {
    setPlaying(true);
  };

  const handleStop = () => {
    setPlaying(false);
    setTimers(timers.map((timer) => ({ ...timer, isPlaying: false })));
  };

  const addTimer = () => {
    setTimers([...timers, { totalTime: 60, isPlaying: false }]);
  };

  const removeTimer = (timerIndex: number) => {
    setTimers(timers.filter((_, index) => index !== timerIndex));
  };

  return (
    <div>
      {timers.map((timer, index) => (
        <div>
          <TimerComponent
            key={index}
            totalTime={timer.totalTime}
            isPlaying={timer.isPlaying}
          />
          <button onClick={() => removeTimer(index)}>Remove Timer</button>
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
