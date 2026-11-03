// YASSINE AFTER DARK - MUSIC PLAYER

const songInput = document.getElementById("songFile");
const player = document.getElementById("player");

const previousBtn = document.getElementById("previousBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const nowPlaying = document.getElementById("nowPlaying");

let songs = [];
let currentSong = 0;
let currentURL = null;

songInput.addEventListener("change", function () {
    songs = Array.from(songInput.files);
    currentSong = 0;

    if (songs.length > 0) {
        playSong(currentSong);
    }
});

function playSong(index) {
    if (!songs.length || index < 0 || index >= songs.length) return;

    currentSong = index;

    if (currentURL) {
        URL.revokeObjectURL(currentURL);
    }

    currentURL = URL.createObjectURL(songs[currentSong]);

    player.src = currentURL;
    player.load();

    nowPlaying.textContent = "NOW PLAYING: " + songs[currentSong].name;

    player.play().catch(function () {
        nowPlaying.textContent = "PRESS PLAY TO START: " + songs[currentSong].name;
    });
}

playPauseBtn.addEventListener("click", function () {
    if (!songs.length) {
        nowPlaying.textContent = "CHOOSE YOUR MUSIC FIRST";
        return;
    }

    if (player.paused) {
        player.play().catch(function () {
            nowPlaying.textContent = "COULD NOT PLAY THIS FILE";
        });
    } else {
        player.pause();
    }
});

nextBtn.addEventListener("click", function () {
    if (songs.length) {
        playSong((currentSong + 1) % songs.length);
    }
});

previousBtn.addEventListener("click", function () {
    if (songs.length) {
        playSong((currentSong - 1 + songs.length) % songs.length);
    }
});

player.addEventListener("play", function () {
    playPauseBtn.textContent = "PAUSE";
});

player.addEventListener("pause", function () {
    playPauseBtn.textContent = "PLAY";
});

player.addEventListener("ended", function () {
    if (songs.length) {
        playSong((currentSong + 1) % songs.length);
    }
});

// OFFLINE MODE
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js");
    });
}
