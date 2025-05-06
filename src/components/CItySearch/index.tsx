import { useLocationSearch } from "@/hooks/useWeather";
import { debounce } from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../Box";
import PrimaryButton from "../PrimaryButton";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useFavourites } from "@/hooks/useFavourite";

const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { data: locations, isLoading } = useLocationSearch(query);
    const { favorites } = useFavourites();
    const { history, clearHistory, addToHistory } = useSearchHistory();

    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");

        // Add to search history
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });

        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };

    const handleSearch = debounce((query) => {
        setQuery(query)
    }, 500); // 500ms delay
    return (
        <div className="">
            <div className="  flex flex-col items-center mb-5"><label htmlFor="" className="text-white text-xs mb-1">Search for cities</label><PrimaryButton label="Search For Cities" onClick={() => setOpen(true)} /></div>
            <Box open={open}>
                <div className="lg:h-[500px] h-[500px] lg:w-[500px] w-[200px]">
                    <div className="flex justify-between items-end mb-5">
                        <h2 className="text-sm font-semibold">
                            City Search
                        </h2>
                        <PrimaryButton label="Close" onClick={() => { setOpen(false) }} />
                    </div>

                    <div className="relative">
                        <input className="bg-white outline-none w-full border px-4 h-10 rounded-md" value={searchValue} onChange={(ev) => {
                            handleSearch(ev.target.value)
                            setSearchValue(ev.target.value)
                        }} />
                        <div className="absolute top-1/2 -translate-y-1/2 right-3"><PrimaryButton onClick={() => { setQuery(""); setSearchValue("") }} label="X" /></div>
                    </div>

                    <div className="bg-gray-100 mt-4 rounded-md p-4 text-xs font-light h-[400px] overflow-auto space-y-2">
                        {isLoading && <div className="text-center">...loading</div>}
                        {
                            locations && locations.length > 0 && <div className="mb-4 space-y-2">{
                                locations.map(location => (
                                    <div key={`${location.lat}-${location.lon}`} className={`hover:bg-gray-300 bg-gray-200 p-2 rounded-md cursor-pointer flex gap-2`} onClick={() => {
                                        handleSelect(`${location.lat}|${location.lon}|${location.name}|${location.country}`)
                                    }}>
                                        {location.name} <div className="text-gray-400">,   {location.state} , {location.country}</div>
                                    </div>
                                ))}</div>
                        }

                        {
                            favorites && favorites.length > 0 && <div className="rounded-md mb-4 space-y-2 bg-pink-500 p-2">
                                <div className="mb-2 text-white flex justify-between">Favourites</div>
                                {
                                    favorites.map(location => (
                                        <div key={`${location.lat}-${location.lon}`} className={`hover:bg-pink-300 bg-gray-200 p-2 rounded-md cursor-pointer flex gap-2`} onClick={() => {
                                            handleSelect(`${location.lat}|${location.lon}|${location.name}|${location.country}`)
                                        }}>
                                            {location.name} <div className="text-gray-400">,   {location.state} , {location.country}</div>
                                        </div>
                                    ))}</div>
                        }

                        {
                            history && history.length > 0 && <div className="space-y-2 bg-yellow-600 p-2 rounded-md">
                                <div className="mb-2 text-white flex justify-between items-end">Searched History <PrimaryButton label="Clear" onClick={() => clearHistory.mutate()} /></div>
                                {
                                    history.map(location => (
                                        <div key={`${location.lat}-${location.lon}`} className={`hover:bg-yellow-200 bg-gray-200 p-2 rounded-md cursor-pointer flex gap-2`} onClick={() => {
                                            handleSelect(`${location.lat}|${location.lon}|${location.name}|${location.country}`)
                                        }}>
                                            {location.name} <div className="text-gray-400">, {location.state} , {location.country}</div>
                                        </div>
                                    ))
                                }</div>

                        }
                    </div>



                </div>
            </Box>
        </div>
    )
}

export default CitySearch