
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
