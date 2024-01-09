import React, { useState } from "react";
import { TimeSetterPropsTypes } from "../types/timeSetterPropsTypes";

export const TimeSetter: React.FC<TimeSetterPropsTypes> = ({
  onAddTimer,
  actualTimeSeconds,
  isDisabled,
}) => {
  const calculateTimeFromSeconds = (totalTime: number) => {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime - hours * 3600) / 60);
    const seconds = totalTime - hours * 3600 - minutes * 60;
    return { hours, minutes, seconds };
  };

  const [hours, setHours] = useState(
    calculateTimeFromSeconds(actualTimeSeconds).hours
  );
  const [minutes, setMinutes] = useState(
    calculateTimeFromSeconds(actualTimeSeconds).minutes
  );
  const [seconds, setSeconds] = useState(
    calculateTimeFromSeconds(actualTimeSeconds).seconds
  );

  const calculateTotalTime = () => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newHours = hours,
      newMinutes = minutes,
      newSeconds = seconds;
    switch (name) {
      case "hours":
        newHours = Number(value);
        setHours(newHours);
        break;
      case "minutes":
        newMinutes = Number(value);
        setMinutes(newMinutes);
        break;
      case "seconds":
        newSeconds = Number(value);
        setSeconds(newSeconds);
        break;
    }
    onAddTimer(calculateTotalTime());
  };
  return (
    <div>
      <input
        type="number"
        value={hours}
        name="hours"
        onChange={handleOnChange}
        disabled={isDisabled}
      />
      <input
        type="number"
        value={minutes}
        name="minutes"
        onChange={handleOnChange}
        disabled={isDisabled}
      />
      <input
        type="number"
        value={seconds}
        name="seconds"
        onChange={handleOnChange}
        disabled={isDisabled}
      />
    </div>
  );
};
