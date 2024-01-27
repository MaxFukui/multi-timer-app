import { createSlice } from "@reduxjs/toolkit";

const TimerGroupsSlice = createSlice({
    name: "timerGroup",
    initialState: [],
    reducers: {
        // Add your reducers here
        setTimerGroups: (state, action) => {
            return action.payload
        },
    },
});

export const { setTimerGroups } = TimerGroupsSlice.actions;
export default TimerGroupsSlice.reducer;