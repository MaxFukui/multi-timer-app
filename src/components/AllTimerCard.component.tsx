import React from "react";
import { Timer } from "../types/timerTypes";
import { useNavigate } from "react-router-dom";
import { calculateTimeFromSeconds } from "../helpers/TimeHelpers";
interface TimerGroup {
  idTimerGroup: number;
  name: string;
  timers: Timer[];
  deleteTimerGroup: (id: number) => void;
}

const getSumAllSecondsFromTimers = (timers: Timer[]) => {
  return timers.reduce((acc, timer) => acc + timer.totalTime, 0);
};

const AllTimerCard: React.FC<TimerGroup> = ({
  idTimerGroup,
  name,
  timers,
  deleteTimerGroup,
}) => {
  const navigate = useNavigate();
  const cardStyle = `bg-gray-800 p-4 rounded-md mb-1
  w-30 h-30 lg:mr-2
  border-2 border-transparent
  hover:border-green-300
  hover:scale-[1.02]
  cursor-pointer
  `;
  const totalTime = getSumAllSecondsFromTimers(timers);
  const handleDeleteTimerGroup = () => {
    deleteTimerGroup(idTimerGroup);
  };
  const deleteButtonStyle = `bg-red-500 p-1.5 rounded-md mt-1 text-sm
  hover:bg-green-300 transition duration-500 ease-in-out
  `;
  return (
    <div className={cardStyle}>
      <div onClick={() => navigate(`/timer-groups/${idTimerGroup}`)}>
        <h2>{name}</h2>
        <div className="flex flex-row">
          <h2>Total time:</h2>
          <h2>{calculateTimeFromSeconds(totalTime).hours}</h2>:
          <h2>{calculateTimeFromSeconds(totalTime).minutes}</h2>:
          <h2>{calculateTimeFromSeconds(totalTime).seconds}</h2>
        </div>
        <div>Total Timers: {timers.length}</div>
      </div>
      <button className={deleteButtonStyle} onClick={handleDeleteTimerGroup}>
        Delete Timer
      </button>
    </div>
  );
};

export default AllTimerCard;
