import React, { useState } from "react";
import { TimerFormProps } from "../types/timerFormTypes";

const TimerForm: React.FC<TimerFormProps> = ({ onAddTimer }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    onAddTimer(totalTime);
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
      />
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
      <input
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(Number(e.target.value))}
      />
    </form>
  );
};
