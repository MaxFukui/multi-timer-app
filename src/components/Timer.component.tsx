import React, { useState, useEffect } from "react";
import { Timer } from "../types/timerTypes";

const TimerComponent: React.FC<Timer> = ({
  totalTime,
  isPlaying,
  onFinish,
}) => {
  const [time, setTime] = useState(totalTime);
  const [playing, setPlaying] = useState(isPlaying);

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
      if (onFinish) onFinish();
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, time]);

  return (
    <div>
      <h2>Timer: {time} seconds</h2>
    </div>
  );
};

export default TimerComponent;
