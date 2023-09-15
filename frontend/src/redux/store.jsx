import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import counterReducer from './reducers/counterReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
