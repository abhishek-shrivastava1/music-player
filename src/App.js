import React, { useState, useRef } from "react";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Styles
import "./styles/App.scss";
// Data
import data from "./data";

function App() {
  // States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  // Ref
  const audioRef = useRef(null);
  // Handler
  const timeUpdateHandler = (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const animationPercentage = Math.round((currentTime / duration) * 100);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
  };
  const songEndedHandler = async () => {
    let index = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(
      songs[(index + 1) % songs.length === 0 ? 0 : index + 1]
    );
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div className={`App ${isLibraryOpen ? "library-active" : ""}`}>
      <Nav setIsLibraryOpen={setIsLibraryOpen} isLibraryOpen={isLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        isLibraryOpen={isLibraryOpen}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndedHandler}
      ></audio>
    </div>
  );
}

export default App;
