import React, { useEffect, useMemo, useState } from "react";
import TimerComponent from "./Timer.component";
import { TimerGroup } from "../types/timerGroup";
import { TotalTime } from "./TotalTime.component";
import { useParams } from "react-router-dom";
import {
  commonButtonStyle,
  timerCardStyle,
  controlButtomStyle,
} from "../Styles/Timer.styles";
import { setTimerGroups } from "../settings/TimerGroup.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playAudio } from "../helpers/AudioTrigger";

interface TimerTransfer {
  totalTime: number;
  isPlaying: boolean;
  groupTimerIsPlaying: boolean;
  resetTriggered: boolean;
  name: string;
}

const getFromLocalStorage = (id: number) => {
  const savedTimerState = localStorage.getItem("TimerGroups");
  if (savedTimerState) {
    const parsedSavedTimerState = JSON.parse(savedTimerState);
    if (parsedSavedTimerState[id]) {
      return parsedSavedTimerState[id];
    }
  }
  return { name: "New Timer", timers: [] };
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timers, setTimers] = useState<TimerTransfer[]>(
    getFromLocalStorage(Number(id)).timers
  );
  const [playing, setPlaying] = useState(false);
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
  const [completedTimers, setCompletedTimers] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [initialTimers, setInitialTimers] = useState<TimerTransfer[]>(
    getFromLocalStorage(Number(id)).timers
  );
  const [resetTriggered, setResetTriggered] = useState(false);
  const [timerGroupName, setTimerGroupName] = useState(
    getFromLocalStorage(Number(id)).name
  );

  const handleTimerComplete = () => {
    setCompletedTimers(completedTimers + 1);
  };

  const cloneTimers = (timersToClone: TimerTransfer[]) => {
    return timersToClone.map((timer) => ({ ...timer }));
  };

  const handleSaveLocalStorage = (newTimers: TimerTransfer[], id: number) => {
    const savedTimerState = localStorage.getItem("TimerGroups");
    let updatedTimerGroups;

    if (savedTimerState) {
      const parsedTimerState = JSON.parse(savedTimerState);
      updatedTimerGroups = [...parsedTimerState];
      updatedTimerGroups[id] = { name: timerGroupName, timers: newTimers };
    } else {
      updatedTimerGroups = [{ name: timerGroupName, timers: newTimers }];
    }

    localStorage.setItem("TimerGroups", JSON.stringify(updatedTimerGroups));
    dispatch(setTimerGroups(updatedTimerGroups));
  };

  const handleStart = () => {
    setInitialTimers(cloneTimers(timers));
    // localStorage.setItem("timers", JSON.stringify(timers));
    handleSaveLocalStorage(timers, Number(id));
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
    const newTimers = timers.map((timer, timerIndex) => {
      if (timerIndex === index) {
        return { ...timer, totalTime: newTime };
      }
      return timer;
    });
    setTimers(newTimers);
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
    if (timerIndex < activeTimerIndex) {
      setActiveTimerIndex(activeTimerIndex - 1);
    }
    if (timerIndex === activeTimerIndex && timerIndex < timers.length - 1) {
      setActiveTimerIndex(0);
    }
    const newTimers = timers.filter((_, index) => {
      return index !== timerIndex;
    });
    setResetTriggered(!resetTriggered);
    setTimers(newTimers);
  };

  const handleTimerFinish = () => {
    if (activeTimerIndex < timers.length - 1 && playing && isStarted) {
      setActiveTimerIndex(activeTimerIndex + 1);
      return false;
    } else if (activeTimerIndex === timers.length - 1 && playing && isStarted) {
      setPlaying(false);
      playAudio("/wav/ended.mp3");
      handleReset();
      return true;
    }
  };

  useEffect(() => {}, [activeTimerIndex, playing]);

  useEffect(() => {
    const newTimers = timers.map((timer, index) => ({
      ...timer,
      isPlaying: index === activeTimerIndex,
    }));
    setTimers(newTimers);
    handleTimerComplete();
  }, [activeTimerIndex]);

  const handleClear = () => {
    handleReset();
    setTimers([]);
    setInitialTimers([]);
    setActiveTimerIndex(0);
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

  const handleChangeTimerGroupName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimerGroupName(event.target.value);
  };

  return (
    <div className="flex flex-col bg-slate-600 pb-20 justify-center">
      <div className="flex text-white mt-4 pl-6">
        <h2 className="mr-4">Timer Name</h2>
        <input
          className="text-white border-2 border-gray-600 w-2/3 rounded-md bg-gray-700 pl-2 focus:border-gray-100 transition duration-500 ease-in-out"
          type="text"
          onChange={handleChangeTimerGroupName}
          value={timerGroupName}
        />
      </div>
      <div className="mb-20 flex max-md:flex-col flex-row md:flex-wrap justify-center">
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
          <button onClick={() => navigate("/")} className={controlButtomStyle}>
            go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerGroupComponent;
