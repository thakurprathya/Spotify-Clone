/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
    const ref = useRef(null);
    // eslint-disable-next-line no-unused-expressions
    if (ref.current) {
      if (isPlaying) { ref.current.play(); } 
      else { ref.current.pause(); }
    }
    useEffect(() => { //will execute every time volume changes
      ref.current.volume = volume;
    }, [volume]);
    // updates audio element only on seekTime change (and not on each rerender):
    useEffect(() => {
      ref.current.currentTime = seekTime;
    }, [seekTime]);

    const uri = activeSong?.attributes?.previews[0].url || activeSong?.hub?.actions[1]?.uri || activeSong?.hub?.actions || ""; 

    return (
      <audio
        src={uri}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
      />
    );
};

export default Player;
