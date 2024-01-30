import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTimerGroups } from "../settings/TimerGroup.slice";
import { TimerGroupTypeLocalStorage } from "../types/timerGroup";
import AllTimerCard from "../components/AllTimerCard.component";
import TimerGroupComponent from "../components/TimerGroup.component";
import { bgDefaultColor } from "../Styles/Common.styles";
import { commonButtonStyle } from "../Styles/Timer.styles";

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
    localStorageState.push({ name: "New Timer", timers: [] });
    localStorage.setItem("TimerGroups", JSON.stringify(localStorageState));
    dispatch(setTimerGroups(localStorageState));
    navigate(`/timer-groups/${newGroupId}`);
  };

  console.log("timer groups", timerGroups);

  const allTimerStyle =
    `
    h-full w-full p-3
    top-0 left-0
    text-white
  ` + bgDefaultColor;
  const createNewTimerStyle =
    commonButtonStyle +
    `hover:bg-green-300 
  transition duration-200 ease-in-out hover:scale-110
  `;
  const cardGroupStyle = `lg:flex-row flex flex-col`;

  const handleDeleteTimerGroup = (id: number) => {
    const newTimerGroups = timerGroups.filter(
      (_: any, index: number) => index !== id
    );
    localStorage.setItem("TimerGroups", JSON.stringify(newTimerGroups));
    dispatch(setTimerGroups(newTimerGroups));
  };
  return (
    <div className={allTimerStyle}>
      <h2>Welcome to Amazing Timer</h2>
      <div className={cardGroupStyle}>
        {timerGroups.map(
          (timerGroup: TimerGroupTypeLocalStorage, index: number) => (
            <AllTimerCard
              idTimerGroup={index}
              name={timerGroup.name}
              timers={timerGroup.timers}
              deleteTimerGroup={handleDeleteTimerGroup}
            />
          )
        )}
      </div>
      <button onClick={createNewTimer} className={createNewTimerStyle}>
        Create a new Timer
      </button>
    </div>
  );
};

export default AllTimerGroups;
