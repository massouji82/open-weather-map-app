import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { ErrorType, Unit, WeatherData } from "../types";
import Dashboard from "./Dashboard";
import Details from "./Details";
import ErrorPage from "../ErrorPage";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const unitsInLocalStorage = () => {
  if (localStorage.getItem("units")) return true;
  return false;
};

const currentLocationInLocalStorage = () => {
  if (localStorage.getItem("currentLocationPosition")) return true;
  return false;
};

function App() {
  const [units, setUnits] = useState<Unit>(
    unitsInLocalStorage() ?
      (JSON.parse(localStorage.getItem("units") || "[]")) : "metric"
  );
  const [errorObj, setErrorObj] = useState<ErrorType>();
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentLocationPosition, setCurrentLocationPosition] = useState(
    currentLocationInLocalStorage() ?
      (JSON.parse(localStorage.getItem("currentLocationPosition") || "[]")) :
      {
        currentLatitude: 0,
        currentLongitude: 0
      }
  );

  const handleUnitsToggle = () => {
    setUnits(units => units === 'metric' ? 'imperial' : 'metric');
  };

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
        tempMax: location.main.temp_max,
        tempMin: location.main.temp_min,
        humidity: location.main.humidity,
        sunRise: location.sys.sunrise,
        sunSet: location.sys.sunset,
        icon: location.weather[0].icon,
        name: location.name === "Abbey Wood" ? "London" : location.name,
        visibility: location.visibility,
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
        const currentLocationResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${currentLocationPosition.currentLatitude}&lon=${currentLocationPosition.currentLongitude}&appid=${apiKey}`);

        const rioDeJaneiroResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=-22.908333&lon=-43.196388&appid=${apiKey}`);

        const londonResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=51.5072&lon=0.1276&appid=${apiKey}`);

        locationsData.push(
          currentLocationResponse.data,
          rioDeJaneiroResponse.data,
          londonResponse.data
        );

        weatherDataFunc(locationsData, setWeatherData);

        setIsloading(false);
      } catch (error) {
        const errors = error as ErrorType;
        if (!axios.isAxiosError(errors)) {
          // do something meaningful
          // console.error("Hm something went wrong: ", errors);
        }
        setShowError(true);

        setErrorObj(errors);
      }
    };

    if (isFirstFetch) {
      getWeatherData()
        .catch(console.error);
    }

    return () => {
      isFirstFetch = false;
    };
  }, [currentLocationPosition.currentLatitude, currentLocationPosition.currentLongitude, weatherDataFunc, units]);

  useEffect(() => {
    localStorage.setItem('units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('currentLocationPosition', JSON.stringify(currentLocationPosition));
  }, [currentLocationPosition]);

  return (
    <>
      {isLoading ?
        <div className="loading">
          Loading...
        </div> :
        showError ? <ErrorPage error={errorObj!} handleBackButtonClick={handleBackButtonClick} /> :
          showDashboard ?
            weatherData.length ?
              <Dashboard
                weatherData={weatherData}
                handleLocationSelect={handleLocationSelect}
                handleUnitsToggle={handleUnitsToggle}
                units={units}
              /> : null
            : <Details
              weatherData={weatherData.filter(data => data.name === selectedLocation)[0]}
              handleBackButtonClick={handleBackButtonClick}
              units={units}
            />
      }
    </>
  );
}

export default App;
