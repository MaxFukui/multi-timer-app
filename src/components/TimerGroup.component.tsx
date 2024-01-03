import React, {useState} from "react";
import TimerComponent from "./Timer.component";
import { Timer } from "../types/timerTypes";

interface TimerGroupComponentProps {
  timers: Timer[];
}

const TimerGroupComponent: React.FC<TimerGroupComponentProps> = ({
  timers,
}) => {
	const [numTimers, SetNumTimers] = useState(1);
	const [timers, setTimers] = useState<Timer[]>([{id: 1, initialTime: 0, endTime: 0}]);
  return (
    <div>
      {timers.map((timer) => (
        <TimerComponent
          key={timer.id}
          initialTime={timer.initialTime}
          endTime={timer.endTime}
        />
      ))}
			<div>
				<button>Start</button>
				<button>Pause</button>
				<button>Stop</button>
			</div>
    </div>
  );
};
