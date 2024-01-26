import React from "react";
import TimerGroupComponent from "../components/TimerGroup.component";
import { useParams } from "react-router-dom";

interface TimerPageProps {}

const TimerPage: React.FC<TimerPageProps> = () => {
  const { id } = useParams();
  return (
    <div className="bg-gray-600 h-full w-full top-0 left-0">
      <TimerGroupComponent timers={[]} />
    </div>
  );
};

export default TimerPage;
