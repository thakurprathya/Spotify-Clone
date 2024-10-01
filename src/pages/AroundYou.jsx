import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);  //destructring particular data from redux
    const { data, isFetching, error } = useGetSongsByCountryQuery(country);  //destructuring data from api hook
    const regionName = new Intl.DisplayNames(['en'], { type: 'region' }); // The Intl.DisplayNames object enables the consistent translation of language, region and script display names.

    useEffect(() => {  {/* will run every time after country changes */}
        // api call
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
        .then((res) => setCountry(res?.data?.location.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, [country]);

    if (isFetching && loading) return <Loader title="Loading Songs around you..." />;
    if (error && country !== '') return <Error />;
    const countryName= regionName.of(country || "IN");  //taking it bydefault IN else will raise an error because of being empty ""

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Around you <span className="font-black">{countryName}</span>
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, index) => (
                <SongCard
                    key={song?.id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    index={index}
                />
                ))}
            </div>
        </div>
    );
};

export default CountryTracks;