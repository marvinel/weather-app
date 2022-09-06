
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import Main from './components/main/Main';
import Details from './components/details/Details';

import { createTheme, styled, ThemeProvider, darken } from '@mui/material/styles';

import PuffLoader from "react-spinners/PuffLoader";
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    text: {
      primary: "#fff"


    },
    action: {
      active: "#fff"
    }
  },
});
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

  const [loading, setLoading] = useState(true)


  useEffect(() => {

    if (searching) {
      axios.get(`${BASE_URL}${FORECAST}lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely&units=metric&APPID=${Api_key}`)
        .then(res => {
          console.log("daily")
          console.log(res.data)
          setDaily(res.data)
        })


    } else {

      
      if ('geolocation' in navigator) {

       

        const watchID = navigator.geolocation.getCurrentPosition((position) => {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          console.log(lat, lon)

          axios.get(`${BASE_URL}${CURRENT}lat=${lat}&lon=${lon}&units=metric&APPID=${Api_key}`)
            .then(res => {
              console.log("aca")
              console.log(res.data)
              setClima(res.data)
              setLoading(false)
            })

          axios.get(`${BASE_URL}${FORECAST}lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&APPID=${Api_key}`)
            .then(res => {
              
             
              setDaily(res.data)
              setLoading(false)
            })
        });

       if(watchID == undefined){
        search("london")
       }


        navigator.geolocation.clearWatch(watchID);
      } else {
       
       
      }
       
    }



  }, [searching, coord])

  const search = (city) => {

    axios.get(`${BASE_URL}${CURRENT}q=${city}&units=metric&appid=${Api_key}`)
      .then(res => {
        setSearching(true)
        setCoord(res.data.coord)
        setClima(res.data)
        console.log(res.data)

      })
      .catch(err => {
        console.log(err.response.data.message)
      })

   


  }

  if (!clima) {
    return (
      <div className="App">
        Cargando
      </div>
    )

  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">

           
              {clima.main ?
             
                <Main clima={clima} func={search} location={() => setSearching(false)} /> :  <div className="Main"><PuffLoader color={'white'} loading={loading} size={150} /></div>
              }
           

            
              {
                daily.daily && clima.main ?
                  <Details daily={daily} clima={clima} /> :  <div className="Main"><PuffLoader color={'white'} loading={loading} size={150} /></div>
              }
           
          </header>

        </div>
      </ThemeProvider>
    );
  }
}

export default App;
