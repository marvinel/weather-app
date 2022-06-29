import './Details.css';

import Slider from '@mui/material/Slider';
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
  const formatdat = (date) =>{

    return moment.unix(date).format("ddd, DD MMM")
  }

  const round=(number)=>{
    return Math.round(number,1)
    }
  return (
    <div className="Details">
      <div className='Future'>
        {
          props.daily.daily.slice(1,6).map((dia, i) => (
            <div className='Future-detail' key={i}>
              {i === 0 ? <p>Tomorrow</p> : <p>{formatdat(dia.dt)}</p>}
              <p>{round(dia.temp.day)}°C</p>
              
            </div>
          ))
        }


      </div>
      <h3>Todays Hightlights</h3>
      <div className='Hightlights'>

        <div className='Hightlight-item'>
          <p>Wind Status</p>
          <p>{props.clima.wind.speed}mph</p>
        </div>
        <div className='Hightlight-item'>
          <p>Humidity</p>
          <p>{props.clima.main.humidity}%</p>
          <div className='Slider'>
          <Slider
            aria-label="Always visible"
            defaultValue={props.clima.main.humidity}
            disabled
            step={1}
            marks={marks}
            valueLabelDisplay="on"
          />
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
    </div>
  );
}

export default Details;
