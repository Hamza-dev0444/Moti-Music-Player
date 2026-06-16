const homeSongs = [
  {
    name: "4AM in Karachi",
    artist: "Talha Anjum",
    file: "songs/4AM in Karachi - Talha Anjum - Prod. UMAIR (Lyrics).mp4",
    cover: "images/karachi.jpg",
  },
  {
    name: "Bom Diggy",
    artist: "Zack Knight, Jasmin Walia",
    file: "songs/Bom diggy (sped up).mp4",
    cover: "images/bom.jpg",
  },
  {
    name: "Turn Off The Phone",
    artist: "Instasamka",
    file: "songs/Instasamka - отключаю телефон I Turn Off The Phone  (slowed) (lyrics) english translate.mp4",
    cover: "images/Instasamka.jpg",
  },
  {
    name: "People X Nainowale Ne",
    artist: "Neeti Mohan, Libianca",
    file: "songs/People X Nainowale Ne (Mashup) - Full Version - Neeti Mohan & Libianca - Lo-fi 2307 - Insta Viral.mp4",
    cover: "images/nainawale ne.jpg",
  },
];

const playlists = {
  talhaAnjum: {
    title: "Talha Anjum Playlist",
    type: "Playlist",
    description: "All Talha Anjum tracks from your playlist folder.",
    cover: "images/playlist.jpg",
    songs: [
      {
        name: "False Prophets",
        artist: "Talha Anjum",
        file: "songs/TalhaAAnjum Playlist/Talha Anjum - False Prophets - Prod. by Umair (Official Audio).mp4",
        cover: "images/playlist.jpg",
      },
      {
        name: "Glass Half Full",
        artist: "Talha Anjum, JJ47, Talhah Yunus",
        file: "songs/TalhaAAnjum Playlist/Talha Anjum - Glass Half Full feat. JJ47 & Talhah Yunus - Prod. by Umair (Official Audio).mp4",
        cover: "images/playlist.jpg",
      },
      {
        name: "Happy Hour",
        artist: "Talha Anjum",
        file: "songs/TalhaAAnjum Playlist/Talha Anjum - Happy Hour - Prod. by Jokhay (Official Audio).mp4",
        cover: "images/playlist.jpg",
      },
      {
        name: "Lost In Time",
        artist: "Talha Anjum",
        file: "songs/TalhaAAnjum Playlist/Talha Anjum - Lost In Time - Prod. by Umair (Official Audio).mp4",
        cover: "images/playlist.jpg",
      },
      {
        name: "Secrets",
        artist: "Talha Anjum",
        file: "songs/TalhaAAnjum Playlist/Talha Anjum - Secrets - Prod. by UMAIR (Lyrics).mp4",
        cover: "images/playlist.jpg",
      },
    ],
  },
};

const views = {
  home: {
    title: "Moti Music",
    type: "Music",
    listTitle: "Trending Songs",
    description: "All your songs stay here. Open Playlist for Talha Anjum tracks.",
    cover: "images/playlist.jpg",
    songs: homeSongs,
  },
  playlist: {
    title: playlists.talhaAnjum.title,
    type: playlists.talhaAnjum.type,
    listTitle: playlists.talhaAnjum.title,
    description: playlists.talhaAnjum.description,
    cover: playlists.talhaAnjum.cover,
    songs: playlists.talhaAnjum.songs,
  },
};

const homeLink = document.getElementById("homeLink");
const playlistLink = document.getElementById("playlistLink");
const albumCover = document.getElementById("albumCover");
const viewType = document.getElementById("viewType");
const viewTitle = document.getElementById("viewTitle");
const viewText = document.getElementById("viewText");
const listTitle = document.getElementById("listTitle");
const songList = document.querySelector(".song-list");
const songCount = document.getElementById("songCount");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const songName = document.getElementById("songName");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let activeView = "home";
let currentSongs = views.home.songs;
let currentSong = currentSongs[0];
let isPlaying = false;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function renderSongs() {
  songCount.textContent = `${currentSongs.length} song${
    currentSongs.length === 1 ? "" : "s"
  }`;

  songList.innerHTML = currentSongs
    .map(
      (song, index) => `
        <div class="song" data-index="${index}">
          <div class="song-info">
            <img src="${song.cover}" alt="${song.name}">
            <div>
              <span>${song.name}</span>
              <small>${song.artist}</small>
            </div>
          </div>
          <i class="fas fa-play"></i>
        </div>
      `
    )
    .join("");

  updateActiveSong();
}

function updateActiveSong() {
  document.querySelectorAll(".song").forEach((song) => {
    song.classList.toggle(
      "active",
      currentSongs[Number(song.dataset.index)] === currentSong
    );
  });
}

function loadSong(song) {
  currentSong = song;
  audio.src = currentSong.file;
  cover.src = currentSong.cover;
  songName.textContent = currentSong.name;
  progress.value = 0;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";
  updateActiveSong();
}

function playSong() {
  audio.play();
  isPlaying = true;
  cover.classList.add("rotate");
  playButton.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  cover.classList.remove("rotate");
  playButton.innerHTML = '<i class="fas fa-play"></i>';
}

function switchView(viewName) {
  activeView = viewName;
  currentSongs = views[activeView].songs;

  albumCover.src = views[activeView].cover;
  viewType.textContent = views[activeView].type;
  viewTitle.textContent = views[activeView].title;
  viewText.textContent = views[activeView].description;
  listTitle.textContent = views[activeView].listTitle;

  homeLink.classList.toggle("active", activeView === "home");
  playlistLink.classList.toggle("active", activeView === "playlist");

  renderSongs();
  loadSong(currentSongs[0]);
  pauseSong();
}

function nextSong() {
  const currentIndex = currentSongs.indexOf(currentSong);
  const nextIndex = (currentIndex + 1) % currentSongs.length;

  loadSong(currentSongs[nextIndex]);
  playSong();
}

function prevSong() {
  const currentIndex = currentSongs.indexOf(currentSong);
  const prevIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;

  loadSong(currentSongs[prevIndex]);
  playSong();
}

homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  switchView("home");
});

playlistLink.addEventListener("click", (event) => {
  event.preventDefault();
  switchView("playlist");
});

songList.addEventListener("click", (event) => {
  const selectedSong = event.target.closest(".song");
  if (!selectedSong) return;

  loadSong(currentSongs[Number(selectedSong.dataset.index)]);
  playSong();
});

playButton.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", nextSong);

progress.addEventListener("input", () => {
  if (!audio.duration) return;

  audio.currentTime = (progress.value / 100) * audio.duration;
});

switchView("home");
