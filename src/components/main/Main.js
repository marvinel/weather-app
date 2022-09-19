import React from 'react';
import './Main.css';
import 'antd/dist/antd.min.css';

import IconButton from '@mui/material/IconButton';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import PulseLoader from "react-spinners/PulseLoader";


import { Input} from 'antd';
const { Search } = Input;

function Main(props) {

  const onSearch = (value) =>{
   
    
    props.func(value)
  }

  const round = (number) => {
    return Math.round(number, 1)
  }

 
  return (
    <div className="Main">

      <div className='Search_Section'>
        <div className='Search_Section_bar'>
        <Search
          placeholder="Search for places"
          
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />

        </div>
        <div>
        <IconButton color='primary' onClick={props.location} aria-label="delete" size="large">
          <MyLocationIcon fontSize="inherit" />
        </IconButton>
        </div>
        <div className='Spinnerr'>
        <PulseLoader color={'white'} loading={props.loading}  />
          </div>
      </div>
      <div>


        <div className='Location'>

          <p id="city"><LocationOnIcon fontSize="inherit" /> {props.clima.name} </p>

        </div>

        <img src={require(`../../assets/${props.clima.weather[0].icon}.png`)} alt={props.clima.weather[0].main}></img>

        {// <img src={require(`../../assets/01d.png`)} alt={props.clima.weather[0].main}></img>
        }<p className='Temp'>{round(props.clima.main.temp)}°C</p>
        <p>{props.clima.weather[0].main}</p>
      </div>
    </div>
  );
}

export default Main;
