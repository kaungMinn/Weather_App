import { GeocodingResponse, WeatherData } from "@/api/types";
import Card from "../Card";
import { TbTemperaturePlus, TbTemperatureMinus, TbDroplets, TbWind } from "react-icons/tb";


interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}
const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;
  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <div className="relative w-full ">
        <div>
          <div className="mb-16">
            <div className="flex items-center justify-end gap-3">
              <h2 className="text-xl font-semibold text-yellow-500">
                {locationName?.name}
              </h2>
              <div className="text-xs text-gray-500 font-light">
                ,{locationName?.state}
              </div>
            </div>
            <div className="text-gray-500 font-light text-xs text-end">
              {locationName?.country}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="text-[60px] font-bold">
                {formatTemp(temp)}
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-gray-500 font-light">
                  Feel Like
                  <span className="font-bold ms-2">
                    {formatTemp(feels_like)}
                  </span>
                </div>

                <div className="flex text-xs gap-6">
                  <div>
                    <TbTemperaturePlus className="text-red-500  font-semibold" />
                    {formatTemp(temp_max)}
                  </div>
                  <div>
                    <TbTemperatureMinus className="text-blue-500 font-semibold" />
                    {formatTemp(temp_min)}
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>

          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2">
              <TbDroplets size={30} className="text-blue-400" />
              <div className="text-xs">
                <div className="text-xs text-blue-400">
                  Humidity
                </div>
                <div>{humidity}%</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TbWind size={30} className="text-yellow-500" />
              <div className="text-xs">
                <div className="text-xs text-yellow-500">
                  Wind Speed
                </div>
                <div>{speed} m/s</div>
              </div>
            </div>
          </div>
        </div>


        <div className="lg:flex flex-col rounded-md w-full h-full justify-end absolute -right-40   -bottom-10 hidden">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
            alt={currentWeather.description}
            className="w-full h-40 object-contain"
          />

          <div className="text-md text-yellow-500 -mt-10 font-semibold text-center mb-10">
            {currentWeather.description}
          </div>
        </div>

      </div>


    </Card>
  )
}

export default CurrentWeather