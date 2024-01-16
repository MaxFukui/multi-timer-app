import React, { useEffect, useState } from "react";
import TimerComponent from "./Timer.component";
import { TimerGroup } from "../types/timerGroup";
import { TotalTime } from "./TotalTime.component";

interface TimerTransfer {
  totalTime: number;
  isPlaying: boolean;
  groupTimerIsPlaying: boolean;
  resetTriggered: boolean;
}

const getFromLocalStorage = () => {
  const savedTimerState = localStorage.getItem("timers");
  if (savedTimerState) {
    return JSON.parse(savedTimerState);
  }
  return [];
};

const TimerGroupComponent: React.FC<TimerGroup> = () => {
  const [timers, setTimers] = useState<TimerTransfer[]>(getFromLocalStorage());
  const [playing, setPlaying] = useState(false);
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
  const [completedTimers, setCompletedTimers] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [initialTimers, setInitialTimers] = useState<TimerTransfer[]>([]);
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
      setTimers(
        timers.map((timer, index) => {
          return { ...timer, isPlaying: index === 0 };
        })
      );
      setPlaying(true);
      setIsStarted(true);
    }
  };

  // const handleReset = () => {
  //   setPlaying(false);
  //   setActiveTimerIndex(0);
  //   setCompletedTimers(0);
  //   setTimers(initialTimers.map((timer) => ({ ...timer, isPlaying: false })));
  //   setIsStarted(false);
  //   setResetTriggered(!resetTriggered);
  // };

  const handleReset = () => {
    setResetTriggered((prev) => !prev);
  };

  useEffect(() => {
    if (!playing && isStarted) {
      setActiveTimerIndex(0);
      setCompletedTimers(0);
      setTimers(initialTimers.map((timer) => ({ ...timer, isPlaying: false })));
      setIsStarted(false);
    }
  }, [resetTriggered]);

  // const handleReset = () => {
  //   setPlaying(false);
  //   // Do not update other states here
  // };
  // // Update activeTimerIndex when 'playing' changes to false
  // useEffect(() => {
  //   if (!playing) {
  //     setActiveTimerIndex(0);
  //   }
  // }, [playing]);

  // // Update other states based on activeTimerIndex
  // useEffect(() => {
  //   if (activeTimerIndex === 0) {
  //     setCompletedTimers(0);
  //     setIsStarted(false);
  //     setResetTriggered((prev) => !prev);

  //     // Reset timers
  //     setTimers(initialTimers.map((timer) => ({ ...timer, isPlaying: false })));
  //   }
  // }, [activeTimerIndex, initialTimers]);

  const handlePausePlay = () => {
    const nextPlayingState = !playing;
    setPlaying(nextPlayingState);
    if (nextPlayingState) {
      setTimers(
        timers.map((timer, index) => ({
          ...timer,
          isPlaying: index === activeTimerIndex,
        }))
      );
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
      },
    ];
    console.log(newTimers);
    console.log(activeTimerIndex);
    setTimers(newTimers);
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
    if (activeTimerIndex < timers.length - 1) {
      console.log("not last timer finished: ", activeTimerIndex);
      setActiveTimerIndex(activeTimerIndex + 1);
    } else {
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
    setTimers(
      timers.map((timer, index) => ({
        ...timer,
        isPlaying: index === activeTimerIndex,
      }))
    );
    handleTimerComplete();
  }, [activeTimerIndex]);

  const handleClear = () => {
    setTimers([]);
    setActiveTimerIndex(0);
  };

  return (
    <div>
      {timers.map((timer, index) => (
        <div key={index}>
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
          />
          <button onClick={() => removeTimer(index)} disabled={playing}>
            Remove Timer
          </button>
        </div>
      ))}
      <div>
        <button onClick={handleStart} disabled={isStarted}>
          Start
        </button>
        <button onClick={handlePausePlay}>
          {playing ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset} disabled={playing || !isStarted}>
          Reset
        </button>
        <button onClick={addTimer} disabled={playing}>
          Add Timer
        </button>
        <button onClick={handleClear} disabled={playing}>
          Clear Timers
        </button>
      </div>
      <div>
        <TotalTime timers={timers} initialTimers={initialTimers} />
      </div>
    </div>
  );
};

export default TimerGroupComponent;
