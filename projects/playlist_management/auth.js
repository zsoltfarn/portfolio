const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const CLIENT_ID = 'your_client_id';
const CLIENT_SECRET = 'your_client_secret';
const REDIRECT_URI = 'your_redirect_uri';
let accessToken = ''; // Store your access token here after authentication

// Fetch playlist tracks
app.get('/api/playlist/tracks', (req, res) => {
  const playlistId = 'your_playlist_id';
  fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

// Delete tracks in bulk
app.delete('/api/playlist/delete', (req, res) => {
  const playlistId = 'your_playlist_id';
  const trackUris = req.body.tracks.map(uri => ({ uri }));

  fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tracks: trackUris })
  })
    .then(response => res.sendStatus(response.status))
    .catch(error => console.error(error));
});

// OAuth 2.0 Authentication
app.get('/login', (req, res) => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=playlist-modify-public playlist-modify-private`;
  res.redirect(authUrl);
});

app.listen(3000, () => console.log('Server running on port 3000'));
