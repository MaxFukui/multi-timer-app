import React from "react";
import TimerComponent from "../components/Timer.component";

interface TimerPageProps {}

const TimerPage: React.FC<TimerPageProps> = () => {
  return (
    <div>
      <h2>Timer</h2>
        <TimerComponent initialTime={0} />
    </div>
  );
};

export default TimerPage;
