import './details.css';
import arrow from '../assets/left-arrow.png';
import WeatherDetails from '../Components/WeatherDetails';
import { WeatherData } from '../types';

function Details({ weatherData, handleBackButtonClick }:
  { weatherData: WeatherData, handleBackButtonClick: () => void; }
) {
  return (
    <>
      <div className='details-row'>
        <button className='btn' onClick={handleBackButtonClick}>
          <img src={arrow} alt='go back' width='20px' height='20px'></img>
        </button>

        <h1 className='details-header'>
          Details
        </h1>

        <div></div>
      </div>

      <WeatherDetails weatherData={weatherData} />
    </>
  );
}

export default Details;  