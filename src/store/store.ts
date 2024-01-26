import { configureStore } from "@reduxjs/toolkit";
import settingsSliceReducer from "../settings/settings.slice";
import TimerGroupsSlice from "../settings/TimerGroup.slice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        settings: settingsSliceReducer,
        timerGroups: TimerGroupsSlice,
    },
});