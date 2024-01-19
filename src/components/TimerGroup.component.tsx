import React, { useEffect, useMemo, useState } from "react";
import TimerComponent from "./Timer.component";
import { TimerGroup } from "../types/timerGroup";
import { TotalTime } from "./TotalTime.component";
import {
  commonButtonStyle,
  timerCardStyle,
  controlButtomStyle,
} from "../Styles/Timer.styles";

interface TimerTransfer {
  totalTime: number;
  isPlaying: boolean;
  groupTimerIsPlaying: boolean;
  resetTriggered: boolean;
  name: string;
}

const getFromLocalStorage = () => {
  const savedTimerState = localStorage.getItem("timers");
  if (savedTimerState) {
    return JSON.parse(savedTimerState);
  }
  return [];
};

const calculateTotalTime = (timersToCalculate: TimerTransfer[]) => {
  let occurredTime = 0;
  console.log("timers to calculate", timersToCalculate);
  timersToCalculate.forEach((timer) => {
    occurredTime += timer.totalTime;
  });

  console.log("timers to calculate", occurredTime);
  return occurredTime;
};

const TimerGroupComponent: React.FC<TimerGroup> = () => {
  const [timers, setTimers] = useState<TimerTransfer[]>(getFromLocalStorage());
  const [playing, setPlaying] = useState(false);
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
  const [completedTimers, setCompletedTimers] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [initialTimers, setInitialTimers] = useState<TimerTransfer[]>(
    getFromLocalStorage()
  );
  const [resetTriggered, setResetTriggered] = useState(false);

  const handleTimerComplete = () => {
    setCompletedTimers(completedTimers + 1);
  };

  const cloneTimers = (timersToClone: TimerTransfer[]) => {
    return timersToClone.map((timer) => ({ ...timer }));
  };

  const handleStart = () => {
    setInitialTimers(cloneTimers(timers));
    localStorage.setItem("timers", JSON.stringify(timers));
    if (timers.length > 0 && !isStarted) {
      const newTimers = timers.map((timer, index) => {
        return { ...timer, isPlaying: index === 0 };
      });
      setTimers(newTimers);
      setPlaying(true);
      setIsStarted(true);
    }
  };
  const handleReset = () => {
    setActiveTimerIndex(0);
    setTimers(initialTimers.map((timer) => ({ ...timer, isPlaying: false })));
    setResetTriggered((prev) => !prev);
  };

  useEffect(() => {
    if (!playing && isStarted) {
      setActiveTimerIndex(0);
      setCompletedTimers(0);
      setIsStarted(false);
    }
  }, [resetTriggered]);

  const handlePausePlay = () => {
    const nextPlayingState = !playing;
    setPlaying(nextPlayingState);
    if (nextPlayingState) {
      const newTimers = timers.map((timer, index) => ({
        ...timer,
        isPlaying: index === activeTimerIndex,
      }));
      setTimers(newTimers);
    } else {
      setTimers(
        timers.map((timer) => ({
          ...timer,
          isPlaying: false,
        }))
      );
    }
  };

  const updateTimeHandler = (newTime: number, index: number) => {
    console.log("updateTimeHandler");
    const newTimers = timers.map((timer, timerIndex) => {
      if (timerIndex === index) {
        return { ...timer, totalTime: newTime };
      }
      return timer;
    });
    setTimers(newTimers);
    console.log(1);
    console.log(newTimers);
  };

  const addTimer = () => {
    const newTimers = [
      ...timers,
      {
        totalTime: 5,
        isPlaying: false,
        groupTimerIsPlaying: false,
        resetTriggered: false,
        name: "timer",
      },
    ];
    setTimers(newTimers);
    setInitialTimers(newTimers);
  };

  const removeTimer = (timerIndex: number) => {
    console.log("removed the index", timerIndex);
    if (timerIndex < activeTimerIndex) {
      setActiveTimerIndex(activeTimerIndex - 1);
    }
    if (timerIndex === activeTimerIndex && timerIndex < timers.length - 1) {
      setActiveTimerIndex(0);
    }
    const newTimers = timers.filter((_, index) => {
      return index !== timerIndex;
    });
    console.log(newTimers);
    setResetTriggered(!resetTriggered);
    setTimers(newTimers);
  };

  const handleTimerFinish = () => {
    if (activeTimerIndex < timers.length - 1 && playing && isStarted) {
      console.log("not last timer finished: ", activeTimerIndex);
      setActiveTimerIndex(activeTimerIndex + 1);
    } else if (activeTimerIndex === timers.length - 1 && playing && isStarted) {
      setPlaying(false);
      new Audio("wav/ended.mp3").play();
      handleReset();
    }
  };

  useEffect(() => {
    console.log("timers", timers);
    console.log("active index", activeTimerIndex);
  }, [activeTimerIndex, playing]);

  useEffect(() => {
    const newTimers = timers.map((timer, index) => ({
      ...timer,
      isPlaying: index === activeTimerIndex,
    }));
    setTimers(newTimers);
    handleTimerComplete();
  }, [activeTimerIndex]);

  const handleClear = () => {
    setTimers([]);
    setInitialTimers([]);
    setActiveTimerIndex(0);
    handleReset();
  };

  const totalTime = calculateTotalTime(initialTimers);
  const timeLeft = useMemo(() => {
    return calculateTotalTime(timers);
  }, [timers, activeTimerIndex]);

  const handleChangeTimerName = (name: string, id: number) => {
    const newTimers = timers.map((timer, index) => {
      if (index === id) {
        return { ...timer, name };
      }
      return timer;
    });
    console.log("name changed: ", name);
    setTimers(newTimers);
  };

  const removeTimerButtonStyle = `text-white p-2 rounded-md bg-amber-500
  mt-4 disabled:opacity-50 disabled:cursor-not-allowed
  hover:border-white border-transparent border-2
  hover:scale-110
  hover:bg-amber-400 transition duration-800 ease-in-out
  shadow-2xl
  `;

  const controlButtomCardStyle = `fixed bottom-0 right-0 w-full
  md:w-2/3
  bg-gray-500 p-2 rounded-tl-2xl shadow-2xl
  flex flex-row justify-between
  items-center
  `;

  const timerFocusedStyle = `bg-gray-700 p-2 rounded m-5 p-5
  hover:scale-110
  md:w-[20rem]
  rounded-4xl shadow-2xl
  flex flex-col
  border-2 border-amber-500
  `;

  return (
    <div className="flex flex-col bg-slate-600 pb-20 justify-end">
      <div className="mb-20 flex max-md:flex-col flex-row md:flex-wrap ">
        {timers.map((timer, index) => (
          <div
            key={index}
            className={
              index === activeTimerIndex ? timerFocusedStyle : timerCardStyle
            }
          >
            <TimerComponent
              id={index}
              totalTime={timer.totalTime}
              isPlaying={timer.isPlaying}
              onFinish={
                index === activeTimerIndex ? handleTimerFinish : undefined
              }
              activeTimerIndex={activeTimerIndex}
              updateTime={updateTimeHandler}
              resetTriggered={resetTriggered}
              groupTimerIsPlaying={playing}
              name={timer.name}
              handleChangeTimerName={handleChangeTimerName}
            />
            <div className="flex justify-end">
              <button
                onClick={() => removeTimer(index)}
                disabled={playing}
                className={removeTimerButtonStyle}
              >
                Remove Timer
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={controlButtomCardStyle}>
        <TotalTime totalTime={totalTime} timeLeft={timeLeft} />
        <div className="md:w-2/3">
          <button
            onClick={handleStart}
            disabled={isStarted}
            className={controlButtomStyle}
          >
            Start
          </button>
          <button
            onClick={handlePausePlay}
            disabled={!isStarted}
            className={controlButtomStyle}
          >
            {playing ? "Pause" : "Resume"}
          </button>
          <button
            onClick={handleReset}
            disabled={playing || !isStarted}
            className={controlButtomStyle}
          >
            Reset
          </button>
          <button
            onClick={addTimer}
            disabled={playing}
            className={controlButtomStyle}
          >
            Add Timer
          </button>
          <button
            onClick={handleClear}
            disabled={playing}
            className={controlButtomStyle}
          >
            Clear Timers
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerGroupComponent;
