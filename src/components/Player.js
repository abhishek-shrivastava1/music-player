import React, { useRef, useState } from "react";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // States
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // Ref
  const audioRef = useRef(null);
  // Handlers
  const songPlayHandler = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      audioRef.current.pause();
    } else {
      setIsPlaying(!isPlaying);
      audioRef.current.play();
    }
  };
  const timeUpdateHandler = (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const dragHandler = (event) => {
    setSongInfo({ ...songInfo, currentTime: event.target.value });
    audioRef.current.currentTime = event.target.value;
  };

  // Functions
  const getFormattedTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className="player">
      <div className="time-controls">
        <p>{getFormattedTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getFormattedTime(songInfo.duration)}</p>
      </div>
      <div className="player-controls">
        <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        <FontAwesomeIcon
          onClick={songPlayHandler}
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon icon={faAngleRight} size="2x" />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
