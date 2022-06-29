
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import Main from './components/main/Main';
import Details from './components/details/Details';


function App() {
  const Api_key = "c33d098e629ffe5ed9a697cd1b12473a"
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";
  const CURRENT = "weather?";
  const FORECAST = "onecall?";

  const CNT = 5;

  const [clima, setClima] = useState({})
  const [daily, setDaily] = useState({})

  const [coord, setCoord] = useState({})
  const [searching, setSearching] = useState(false)

  useEffect(() => {

    if (searching) {
      axios.get(`${BASE_URL}${FORECAST}lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely&units=metric&APPID=${Api_key}`)
        .then(res => {
          console.log("daily")
          console.log(res.data)
          setDaily(res.data)
        })


      }else{
      if ('geolocation' in navigator) {



        const watchID = navigator.geolocation.getCurrentPosition((position) => {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;

          axios.get(`${BASE_URL}${CURRENT}lat=${lat}&lon=${lon}&units=metric&APPID=${Api_key}`)
            .then(res => {

              setClima(res.data)
            })

          axios.get(`${BASE_URL}${FORECAST}lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&APPID=${Api_key}`)
            .then(res => {
              console.log("daily")
              console.log(res.data)
              setDaily(res.data)
            })
        });



        navigator.geolocation.clearWatch(watchID);
      } else {
        /* geolocation IS NOT available */
        console.log("no se")
      }
    }



  }, [searching, coord])

  const search = (city) => {

    axios.get(`${BASE_URL}${CURRENT}q=${city}&units=metric&appid=${Api_key}`)
      .then(res => {
        setSearching(true)
        setCoord(res.data.coord)
        setClima(res.data)


      })

    console.log(coord)


  }

  if (!clima) {
    return (
      <div className="App">
        Cargando
      </div>
    )

  } else {
    return (
      <div className="App">
        <header className="App-header">

          <button onClick={()=> setSearching(false)} >Localizar</button>

          {clima.main ?
            <Main clima={clima} func={search} /> : <h2>Cargando...</h2>
          }
          {
            daily.daily && clima.main ?
              <Details daily={daily} clima={clima} /> : <h2>Cargando...</h2>
          }
        </header>

      </div>
    );
  }
}

export default App;
