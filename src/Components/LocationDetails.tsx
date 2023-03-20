import './locationDetails.css';
import { WeatherData } from "../types";

const timeExtractor = (rise: any, set: any) => {
  let sunRise = new Date(rise as any * 1000);
  let sunSet = new Date(set as any * 1000);

  return {
    rise: sunRise.toLocaleTimeString("en-GB"),
    set: sunSet.toLocaleTimeString("en-GB")
  };
};

const LocationDetails = ({ weatherData: { currentWeather, temp, tempMax, tempMin, humidity, sunRise, sunSet, icon, visibility } }: { weatherData: WeatherData; }) => {
  const { rise, set } = timeExtractor(sunRise, sunSet);

  return (
    <div className='location-details'>
      <div className='main'>
        <div className='icon-container'>
          <span className='weather-description'>{currentWeather}</span>

          <span className='temperature'>{Math.ceil(temp)}°C</span>

          <img
            className='icon'
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="Weather icon"
          />
        </div>

        <div className='temperature-row'>
          <div style={{ marginRight: "20px" }}>
            Max: <span className='text'>{Math.ceil(tempMax)}°C</span>
          </div>

          <div>
            Min: <span className='text'>{Math.ceil(tempMin)}°C</span>
          </div>
        </div>
      </div>

      <div className='details'>
        <div className='details-column'>
          <div className='details-column-element'>
            <span className='details-padding'>Sunrise</span>
            <span className='text-span'>{rise}</span>
          </div>

          <div className='details-column-element-2'>
            <span className='details-padding'>Humidity</span>
            <span className='text-span'>{humidity} %</span>
          </div>
        </div>

        <div className='details-column'>
          <div className=' details-column-element-3'>
            <span className='details-padding'>Sunset</span>
            <span className='text-span'>{set}</span>
          </div>

          <div className=' details-column-element-4'>
            <span className='details-padding'>Visibility</span>
            <span className='text-span'>{visibility} meters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;