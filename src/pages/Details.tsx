import './app.css';
import arrow from '../assets/left-arrow.png';
import LocationDetails from '../Components/LocationDetails';
import { WeatherData } from '../types';

function Details({ weatherData, handleBackButtonClick }:
  { weatherData: WeatherData, handleBackButtonClick: () => void; }
) {
  return (
    <>
      <div className='header-row'>
        <button onClick={handleBackButtonClick}>
          <img src={arrow} alt='go back' width='20px' height='20px'></img>
        </button>

        <h1 className='details-header'>
          {weatherData.name}
        </h1>

        <div></div>
      </div>

      <LocationDetails weatherData={weatherData} />
    </>
  );
}

export default Details;  