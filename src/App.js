
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import Main from './components/main/Main';
import Details from './components/details/Details';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import PuffLoader from "react-spinners/PuffLoader";

import Swal from 'sweetalert2'

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

  

  const [clima, setClima] = useState({})
  const [daily, setDaily] = useState({})

  const [coord, setCoord] = useState({})
  const [searching, setSearching] = useState(false)

  const [loading, setLoading] = useState(true)
  const[loading2, setLoading2] = useState(false)



 useEffect(() => {

  
    if (searching) {
      axios.get(`${BASE_URL}${FORECAST}lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely&units=metric&APPID=${Api_key}`)
        .then(res => {
     
          setDaily(res.data)
          setLoading(false)
        })


    } else {

     
      if ('geolocation' in navigator) {
        const onUbicacionConcedida = ubicacion => {
         
          var lat = ubicacion.coords.latitude;
          var lon = ubicacion.coords.longitude;
        


          axios.get(`${BASE_URL}${CURRENT}lat=${lat}&lon=${lon}&units=metric&APPID=${Api_key}`)
          .then(res => {
          
           
            setClima(res.data)
            setLoading(false)
          })

        axios.get(`${BASE_URL}${FORECAST}lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&APPID=${Api_key}`)
          .then(res => {

            setDaily(res.data)
            setLoading(false)
          })
        }
        
        const onErrorDeUbicacion = err => {
          console.log("Error obteniendo ubicación: ", err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! \n User denied Geolocation'
            
          })
          search("london")
        }
      
        const opcionesDeSolicitud = {
          enableHighAccuracy: true, // Alta precisión
          maximumAge: 0, // No queremos caché
          timeout: 5000 // Esperar solo 5 segundos
        };
        // Solicitar
        const watchID = navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
       
  
      

      


        navigator.geolocation.clearWatch(watchID);
      } else {
       console.error("Problemas para geolocalizacion");
       
      }
       
    }

  }, [searching, coord])

  const search = (city) => {
    setLoading2(true)
    axios.get(`${BASE_URL}${CURRENT}q=${city}&units=metric&appid=${Api_key}`)
      .then(res => {
        setSearching(true)
        setCoord(res.data.coord)
        setClima(res.data)
       
        setLoading2(false)
      })
      .catch(err => {
        console.log(err.response.data.message)
        
        setLoading2(false)
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      })

  }
  const locationsearch = () =>{
    
    setSearching(false)
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
             
                <Main clima={clima} loading={loading2} func={search} location={locationsearch} /> :  <div className="Main"><PuffLoader color={'white'} loading={loading} size={150} /></div>
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
