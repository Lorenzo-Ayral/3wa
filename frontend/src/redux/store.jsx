// redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Importez vos reducers
import counterReducer from './reducers/counterReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    // Ajoutez d'autres reducers ici
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
