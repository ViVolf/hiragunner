import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    game: 'Home',
};

const currentGameSlice = createSlice({
    name: 'currentGame',
    initialState,
    reducers: {
        changeGame: (state, action) => {
            state.game = action.payload;
        },
    },
});

export const { changeGame } = currentGameSlice.actions;

export default currentGameSlice.reducer;