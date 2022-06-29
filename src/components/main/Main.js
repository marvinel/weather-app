import React, { useState } from 'react';
import './Main.css';

import TextField from '@mui/material/TextField';

function Main(props) {
  const [city, setCity] = React.useState('Bogota');
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const round=(number)=>{
 
  return Math.round(number,1)
  }
  return (
    <div className="Main">
      <TextField fullWidth label="fullWidth" id="fullWidth"
        value={city}
        onChange={handleChange} />
        <button onClick={()=>props.func(city)}>Buscar</button>
      <h2>{props.clima.name}</h2>
      <img src={`http://openweathermap.org/img/wn/${props.clima.weather[0].icon}@2x.png`} alt={props.clima.weather[0].main}></img>
      <p>{round(props.clima.main.temp)}°C</p>
      <p>{props.clima.weather[0].main}</p>
    </div>
  );
}

export default Main;
