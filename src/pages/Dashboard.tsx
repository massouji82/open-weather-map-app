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
              {data.name}
              {data.temp}°C
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;