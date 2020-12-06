import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  isLibraryOpen,
}) => {
  return (
    <div className={`library ${isLibraryOpen ? "active-library" : ""}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          id={song.id}
          song={song}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          songs={songs}
        />
      ))}
    </div>
  );
};

export default Library;
