import { WeatherData } from '../types';
import './dashboard.css';

const Dashboard = ({
  weatherData, handleLocationSelect }:
  { weatherData: WeatherData[], handleLocationSelect: (location: WeatherData['name']) => void; }
) => {
  return (
    <>
      <h1 className="dashboard-header">
        Dashboard
      </h1>

      <div className='locations'>
        {weatherData.map((data, index) => {
          return (
            <div key={index} className='location' onClick={() => handleLocationSelect(data.name)}>
              <div style={{ marginRight: "10px" }}>{data.name}</div>
              <div className='location-temp'>{data.temp}°C</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;