import React, { useState, useEffect } from "react";
import { TotalTimePropsTypes } from "../types/totalTimePropTypes";
import { calculateTimeFromSeconds } from "../helpers/TimeHelpers";

export const TotalTime: React.FC<TotalTimePropsTypes> = ({
  totalTime,
  timeLeft,
}) => {
  const totalTimerContainerStyle = ` bg-transparent pt-4 text-white  
   text-sm
   w-1/3
   pl-2 pb-2
   justify-around
  `;
  return (
    <div className={totalTimerContainerStyle}>
      <div className="flex flex-row max-md:flex-col">
        <h2>Total Time:</h2>
        <p className="font-desg7">{totalTime}</p>
      </div>
      <div className="flex flex-row max-md:flex-col">
        <h2 className="mr-2">Time Left:</h2>
        <div className="flex flex-row">
          <p className="font-desg7">
            {calculateTimeFromSeconds(timeLeft).hours}
          </p>
          :
          <p className="font-desg7">
            {calculateTimeFromSeconds(timeLeft).minutes}
          </p>
          :
          <p className="font-desg7">
            {calculateTimeFromSeconds(timeLeft).seconds}
          </p>
        </div>
      </div>
    </div>
  );
};
