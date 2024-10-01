import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore'; //calling diff api hooks which we created

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid, id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);  //selecting particular components from redux

    //destructuring our api calls
    const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery({ songid });  //enclosing songid in {} for destructuring
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

    if (isFetchingSongDetails && isFetchinRelatedSongs){ return <Loader title="Searching song details" />; }
    // if (error) return <Error />;

    //copying functions from songcard component
    const handlePauseClick = () => {
        dispatch(playPause(false));
    };
    const handlePlayClick = (song, index) => {
        dispatch(setActiveSong({ song, data, index }));
        dispatch(playPause(true));
    };
console.log(songid, artistId, activeSong, songData)
    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} songData={songData}/>
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
                <div className="mt-5">
                    {songData?.sections[1].type === 'LYRICS' ?
                        songData?.sections[1]?.text.map((line, index) => (
                        <p key={`lyrics-${line}-${index}`} className="text-gray-400 text-base my-1">{line}</p>)
                        ) : (
                        <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p> 
                    )} {/* first checking if we have lyrics or not if not returning sorry else mapping over each line and returning */}
                </div>
            </div>
            <RelatedSongs
                data={data}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    );
};

export default SongDetails;