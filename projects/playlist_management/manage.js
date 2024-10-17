import React, { useState, useEffect } from 'react';

const SpotifyPlaylistManager = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);

  useEffect(() => {
    // Fetch playlist tracks from Spotify API
    fetch('/api/playlist/tracks')  // You need your server to handle this
      .then(response => response.json())
      .then(data => setTracks(data.items));
  }, []);

  const handleTrackSelect = (trackUri) => {
    setSelectedTracks(prev => {
      if (prev.includes(trackUri)) {
        return prev.filter(uri => uri !== trackUri);  // Deselect track
      }
      return [...prev, trackUri];  // Select track
    });
  };

  const handleBulkDelete = () => {
    fetch('/api/playlist/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tracks: selectedTracks }),
    }).then(response => {
      if (response.ok) {
        setTracks(tracks.filter(track => !selectedTracks.includes(track.track.uri)));
        setSelectedTracks([]);  // Clear selection after deletion
      }
    });
  };

  return (
    <div>
      <h2>Your Playlist</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedTracks.includes(track.track.uri)}
              onChange={() => handleTrackSelect(track.track.uri)}
            />
            {track.track.name} - {track.track.artists[0].name}
          </li>
        ))}
      </ul>
      <button onClick={handleBulkDelete}>Delete Selected Tracks</button>
    </div>
  );
};

export default SpotifyPlaylistManager;
