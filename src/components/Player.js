import React from "react";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songInfo,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  currentSong,
  setCurrentSong,
  songs,
  setSongs,
}) => {
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

  const activeLibraryHandler = (currentSong) => {
    setSongs(
      songs.map((song) => {
        if (song.id === currentSong.id) {
          return { ...song, active: true };
        } else {
          return { ...song, active: false };
        }
      })
    );
  };
  const dragHandler = (event) => {
    setSongInfo({ ...songInfo, currentTime: event.target.value });
    audioRef.current.currentTime = event.target.value;
  };

  const skipTrackHandler = async (direction) => {
    let index = songs.findIndex((song) => song.id === currentSong.id);
    // setCurrentSong({ ...currentSong, active: false });
    if (direction === "skip-forward") {
      await setCurrentSong(
        songs[(index + 1) % songs.length === 0 ? 0 : index + 1]
      );
      activeLibraryHandler(
        songs[(index + 1) % songs.length === 0 ? 0 : index + 1]
      );
    }
    if (direction === "skip-backward") {
      await setCurrentSong(songs[index - 1 < 0 ? songs.length - 1 : index - 1]);
      activeLibraryHandler(songs[index - 1 < 0 ? songs.length - 1 : index - 1]);
    }
    if (isPlaying) audioRef.current.play();
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
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div
            style={{
              transform: `translateX(${songInfo.animationPercentage}%)`,
            }}
            className="animate-track"
          ></div>
        </div>
        <p>
          {songInfo.duration ? getFormattedTime(songInfo.duration) : "0:00"}
        </p>
      </div>
      <div className="player-controls">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-backward")}
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={songPlayHandler}
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
};

export default Player;
