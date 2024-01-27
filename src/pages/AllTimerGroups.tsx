import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTimerGroups } from "../settings/TimerGroup.slice";

const getFromLocalStorage = () => {
  const savedTimerState = localStorage.getItem("TimerGroups");
  return savedTimerState ? JSON.parse(savedTimerState) : [];
};

const AllTimerGroups: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timerGroups = useSelector((state: any) => state.timerGroups);

  useEffect(() => {
    const storageTimerGroups = getFromLocalStorage();
    dispatch(setTimerGroups(storageTimerGroups));
  }, [dispatch]);

  const createNewTimer = () => {
    const newGroupId = timerGroups.length;
    const localStorageState = getFromLocalStorage();
    localStorageState.push([]);
    localStorage.setItem("TimerGroups", JSON.stringify(localStorageState));
    dispatch(setTimerGroups(localStorageState));
    navigate(`/timer-groups/${newGroupId}`);
  };

  console.log("timer groups", timerGroups);

  return (
    <div>
      <h2>All timer groups page</h2>
      <button onClick={createNewTimer}>Create a new Timer</button>
      {timerGroups.map((timerGroup: any[], index: number) => (
        <div key={index}>
          Group {index + 1}: {timerGroup.length} timers
        </div>
      ))}
    </div>
  );
};

export default AllTimerGroups;
