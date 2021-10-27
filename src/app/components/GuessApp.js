import React from "react";
const { useState } = React;

import { useDispatch, useSelector } from 'react-redux';

import { add } from '../state/guessesSlice';

export default function GuessApp() {
    const [value, setValue] = useState("");
    const handleChange = (e) => setValue(e.target.value);

    const correctCounter = useSelector((state) => state.guesses.correct);
    const cities = useSelector((state) => state.guesses.cities);

    const dispatch = useDispatch();

    const unguessedCities = Object.keys(cities).filter(i => !cities[i].hasGuessed);
    const guessedCities = Object.keys(cities).filter(i => cities[i].hasGuessed);

    function checkGuess(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9cff733aee57cb05b63dd4f731c46bc4&units=metric`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch(add({
                        city: unguessedCities[0],
                        guessedTemperature: value,
                        actualTemperature: result.main.temp,
                    }));
                },
                (error) => {
                    // @TODO: Handle error
                }
            );
    }


    if (unguessedCities.length) {
        return (
            <div className="guess-app">
                <div>
                   <h1> {unguessedCities[0]} </h1>
                    <div>
                        <input type="text" value={value} onChange={handleChange}/>
                        <button aria-label="Check" onClick={ () => checkGuess(unguessedCities[0]) }>Check</button>

                    </div>
                </div>
                <div>
                    {guessedCities.map(city => (
                        <div key={city}>
                            <h4>{cities[city].guessedTemperature}</h4>
                            <h5>Was {cities[city].actualTemperature}</h5>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (correctCounter >= 3) {
        return (<div>
            You won!
        </div>)
    } else {
        return (<div>
            You lost!
        </div>)
    }
}
