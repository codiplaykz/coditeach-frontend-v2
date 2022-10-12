import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userData: JSON.parse(localStorage.getItem('userData')),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            localStorage.setItem("userData", JSON.stringify(action.payload.userData))
            localStorage.setItem("accessToken", action.payload.accessToken)
            localStorage.setItem("refreshToken", action.payload.refreshToken)

            state.userData = action.payload.userData;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        removeUser(state) {
            localStorage.removeItem("userData")
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")

            state.userData = null;
            state.accessToken = null;
            state.refreshToken = null;
        }
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;