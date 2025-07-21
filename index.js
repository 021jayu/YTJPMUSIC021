
const firebaseConfig = {
  apiKey: "AIzaSyAr_hNAJ1VsC-n77tcwcc1L2gVhD_WJf7E",
  authDomain: "ytmusicdownload-d7404.firebaseapp.com",
  databaseURL: "https://ytmusicdownload-d7404-default-rtdb.firebaseio.com",
  projectId: "ytmusicdownload-d7404",
  storageBucket: "ytmusicdownload-d7404.appspot.com",
  messagingSenderId: "854569253804",
  appId: "1:854569253804:web:74031abd5082ccaca41809",
  measurementId: "G-KTBN19GM4E"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function fetchSongs() {
  db.ref("songs").once("value", snapshot => {
    const songs = snapshot.val();
    const container = document.getElementById("songsList");
    container.innerHTML = "";

    for (let id in songs) {
      const song = songs[id];
      const card = document.createElement("div");
      card.className = "song-card";
      card.innerHTML = `
        <div class="song-title">${song.title} - ${song.artist || "Unknown"}</div>
        <div class="song-actions">
          <a href="https://www.youtube.com/watch?v=${song.id}" target="_blank">▶️ YouTube</a>
          <a href="${song.driveLink}" target="_blank">⬇️ MP3</a>
          <button class="like-btn" onclick="likeSong('${id}')">❤️ Like</button>
        </div>
      `;
      container.appendChild(card);
    }
  });
}

function likeSong(songId) {
  alert("Liked song ID: " + songId);
}

window.onload = fetchSongs;


// Inside your Firebase data fetch loop
const songCard = document.createElement("div");
songCard.className = "song-card";

// Fallback values if something is missing
const songName = songData.name || "Unknown Title";
const youtubeID = songData.youtubeID || "";
const thumbnailURL = youtubeID ? `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg` : "default.jpg";

songCard.innerHTML = `
  <img src="${thumbnailURL}" alt="${songName}" class="song-thumbnail" />
  <div class="song-info">
    <h3>${songName}</h3>
    <p><strong>Artist:</strong> ${songData.artist || "Unknown"}</p>
    <p><strong>Category:</strong> ${songData.category || "Uncategorized"}</p>
    <p><strong>Date:</strong> ${songData.date || "N/A"}</p>
    <div class="song-actions">
      <a href="${songData.driveLink || "#"}" class="btn green" target="_blank">Download MP3</a>
      <a href="https://www.youtube.com/watch?v=${youtubeID}" class="btn green" target="_blank">Watch</a>
    </div>
  </div>
`;

