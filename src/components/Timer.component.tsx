import React, { useState, useEffect } from "react";

interface TimerComponentProps {
  initialTime: number; // Assuming this is in seconds for simplicity
  endTime: number;
}

const TimerComponent: React.FC<TimerComponentProps> = ({
  initialTime,
  endTime,
}) => {
  const [time, setTime] = useState(initialTime);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (playing) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= endTime) {
            clearInterval(interval!);
            return prevTime;
          }
          return prevTime + 1;
        });
      }, 1000); 
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing, endTime]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <h2>Timer: {time} seconds</h2>
      <button onClick={handlePlayPause}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default TimerComponent;
