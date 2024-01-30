import React, { useEffect, useState } from "react";
import { TimeSetterPropsTypes } from "../types/timeSetterPropsTypes";
import { timerSetterInput } from "../Styles/Timer.styles";

export const calculateTimeFromSeconds = (totalTime: number) => {
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime - hours * 3600) / 60);
  const seconds = totalTime - hours * 3600 - minutes * 60;
  return { hours, minutes, seconds };
};
export const TimeSetter: React.FC<TimeSetterPropsTypes> = ({
  onAddTimer,
  actualTimeSeconds,
  isDisabled,
}) => {
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

  const defaultContainerStyle = `
   flex bg-gray-700 text-white text-xl font-desg7 items-center 
   rounded-xl
   `;
  return (
    <div className={defaultContainerStyle}>
      <input
        type="number"
        value={hours}
        name="hours"
        onChange={handleOnChange}
        disabled={isDisabled}
        className={timerSetterInput}
        maxLength={2}
      />
      :
      <input
        type="number"
        value={minutes}
        name="minutes"
        onChange={handleOnChange}
        disabled={isDisabled}
        maxLength={2}
        className={timerSetterInput}
      />
      :
      <input
        type="number"
        value={seconds}
        name="seconds"
        onChange={handleOnChange}
        disabled={isDisabled}
        maxLength={2}
        className={timerSetterInput}
      />
    </div>
  );
};
