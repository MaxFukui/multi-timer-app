import {createSlice} from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        // Add your initial state here
        soundTimerEnded: 'wav/deep-meditation-bell-hit-throat-chakra-5-186971.mp3',
        soundGroupTimerEnded: 'wav/ended.mp3',

    },
    reducers: {
        // Add your reducers here
        setSoundTimerEnded: (state, action) => {
            state.soundTimerEnded = action.payload;
        },
        setSoundGroupTimerEnded: (state, action) => {
            state.soundGroupTimerEnded = action.payload;
        },
    },
});

export const {setSoundTimerEnded, setSoundGroupTimerEnded} = settingsSlice.actions;
export default settingsSlice.reducer;