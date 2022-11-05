import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; //importing redux hook

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, index }) => {
    const dispatch = useDispatch(); //this hooks helps in making changes in the redux 
    const handlePauseClick = () => { dispatch(playPause(false)); };
    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, index }));
        dispatch(playPause(true));
    };
    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
          <div className="relative w-full h-56 group">
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex 
              ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'flex md:hidden bg-opacity-30'}`}> {/* first ? checking if activesong exists or not */}
                <PlayPause //will be visible when hovering over any cover, passing props to it
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  song={song}
                  handlePause={handlePauseClick}
                  handlePlay={handlePlayClick}
                />
            </div>
            <img alt="song_img" src={song.images?.coverart} className="w-full h-full rounded-lg" /> {/* if exists fetching coverarts for songs */}
          </div>
          <div className="mt-4 flex flex-col">
            <p className="font-semibold text-lg text-white truncate">  {/*if title too long will truncate it */}
              <Link to={`/songs/${song?.key}`}>{song.title}</Link>
            </p>
            <p className="text-sm truncate text-gray-300 mt-1">
              {/* if song.artist exists moving to link else moving to top-artists */}
              <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>{song.subtitle}</Link>
            </p>
          </div>
        </div>
    );
};

export default SongCard;