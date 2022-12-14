import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'; //calling components for reusing

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const ArtistDetails = () => {
    const dispatch = useDispatch();
    const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
    const topSongsData = artistData?.data[0]?.views['top-songs']?.data;  //updating as old api deprecated
    if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;
    if (error) return <Error />;
    //reusing pause play functions
    const handlePauseClick = () => { dispatch(playPause(false)); };
    const handlePlayClick = (song, index) => {
      const data = topSongsData;
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    };

    return (
      <div className="flex flex-col">
        <DetailsHeader
          artistId={artistId}
          artistData={artistData}
        />
        <RelatedSongs
          data={topSongsData}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      </div>
    );
};

export default ArtistDetails;