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
  activeTimerIndex,
  id,
}) => {
  const [time, setTime] = useState(totalTime);
  const [timerName, setTimerName] = useState("Timer");

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
        new Audio("wav/teck.mp3").play();
        return;
      }
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

  const handleTimerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimerName(event.target.value);
  };

  return (
    <div>
      <h2>
        {timerName}: {time} seconds
      </h2>
      <input type="text" value={timerName} onChange={handleTimerNameChange} />
      <TimeSetter
        onAddTimer={handleUpdateTimer}
        actualTimeSeconds={time}
        isDisabled={groupTimerIsPlaying}
      />
    </div>
  );
};

export default TimerComponent;
