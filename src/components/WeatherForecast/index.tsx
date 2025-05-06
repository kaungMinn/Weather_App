import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { TbArrowDown, TbArrowUp, TbDroplet, TbWind } from "react-icons/tb";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;
    }, {} as Record<string, DailyForecast>);


    const nextDays = Object.values(dailyForecasts).slice(1, 6);


    const formatTemp = (temp: number) => `${Math.round(temp)}°`;

    return (
        <div className="col-span-2 rounded-md space-y-3 p-5 bg-white">   {nextDays.map((day) => (
            <div
                key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
            >
                <div>
                    <p className="font-bold text-sm">
                        {format(new Date(day.date * 1000), "EEE, MMM d")}
                    </p>
                    <p className="text-xs font-light text-gray-500 text-muted-foreground capitalize">
                        {day.weather.description}
                    </p>
                </div>

                <div className="flex justify-center text-sm gap-4">
                    <span className="flex items-center text-blue-500">
                        <TbArrowDown className="mr-1 h-4 w-4" />
                        {formatTemp(day.temp_min)}
                    </span>
                    <span className="flex items-center text-red-500">
                        <TbArrowUp className="mr-1 h-4 w-4" />
                        {formatTemp(day.temp_max)}
                    </span>
                </div>

                <div className="flex justify-end gap-4">
                    <span className="flex items-center gap-1">
                        <TbDroplet className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-light text-gray-500">{day.humidity}%</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <TbWind className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-light text-gray-500">{day.wind}m/s</span>
                    </span>
                </div>
            </div>
        ))}</div>
    )
}

export default WeatherForecast