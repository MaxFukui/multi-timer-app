import React, { useState, useEffect } from "react";
import { TotalTimePropsTypes } from "../types/totalTimePropTypes";
import { calculateTimeFromSeconds } from "../helpers/TimeHelpers";

export const TotalTime: React.FC<TotalTimePropsTypes> = ({
  totalTime,
  timeLeft,
}) => {
  return (
    <div>
      <h2>Total Time:</h2>
      <p>{totalTime}</p>
      <h2>Time Left</h2>
      <span>
        <div>
          <p>Hours</p>
          <p>{calculateTimeFromSeconds(timeLeft).hours}</p>
        </div>
        <div>
          <p>Minutes</p>
          <p>{calculateTimeFromSeconds(timeLeft).minutes}</p>
        </div>
        <div>
          <p>Seconds</p>
          <p>{calculateTimeFromSeconds(timeLeft).seconds}</p>
        </div>
      </span>
    </div>
  );
};
