# Project Chained-Timer creator

Working in progress

### `npm start`

To start the front-end application in [http://localhost:3000](http://localhost:3000)



## Checklist

[x] - fix: after delete a timer, resuming it won't trigger the next timer
    - Problem: It's not changing the child components after taking the timer from array.
[X] - feature: add timer's name into the local storage too
[x] - feature: add electron package

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

<!-- 
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->
