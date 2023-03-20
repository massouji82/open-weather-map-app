import { Unit, WeatherData } from '../types';
import './dashboard.css';
import './app.css';
import { checkUnits } from '../helpers';

const Dashboard = ({
  weatherData, units, handleLocationSelect, handleUnitsToggle }:
  {
    weatherData: WeatherData[],
    units: Unit,
    handleLocationSelect: (location: WeatherData['name']) => void,
    handleUnitsToggle: () => void;
  }
) => {
  return (
    <>
      <div className='header-row'>
        <button className='units-btn' onClick={handleUnitsToggle}>
          {checkUnits(units)}
        </button>

        <h1>
          Dashboard
        </h1>

        <div></div>
      </div>

      <div className='locations'>
        {weatherData.map((data, index) => {
          return (
            <>
              {data.name === "Globe" ?
                <div className='loading-location'>
                  Loading your location...
                </div> :
                <div
                  key={index}
                  className='location' onClick={() => handleLocationSelect(data.name)}
                >
                  <div style={{ marginRight: "10px" }}>{data.name}</div>

                  <div className='location-temp'>{data.temp}{checkUnits(units)}</div>
                </div>
              }
            </>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;