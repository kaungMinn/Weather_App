import { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { TbCompass, TbGauge, TbSunrise, TbSunset } from "react-icons/tb";

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
    const { wind, main, sys } = data;

    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    };

    const getWindDirection = (degree: number) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index =
            Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return directions[index];
    };

    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: TbSunrise,
            color: "text-orange-500",
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: TbSunset,
            color: "text-blue-500",
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: TbCompass,
            color: "text-green-500",
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: TbGauge,
            color: "text-purple-500",
        },
    ];
    return (
        <div className="bg-white rounded-md overflow-hidden grid grid-cols-2 gap-3 p-5">{details.map(detail => (
            <div key={detail.title} className="flex items-center justify-center gap-3 border  rounded-md p-4 ">
                <detail.icon className={`h-5 w-5 ${detail.color}`} />
                <div>
                    <p className="text-xs font-light text-gray-500 leading-none">
                        {detail.title}
                    </p>
                    <p className="text-sm font-semibold text-muted-foreground">
                        {detail.value}
                    </p>
                </div>
            </div>
        ))}</div>
    )
}

export default WeatherDetails