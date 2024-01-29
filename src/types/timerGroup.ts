import { Timer } from './timerTypes';

export interface TimerGroup{
    timers: Timer[]
}

export interface TimerGroupTypeLocalStorage {
    name: string,
    timers: Timer[]
}