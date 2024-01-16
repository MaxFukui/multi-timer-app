import React, { useState, useEffect } from "react";
import { TotalTimePropsTypes } from "../types/totalTimePropTypes";
import { calculateTimeFromSeconds } from "../helpers/TimeHelpers";
import { Timer, TimerTransfer } from "../types/timerTypes";

const calculateTotalTime = (timersToCalculate: TimerTransfer[]) => {
  let occurredTime = 0;
  timersToCalculate.forEach((timer) => {
    occurredTime += timer.totalTime;
  });
  return occurredTime;
};

export const TotalTime: React.FC<TotalTimePropsTypes> = ({
  initialTimers,
  timers,
}) => {
  const [totalTime, setTotalTime] = useState(calculateTotalTime(initialTimers));

  const [occurredTime, setOccurredTime] = useState(0);

  useEffect(() => {}, [timers]);

  return (
    <div>
      <h2>Total Time:</h2>
      <p>{totalTime}</p>
      <h2>Time Occurred:</h2>
      <p>{occurredTime}</p>
    </div>
  );
};
