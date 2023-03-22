import { Unit, WeatherData } from '../types';
import './dashboard.css';
import './app.css';
import { checkUnits } from '../helpers';
import { Fragment } from 'react';

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
            <Fragment key={index}>
              {data.name === "Globe" ?
                <div className='loading-location'>
                  Loading your location...
                </div> :
                <button
                  className='location' onClick={() => handleLocationSelect(data.name)}
                >
                  <div style={{ marginRight: "10px" }}>{data.name}</div>

                  <div className='location-temp'>{data.temp}{checkUnits(units)}</div>
                </button>
              }
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;