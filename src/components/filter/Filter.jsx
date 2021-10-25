import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { setCordinant } from '../../redux/weatherSlice'

import './filter.scss';


export default function Filter({ callBack }) {
  const [selectCityOptions, setSelectCityOptions] = useState([]);
  const [selectCountryOptions, setSelectCountryOptions] = useState([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();


  const getCountries = async () => {
    const selectCountries = []
    let countries = await axios.get('http://localhost:3001/cities');
    [...new Map(countries.data.map(item => [item["country"], item])).values()].forEach(element => {
      selectCountries.push(
        {
          value: element.country,
          label: element.country
        }
      )
    });
    setSelectCountryOptions(selectCountries);
  };

  const getCities = async (selectedCountry) => {
    const cities = await axios.get('http://localhost:3001/cities?country=' + selectedCountry);
    const resultCities = [];
    cities.data.forEach(element => {
      resultCities.push(
        {
          value: element.id,
          label: element.name
        }
      )
    });
    setSelectCityOptions(resultCities);
  };

  const getCurrentWeather = async (cityId) => {
    const currentWeather = await axios.get('http://localhost:3001/cities?id=' + cityId);
    if (currentWeather.data === undefined || currentWeather.data === null) return;
    dispatch(setCordinant(currentWeather.data[0].coord));
  }

  const handleChangeCountry = (e) => {
    let selectedCountry;
    if (e === undefined || e === null || e === '') {
      return;
    }

    if (typeof e === 'object') {
      selectedCountry = e.value
      getCities(selectedCountry);
    } else {
      selectedCountry = e.toUpperCase();
      getCities(selectedCountry)
    }
    setCountry(selectedCountry);
  }


  const handleChangeCity = (e) => {
    let selectedCity;
    if (e === undefined || e === null || e === '') {
      return;
    }

    if (typeof e === 'object') {
      selectedCity = e.value
      getCurrentWeather(selectedCity);
    } else {
      selectedCity = e.toUpperCase();
      getCurrentWeather(selectedCity)
    }
    setCity(selectedCity);
  }

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="filter">
      <Select 
        className="select-input"
        placeholder="Ülke seçiniz"
        defaultValue={country}
        onChange={handleChangeCountry}
        options={selectCountryOptions}>
      </Select>
      <Select
        className="select-input"
        placeholder="Şehir seçiniz"
        defaultValue={city}
        onChange={handleChangeCity}
        options={selectCityOptions}>
      </Select>
    </div>
  )
}
