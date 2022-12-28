import React from 'react';

import SongBar from './SongBar';  //calling songbar component , reusing component created for top charts

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, index) => (
          <SongBar
            key={`${song.key}-${song.id}-${artistId}`} 
            song={song}
            index={index}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))} {/* either providing songkey or artist id or index for key */}
      </div>
    </div>
);

export default RelatedSongs;