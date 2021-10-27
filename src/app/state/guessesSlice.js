import { createSlice } from '@reduxjs/toolkit';

export const guessesSlice = createSlice({
    name: 'guesses',
    initialState: {
        correct: 0,
        cities: {
            'Sofia': {
                guessedTemperature: undefined,
                actualTemperature: undefined,
                hasGuessed: false,
                isCorrect: false,
            },
            'New York': {
                guessedTemperature: undefined,
                actualTemperature: undefined,
                hasGuessed: false,
                isCorrect: false,
            },
            'London': {
                guessedTemperature: undefined,
                actualTemperature: undefined,
                hasGuessed: false,
                isCorrect: false,
            },
            'Paris': {
                guessedTemperature: undefined,
                actualTemperature: undefined,
                hasGuessed: false,
                isCorrect: false,
            },
            'San Francisco': {
                guessedTemperature: undefined,
                actualTemperature: undefined,
                hasGuessed: false,
                isCorrect: false,
            },
        },
    },
    reducers: {
        add: (state, action) => {
            state.cities[action.payload.city] = {
                guessedTemperature: action.payload.guessedTemperature,
                actualTemperature: action.payload.actualTemperature,
                hasGuessed: true,
                isCorrect: action.payload.guessedTemperature > action.payload.actualTemperature - 5 &&
                    action.payload.guessedTemperature < action.payload.actualTemperature + 5,
            };
            state.correct = state.cities[action.payload.city].isCorrect ? state.correct + 1 : state.correct;
        },
    },
});

export const { add } = guessesSlice.actions;

export default guessesSlice.reducer;
