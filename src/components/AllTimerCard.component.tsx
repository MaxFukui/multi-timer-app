import React from "react";
import { Timer } from "../types/timerTypes";
import { useNavigate } from "react-router-dom";
interface TimerGroup {
  idTimerGroup: number;
  name: string;
  timers: Timer[];
}

const AllTimerCard: React.FC<TimerGroup> = ({ idTimerGroup, name, timers }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/timer-groups/${idTimerGroup}`)}>
      <h2>{name}</h2>
      <div>Total Timers: {timers.length}</div>
    </div>
  );
};

export default AllTimerCard;
