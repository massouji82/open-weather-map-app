import { WeatherData } from "../types";

const WeatherDetails = ({ weatherData: { currentWeather, temp, tempMax, tempMin, humidity, sunRise, sunSet, icon, name } }: { weatherData: WeatherData; }) => {
  return (
    <>
      {currentWeather},
      {temp},
      {tempMax},
      {tempMin},
      {humidity},
      {sunRise},
      {sunSet},
      {icon},
      {name}
    </>
  );
};

export default WeatherDetails;