import React, { useEffect } from "react";
import axios from "axios";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
// import Maps from "../components/map/Maps";
import { useSelector, useDispatch } from 'react-redux'
import { setCityName, setLoaderVisibility, setWeatherCurrent, setWeatherMain, setWeatherWind, setCurrentState, setCordinant } from '../redux/weatherSlice'

import './weather.scss';

const baseURL = process.env.REACT_APP_URL

export default function Weather() {
  const coordinates = useSelector((state) => state.weather.coordinant);
  const city = useSelector((state) => state.weather.cityName);
  const loaderVisibility = useSelector((state) => state.weather.loaderVisibility);
  const dispatch = useDispatch();

  useEffect(() => {
    if (city !== "" && loaderVisibility) {
      axios.get(baseURL, {
        params: {
          appid: process.env.REACT_APP_URL_KEY,
          q: city
        }
      })
        .then((response) => {
          if (response.data === undefined || response.data.cod !== 200) {
            console.log("Not found");
          } else {
            dispatch(setCordinant(response.data.coord));
          }
        })
        .catch((error) => {
          catchError(error);
        });
      dispatch(setLoaderVisibility());
    }
  }, [city, loaderVisibility]);

  useEffect(() => {
    if (coordinates !== undefined) {
      axios
        .get(baseURL, {
          params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            appid: process.env.REACT_APP_URL_KEY,
          }
        })
        .then((response) => {
          dispatch(setWeatherMain(response.data.main));
          dispatch(setWeatherCurrent(response.data.weather[0]));
          dispatch(setWeatherWind(response.data.wind));
          dispatch(setCityName(response.data.name));
          response.data.cod === 200 ? dispatch(setCurrentState(true)) : dispatch(setCurrentState(false));
        })
        .catch((error) => catchError(error));
    }
  }, [coordinates]);

  function catchError(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }

  return (
    <div>
      <div className="container">
        <Header />
        <Main />
        {/* <Maps /> */}
      </div>
    </div>
  )
}
