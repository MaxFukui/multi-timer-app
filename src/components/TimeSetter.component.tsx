import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setHours(calculateTimeFromSeconds(actualTimeSeconds).hours);
    setMinutes(calculateTimeFromSeconds(actualTimeSeconds).minutes);
    setSeconds(calculateTimeFromSeconds(actualTimeSeconds).seconds);
  }, [actualTimeSeconds]);

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
    const newTime = newHours * 3600 + newMinutes * 60 + newSeconds;
    onAddTimer(newTime);
  };

  useEffect(() => {
    if (isDisabled) {
      setHours(calculateTimeFromSeconds(actualTimeSeconds).hours);
      setMinutes(calculateTimeFromSeconds(actualTimeSeconds).minutes);
      setSeconds(calculateTimeFromSeconds(actualTimeSeconds).seconds);
    }
  }, [actualTimeSeconds]);

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
