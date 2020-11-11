import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          setCurrentSong={setCurrentSong}
        />
      ))}
    </div>
  );
};

export default Library;
