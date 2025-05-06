// src/components/weather/favorite-button.tsx
import { Star } from "lucide-react";
import type { WeatherData } from "@/api/types";
import { toast } from "sonner";
import { useFavourites } from "@/hooks/useFavourite";

interface FavoriteButtonProps {
    data: WeatherData;
}

export function FavouriteButton({ data }: FavoriteButtonProps) {
    const { addFavorite, removeFavorite, isFavorite } = useFavourites();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`);
        } else {
            addFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites`);
        }
    };

    return (
        <button

            onClick={handleToggleFavorite}
            className={isCurrentlyFavorite ? "text-yellow-500 hover:text-yellow-600" : ""}
        >
            <Star
                className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
            />
        </button>
    );
}
