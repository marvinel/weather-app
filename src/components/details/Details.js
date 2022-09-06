import './Details.css';
import 'antd/dist/antd.min.css';
import Slider from '@mui/material/Slider';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Progress } from 'antd';
function Details(props) {
  var moment = require('moment'); // require
  const marks = [
    {
      value: 0,
      label: '0%',
    },

    {
      value: 50,
      label: '50%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];
  function valuetext(value) {
    return `${value}%`;
  }
  const formatdat = (date) => {

    return moment.unix(date).format("ddd, DD MMM")
  }

  const round = (number) => {
    return Math.round(number, 1)
  }
  return (
    <div className="Details">
      <div className='Future'>
        {
          props.daily.daily.slice(1, 6).map((dia, i) => (
            <div className='Future-detail' key={i}>
              {i === 0 ? <p>Tomorrow</p> : <p>{formatdat(dia.dt)}</p>}

              <img src={require(`../../assets/${dia.weather[0].icon}.png`)} alt={dia.weather[0].main}></img>
              <div className='temp_daily'>
                <p>{round(dia.temp.max)}°C</p>
                <p>{round(dia.temp.min)}°C</p>
              </div>
            </div>
          ))
        }


      </div>
      <p>Todays Hightlights</p>
      <div className='Hightlights'>

        <div className='Hightlight-item'>
          <p>Wind Status</p>
          <p>{props.clima.wind.speed}mph</p>
          <div style={{
            margin:" 0 auto",
            padding: "0",
            transform:`rotate(${props.clima.wind.deg}deg)` ,
            background: "rgb(87 148 161)",
            borderRadius:" 50%",
            width: "40px",
            height:"40px"
          }}><NavigationIcon fontSize="inherit" /></div>
      </div>
      <div className='Hightlight-item'>
        <p>Humidity</p>
        <p>{props.clima.main.humidity}%</p>
        <div className='Slider'>
          <Progress percent={props.clima.main.humidity} status="active" />
        </div>

      </div>
      <div className='Hightlight-item'>
        <p>Visibility</p>
        <p>{props.clima.visibility} miles</p>
      </div>
      <div className='Hightlight-item'>
        <p>Air Pressure</p>
        <p>{props.clima.main.pressure} mb</p>
      </div>
    </div>
    </div >
  );
}

export default Details;
