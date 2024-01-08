import React, { useState, useEffect } from "react";
import { Timer } from "../types/timerTypes";

const TimerComponent: React.FC<Timer> = ({ totalTime, isPlaying }) => {
  const [time, setTime] = useState(totalTime);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (playing && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      setPlaying(false);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [playing, time]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <h2>Timer: {time} seconds</h2>
    </div>
  );
};

export default TimerComponent;
