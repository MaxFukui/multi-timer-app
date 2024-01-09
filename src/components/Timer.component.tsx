import React, { useState, useEffect } from "react";
import { Timer } from "../types/timerTypes";
import { TimeSetter } from "./TimeSetter.component";

const TimerComponent: React.FC<Timer> = ({
  totalTime,
  isPlaying,
  onFinish,
  groupTimerIsPlaying,
}) => {
  const [time, setTime] = useState(totalTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && time > 0) {
      interval = setInterval(() => {
        console.log("time", time);
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      console.log("interval", interval);
    } else if (time === 0) {
      clearInterval(interval!);
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
  }, [isPlaying, time]);

  const handleOnAddTimer = (totalTime: number) => {
    setTime(totalTime);
  };

  return (
    <div>
      <h2>Timer: {time} seconds</h2>
      <TimeSetter
        onAddTimer={handleOnAddTimer}
        actualTimeSeconds={time}
        isDisabled={groupTimerIsPlaying}
      />
    </div>
  );
};

export default TimerComponent;
