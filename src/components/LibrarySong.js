import React from "react";

const LibrarySong = ({
  id,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  songs,
}) => {
  // Handler
  const selectCurrentSongHandler = async () => {
    // setSongs(songs);;
    await setCurrentSong({ ...song, active: true });
    setSongs(
      songs.map((s) => {
        if (s.id === id) return { ...s, active: true };
        return { ...s, active: false };
      })
    );
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={selectCurrentSongHandler}
      className={`library-songs ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
