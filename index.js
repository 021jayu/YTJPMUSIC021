// Firebase Config
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

// Upload Song
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const songData = {
    name: document.getElementById("songName").value,
    youtubeID: document.getElementById("youtubeID").value,
    driveLink: document.getElementById("driveLink").value,
    artist: document.getElementById("artistName").value || "Unknown",
    category: document.getElementById("category").value || "Uncategorized",
    date: new Date().toLocaleDateString("en-IN")
  };

  db.ref("songs").push(songData)
    .then(() => {
      alert("✅ Song uploaded!");
      document.getElementById("uploadForm").reset();
      fetchSongs();
    })
    .catch((error) => {
      console.error("❌ Error uploading song: ", error);
    });
});

// Fetch & Display Songs
function fetchSongs() {
  db.ref("songs").once("value", snapshot => {
    const songs = snapshot.val();
    const container = document.getElementById("songsList");
    container.innerHTML = "";

    for (let id in songs) {
      const song = songs[id];
      const songName = song.name || "Unknown Title";
      const youtubeID = song.youtubeID || "";
      const thumbnailURL = youtubeID
        ? `https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg`
        : "default.jpg";

      const songCard = document.createElement("div");
      songCard.className = "song-card";
      songCard.innerHTML = `
        <img src="${thumbnailURL}" alt="${songName}" class="song-thumbnail" />
        <div class="song-info">
          <h3>${songName}</h3>
          <p><strong>Artist:</strong> ${song.artist}</p>
          <p><strong>Category:</strong> ${song.category}</p>
          <p><strong>Date:</strong> ${song.date}</p>
          <div class="song-actions">
            <a href="${song.driveLink}" target="_blank">⬇️ MP3</a>
            <a href="https://www.youtube.com/watch?v=${youtubeID}" target="_blank">▶️ Watch</a>
            <button onclick="likeSong('${id}')">❤️ Like</button>
          </div>
        </div>
      `;
      container.appendChild(songCard);
    }
  });
}

// Like button (demo alert)
function likeSong(songId) {
  alert("❤️ Liked song: " + songId);
}

// Load songs on start
window.onload = fetchSongs;
