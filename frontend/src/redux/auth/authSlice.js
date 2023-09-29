import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const getRoleFromToken = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
        const decodedToken = jwt_decode(jwtToken);
        if (decodedToken && decodedToken.roles) {
            return decodedToken.roles[0];
        }
    }
    return null;
};

const initialState = {
    isAuthenticated: !!localStorage.getItem('jwtToken'),
    role: getRoleFromToken(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated = true;
            state.role = getRoleFromToken();
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.role = null
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
