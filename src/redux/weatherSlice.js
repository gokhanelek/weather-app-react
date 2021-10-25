import { createSlice } from '@reduxjs/toolkit'


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        main: {},
        weatherCurrent: {},
        wind: {},
        coordinant: undefined,
        cityName: '',
        loaderVisibility: false,
        currentState: false
    },
    reducers: {
        setCityName: (state, action) => {
            state.cityName = action.payload
        },
        setLoaderVisibility: (state) => {
            state.loaderVisibility = !state.loaderVisibility
        },
        setCurrentState: (state, action) => {
            state.currentState = action.payload
        },
        setWeatherCurrent: (state, action) => {
            state.weatherCurrent = action.payload;
        },
        setWeatherMain: (state, action) => {
            state.main = action.payload;
        },
        setWeatherWind: (state, action) => {
            state.wind = action.payload
        },
        setCordinant: (state, action) => {
            state.coordinant = action.payload
        }

    },
})


export const { setCityName, setLoaderVisibility, setCurrentState, setWeatherCurrent, setWeatherMain, setWeatherWind, setCordinant } = weatherSlice.actions

export default weatherSlice.reducer