//in this file we will focus on making api calls
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({  //calling createapi function
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers)=>{  //this function will prepare headers before each and every call
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
            return headers;
        }
    }),
    endpoints: (builder)=> ({  //creating endpoints depending upon our request url refer fetch world chart request on rapicapi ext
        getTopCharts: builder.query({ query: (countryCode)=>`/v1/charts/world?country_code=${'IN'}` }),  //react toolkit allows us to call gettopcharts as a hook, query is a function returning string as directly setting string will alter endpoints which our extension to it.
        getSongsByGenre: builder.query({ query: (genre, countryCode) => `/v1/charts/genre-world?genre_code=${genre}&country_code=${'IN'}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `/v1/charts/country?country_code=${countryCode}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
        getArtistDetails: builder.query({ query: (artistId) => `/v2/artists/details?artist_id=${artistId}` }),
        getSongDetails: builder.query({ query: ({ songid }) => `/v1/tracks/details?track_id=${songid}` }),
        getSongRelated: builder.query({ query: ({ songid }) => `/v1/tracks/related?track_id=${songid}` }),
    })
});

export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
    useGetArtistDetailsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
  } = shazamCoreApi; 