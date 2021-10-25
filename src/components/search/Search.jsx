import React, { useState } from "react";
import './search.scss';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { setCityName, setLoaderVisibility, setCurrentState } from '../../redux/weatherSlice'

export default function Search() {

  const [city, setCity] = useState('')
  const dispatch = useDispatch()

  function handleInputChange(e) {
    if (e.target.value === undefined || e.target.value === null || e.target.value === '') {
      dispatch(setCurrentState(false));
    }
    const cityName = (e.target.value).trim();
    setCity(cityName);
  }

  function handleButtonClick() {
    if (city === undefined || city === null || city === '') return;
    const cityName = (city).trim();
    dispatch(setCityName(cityName));
    dispatch(setLoaderVisibility());
  }

  return (
    <div className="search">
      <InputGroup className="mb-3">
        <FormControl
          onChange={handleInputChange}
          placeholder="Select a City"
          aria-label="Select a City"
          aria-describedby="basic-addon2"
        />
        <Button variant="primary" onClick={handleButtonClick}>Search</Button>
      </InputGroup>
    </div>
  )
}
