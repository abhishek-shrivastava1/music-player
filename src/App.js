import React, { useState } from "react";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
// Styles
import "./styles/App.scss";
// Data
import data from "./data";

function App() {
  // States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
