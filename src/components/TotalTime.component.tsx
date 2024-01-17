import React, { useState, useEffect, useMemo } from "react";
import { TotalTimePropsTypes } from "../types/totalTimePropTypes";
import { calculateTimeFromSeconds } from "../helpers/TimeHelpers";
import { Timer, TimerTransfer } from "../types/timerTypes";

export const TotalTime: React.FC<TotalTimePropsTypes> = ({
  initialTimers,
  timers,
}) => {
  const calculateTotalTime = (timersToCalculate: TimerTransfer[]) => {
    let occurredTime = 0;
    console.log("timers to calculate", timersToCalculate);
    timersToCalculate.forEach((timer) => {
      occurredTime += timer.totalTime;
    });

    console.log("timers to calculate", occurredTime);
    return occurredTime;
  };
  const totalTime = useMemo(
    () => calculateTotalTime(initialTimers),
    [initialTimers]
  );
  const occurredTime = useMemo(() => calculateTotalTime(timers), [timers]);

  return (
    <div>
      <h2>Total Time:</h2>
      <p>{totalTime}</p>
      <h2>Time Occurred:</h2>
      <p>{occurredTime}</p>
    </div>
  );
};
