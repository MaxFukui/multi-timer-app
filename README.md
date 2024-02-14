# Project Chained-Timer creator

Working in progress

### `npm start`

To start the front-end application in [http://localhost:3000](http://localhost:3000)



## Checklist

[x] - fix: after delete a timer, resuming it won't trigger the next timer
    - Problem: It's not changing the child components after taking the timer from array.
[X] - feature: add timer's name into the local storage too
[x] - feature: add electron package

### Bugs
[X] - Clear Timers are not cleaning at the first click
[X] - Electron without audio files

### UI

Basic UI
[x] - Create UI for TimerGroup
[x] - Create UI for Timer
[x] - Create UI for Timer Setter
[X] - feature: focus on the actual timer
[] - Show the active timer in the tab bar
[] - scroll towards the running timer automatically
[] - Add the title tab the active timer
> All Timers Group
[] - Create Cards for each timer

### Database 
[] - Initialize the database
[] - CRUD Operations


### Logic 
>Reset Actual Timer
[] - Reset Actual Timer
    [] - Bug: Timer is not changing the TimerSetter
> Store
[X] - Set store to store the TimerGroup data
> Timer component
[] - Add settings the timers during while they already started
    [] - Save Timer
    [] - Reset timer until where the timer is
[X] - Add new sound for middle timer ended
[X] - When the timer is ended, just the right sound is triggered
> Timer Page 
[X] - Redux, global state
> Timer Group
[] - Change the logic
    [] - Save button
    [] - Edit button
[X] - Add name of the TimerGroup 
[X] - Save the name of TimerGroup into the LocalStorage
> Setting Page 
[] - Set the sounds (Finish timer and finish all timers)
[] - Create the structure able to be customized
[] - Set route and logic
    [] - Set logic to get the right Timer Groups
    [] - Set a way to create new Timer Groups
> All Timers Group 
[X] - Initialize AllTimersGroupPage
[X] - Gather all timers
[X] - Get from localstorage
[] - Click the timer
[] - Delete Timer!
