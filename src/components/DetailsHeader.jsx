// its a dynamic component used for both song detail and artist detail
import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
    const artist = artistData?.data[0]?.attributes;  //added for making songs playable on artists detail page
    return(
      <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img 
            alt="profile" 
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
            src={
              artistId ? artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500') : songData?.images?.coverart
            }/> {/* as api returns a dynamic image replacing the width and height of image to 500px, if don't have artistid then sending song data */}
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">{artistId ? artist?.name : songData?.title}</p>
          {!artistId && (
            <Link to={`/artists/${(songData == undefined || songData.artists == undefined) ? songData[0]?.artists[0]?.adamid : songData?.artists[0]?.adamid}`}>
              <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
            </Link>
          )} {/* will execute if no artistid present/exist */}
          <p className="text-base text-gray-400 mt-2">{artistId ? artist?.genreNames[0] : songData?.genres?.primary}</p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
    );
};

export default DetailsHeader;
