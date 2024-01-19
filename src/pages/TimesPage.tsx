import React from "react";
import TimerGroupComponent from "../components/TimerGroup.component";

interface TimerPageProps {}

const TimerPage: React.FC<TimerPageProps> = () => {
  return (
    <div className="bg-gray-700 top-0 left-0 h-full w-full">
      <TimerGroupComponent timers={[]} />
    </div>
  );
};

export default TimerPage;
