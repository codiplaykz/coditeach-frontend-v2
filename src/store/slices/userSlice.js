import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userData: localStorage.getItem('user'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.userData = action.payload.userData;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        removeUser(state) {
            state.userData = null;
            state.accessToken = null;
            state.refreshToken = null;
        }
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;