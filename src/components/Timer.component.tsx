import React, { useState, useEffect } from "react";
import { Timer } from "../types/timerTypes";
import { TimeSetter } from "./TimeSetter.component";

const TimerComponent: React.FC<Timer> = ({
  totalTime,
  isPlaying,
  onFinish,
  groupTimerIsPlaying,
  resetTriggered,
  updateTime,
  id,
}) => {
  const [time, setTime] = useState(totalTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && time > 0 && groupTimerIsPlaying) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval!);
      if (interval) {
        clearInterval(interval);
      }
      if (onFinish) {
        onFinish();
        return;
      }
      new Audio("wav/teck.mp3").play();
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, groupTimerIsPlaying, time]);

  const handleUpdateTimer = (newTime: number) => {
    setTime(newTime);
    updateTime(newTime, id);
  };

  useEffect(() => {
    setTime(totalTime);
  }, [resetTriggered]);

  return (
    <div>
      <h2>Timer: {time} seconds</h2>
      <TimeSetter
        onAddTimer={handleUpdateTimer}
        actualTimeSeconds={time}
        isDisabled={groupTimerIsPlaying}
      />
    </div>
  );
};

export default TimerComponent;
