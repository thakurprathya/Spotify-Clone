/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';  //selector and functionality adder hook of react redux
import { Swiper, SwiperSlide } from 'swiper/react'; //special react pacakage for swiping through artists
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';  //importing api hook

//css modules required for swiper
import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, index, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => { 
    return(
      <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
        <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
          <img className="w-[4rem] h-[4rem] rounded-lg" src={song?.images?.coverart} alt={song?.title} />
          <div className="flex-1 flex flex-col justify-center mx-3">
            <Link to={`/songs/${song.key}`}><p className="text-xl font-bold text-white">{song?.title}</p></Link>
            <Link to={`/artists/${song[0]?.artists[0].adamid}`}><p className="text-base text-gray-300 mt-1">{song?.subtitle}</p></Link>
          </div>
        </div>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </div>
    );
};

const TopPlay = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data } = useGetTopChartsQuery();
    const divRef = useRef(null);
    useEffect(() => {  //this effect helps in taking back to top, after reloading
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    });
    const topPlays = data?.slice(0, 5);
    //importing functions from songcard component  
    const handlePauseClick = () => {
      dispatch(playPause(false));
    };
    const handlePlayClick = (song, index) => {  //passing the specific song and index to play on clicking the button
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
    };
    // console.log(topPlays[0].artists[0].adamid)
    return (
      //top charts
      <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
        <div className="w-full flex flex-col h-[55vh] overflow-scroll">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Charts</h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            {topPlays?.map((song, index) => (
              <TopChartCard
                key={song.key}
                song={song}
                index={index}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song, index)}
              />
            ))}
          </div>
        </div>
        {/* top artists */}
        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">Top Artists</h2>
            <Link to="/top-artists"><p className="text-gray-300 text-base cursor-pointer">See more</p></Link>
          </div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4">
                {topPlays?.map((artist) => (
                <SwiperSlide
                  key={artist?.key}
                  style={{ width: '25%', height: 'auto' }}
                  className="shadow-lg rounded-full animate-slideright">
                    <Link to={`/artists/${artist[0]?.artists[0].adamid}`}>
                      <img src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
                    </Link>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
};

export default TopPlay;