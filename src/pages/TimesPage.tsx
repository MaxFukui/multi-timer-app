import React from "react";
import TimerGroupComponent from "../components/TimerGroup.component";

interface TimerPageProps {}

const TimerPage: React.FC<TimerPageProps> = () => {
  return (
    <div>
      <h2>Timer</h2>
      <TimerGroupComponent timers={[]} />
    </div>
  );
};

export default TimerPage;
