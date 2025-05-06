import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { useParams, useSearchParams } from "react-router-dom";
import Skeleton from "../WeatherDashboard/components/Skeleton";
import CitySearch from "@/components/CItySearch";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { FavouriteButton } from "@/components/FavouriteButton";


const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <div className="flex items-center justify-center flex-col text-white h-full bg-red-500 rounded-md space-y-2">Failed to load weather data. Please try again.</div >
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <Skeleton />;
  }
  return (
    <div>

      <CitySearch />
      <div className="flex  bg-white lg:gap-5 gap-2 items-center rounded-md mb-2 p-2">
        <div className="">
          {params.cityName}, {weatherQuery.data.sys.country}
        </div>
        <div className="flex gap-2">
          <FavouriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-5 lg:space-y-0 space-y-5">
        <div className="col-span-3">
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="cols-span-3">
          <WeatherForecast data={forecastQuery.data} />
        </div>
        <CurrentWeather data={weatherQuery.data} />

        <WeatherDetails data={weatherQuery.data} />

      </div></div>
  )
}

export default CityPage