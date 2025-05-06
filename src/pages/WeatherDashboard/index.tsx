import { useGeolocation } from "@/hooks/useGeolocation";
import Skeleton from "./components/Skeleton";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import CitySearch from "@/components/CItySearch";
import PrimaryButton from "@/components/PrimaryButton";


const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <Skeleton />
  }


  if (locationError) {
    return <div className="flex items-center justify-center flex-col text-white h-full bg-red-500 rounded-md space-y-2">{locationError}<PrimaryButton label="Reset" onClick={() => { handleRefresh() }} /> <div className="text-black"><CitySearch /></div></div>
  }

  if (!coordinates) {
    return <div>Location required</div>
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="flex items-center justify-center flex-col text-white h-full bg-red-500 rounded-md space-y-2"><div className="bg-white text-red-500 p-4 rounded-md">Error <div>Fail  to fetch weather data, try again</div></div><PrimaryButton label="ReFetch" onClick={() => { handleRefresh() }} /> </div>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <Skeleton />;
  }

  // getLocation()

  return (
    <div>

      <CitySearch />

      <div className="lg:grid lg:grid-cols-3 lg:gap-5 lg:space-y-0 space-y-5">

        <CurrentWeather locationName={locationName} data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />
        <WeatherDetails data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
    </div>
  )
}

export default WeatherDashboard