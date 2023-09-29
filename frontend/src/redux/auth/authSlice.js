import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const initialState = {
    isAuthenticated: !!localStorage.getItem('jwtToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated = true;
            const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));
            state.role = decodedToken.roles[0];
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
