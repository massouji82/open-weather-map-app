import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import './app.css';
import { ErrorType, WeatherData } from "../types";
import Dashboard from "./Dashboard";
import Details from "./Details";
import ErrorPage from "../ErrorPage";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [errorObj, setErrorObj] = useState<ErrorType>();
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentLocationPosition, setCurrentLocationPosition] = useState({
    currentLatitude: 0,
    currentLongitude: 0
  });

  const handleLocationSelect = (location: WeatherData['name']) => {
    setSelectedLocation(location);
    setShowDashboard(false);
  };

  const handleBackButtonClick = () => {
    setSelectedLocation('');
    setShowDashboard(true);
    setShowError(false);
  };

  const weatherDataFunc = useCallback((
    locationsData: any[],
    setState: React.Dispatch<React.SetStateAction<WeatherData[]>>
  ) => {
    const weatherDataArray: WeatherData[] = [];

    locationsData.map(location => {
      weatherDataArray.push({
        currentWeather: location.weather[0].main,
        temp: location.main.temp,
        tempMax: location.main.temp_min,
        tempMin: location.main.temp_max,
        humidity: location.main.humidity,
        sunRise: location.sys.sunrise,
        sunSet: location.sys.sunset,
        icon: location.weather[0].icon,
        name: location.name === "Abbey Wood" ? "London" : location.name
      });

      return weatherDataArray;
    });

    setState(weatherDataArray);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser!");

      setCurrentLocationPosition({
        // hardcoded lat lon of Oslo
        currentLatitude: 59.9139,
        currentLongitude: 10.7522
      });
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocationPosition({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude
        });
      });
    }
  }, []);

  useEffect(() => {
    let isFirstFetch = true;

    const getWeatherData = async () => {
      let locationsData = [];

      try {
        const currentLocationResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${currentLocationPosition.currentLatitude}&lon=${currentLocationPosition.currentLongitude}&appid=${apiKey}`);

        const rioDeJaneiroResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=-22.908333&lon=-43.196388&appid=${apiKey}`);

        const londonResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=51.5072&lon=0.1276&appid=${apiKey}`);

        locationsData.push(
          currentLocationResponse.data,
          rioDeJaneiroResponse.data,
          londonResponse.data
        );

        weatherDataFunc(locationsData, setWeatherData);
      } catch (error) {
        const errors = error as ErrorType;
        if (!axios.isAxiosError(errors)) {
          console.log("Hm something went wrong: ", errors);
        }
        setShowError(true);
        setErrorObj(errors);
      }
    };

    if (isFirstFetch) {
      getWeatherData()
        .catch(console.error);
    }

    setIsloading(false);

    return () => {
      isFirstFetch = false;
    };
  }, [currentLocationPosition.currentLatitude, currentLocationPosition.currentLongitude, weatherDataFunc]);

  return (
    <>
      {isLoading ?
        <div>
          Loading...
        </div> :
        showError ? <ErrorPage error={errorObj!} handleBackButtonClick={handleBackButtonClick} /> :
          showDashboard ?
            weatherData.length ?
              <Dashboard
                weatherData={weatherData}
                handleLocationSelect={handleLocationSelect}
              /> : null
            : <Details
              weatherData={weatherData.filter(data => data.name === selectedLocation)[0]}
              handleBackButtonClick={handleBackButtonClick}
            />
      }
    </>
  );
}

export default App;