import React, { useState, useEffect } from "react";
import { Timer } from "../types/timerTypes";
import { TimeSetter } from "./TimeSetter.component";
import { inputColorDefault, resetButtonStyle } from "../Styles/Timer.styles";
import { playAudio } from "../helpers/AudioTrigger";

const TimerComponent: React.FC<Timer> = ({
  totalTime,
  initalTotalTime,
  isPlaying,
  onFinish,
  groupTimerIsPlaying,
  resetTriggered,
  updateTime,
  activeTimerIndex,
  id,
  name,
  handleResetTimer,
  handleChangeTimerName,
}) => {
  const [time, setTime] = useState(totalTime);
  const [timerName, setTimerName] = useState(name);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && time > 0 && groupTimerIsPlaying) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        updateTime(time - 1, id);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval!);
      if (interval) {
        clearInterval(interval);
      }
      if (onFinish && isPlaying) {
        const isLast = onFinish();
        if (!isLast) {
          playAudio("/wav/deep-meditation-bell-hit-throat-chakra-5-186971.mp3");
        }
        return;
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, groupTimerIsPlaying, time]);

  const handleUpdateTimer = (newTime: number) => {
    setTime(newTime);
    updateTime(newTime, id);
  };

  useEffect(() => {
    setTime(totalTime);
  }, [resetTriggered]);

  const handleNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setTimerName(newName);
    handleChangeTimerName(newName, id);
  };

  const inputNameDefault =
    inputColorDefault +
    ` text-white border-2 border-gray-600 w-2/3 rounded-md
    pl-2 focus:border-gray-100 transition duration-500 ease-in-out
    `;

  const handleResetThisTimer = (id: number) => {
    updateTime(initalTotalTime, id);
    setTime(initalTotalTime);
    handleResetTimer(id);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-baseline ml-8">
        <p className="text-white mr-2 text-sm">#{id + 1}</p>
        <h3 className="text-gray-100">Timer_name:</h3>
        <input
          type="text"
          className={inputNameDefault}
          value={timerName}
          onChange={handleNameOnChange}
          maxLength={10}
        />
      </div>
      <TimeSetter
        onAddTimer={handleUpdateTimer}
        actualTimeSeconds={time}
        isDisabled={groupTimerIsPlaying}
      />
      {activeTimerIndex === id ? (
        <button
          className={resetButtonStyle}
          onClick={handleResetThisTimer.bind(null, id)}
        >
          Reset
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default TimerComponent;
