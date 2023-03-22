import { Unit, WeatherData } from "./types";

export function timeExtractor(rise: WeatherData['sunRise'], set: WeatherData['sunSet']) {
  let sunRise = new Date(rise as any * 1000);
  let sunSet = new Date(set as any * 1000);

  return {
    rise: sunRise.toLocaleTimeString("en-GB"),
    set: sunSet.toLocaleTimeString("en-GB")
  };
};

export function checkUnits(units: Unit) {
  return units === 'imperial' ? '°F' : '°C';
}
