import { configureStore } from '@reduxjs/toolkit';
import guessesReducer from './guessesSlice';

export default configureStore({
    reducer: {
        guesses: guessesReducer,
    }
});
