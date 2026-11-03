```javascript
// YASSINE AFTER DARK - MUSIC PLAYER 🖤

const songInput = document.getElementById("songFile");
const player = document.getElementById("player");

const previousBtn = document.getElementById("previousBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const nowPlaying = document.getElementById("nowPlaying");

let songs = [];
let currentSong = 0;
let currentURL = null;

// CHOOSE MUSIC
songInput.addEventListener("change", function(event) {
    songs = Array.from(event.target.files);

    if (songs.length > 0) {
        playSong(0);
    }
});

// PLAY SONG
function playSong(index) {
    if (index < 0 || index >= songs.length) return;

    currentSong = index;

    if (currentURL) {
        URL.revokeObjectURL(currentURL);
    }

    currentURL = URL.createObjectURL(songs[index]);

    player.src = currentURL;
    nowPlaying.textContent = "NOW PLAYING: " + songs[index].name;

    player.play();
    playPauseBtn.textContent = "PAUSE";
}

// PLAY / PAUSE
playPauseBtn.addEventListener("click", function() {
    if (songs.length === 0) {
        nowPlaying.textContent = "CHOOSE YOUR MUSIC FIRST";
        return;
    }

    if (player.paused) {
        player.play();
        playPauseBtn.textContent = "PAUSE";
    } else {
        player.pause();
        playPauseBtn.textContent = "PLAY";
    }
});

// NEXT SONG
function nextSong() {
    if (songs.length === 0) return;

    let next = (currentSong + 1) % songs.length;
    playSong(next);
}

nextBtn.addEventListener("click", nextSong);

// PREVIOUS SONG
function previousSong() {
    if (songs.length === 0) return;

    let previous = currentSong - 1;

    if (previous < 0) {
        previous = songs.length - 1;
    }

    playSong(previous);
}

previousBtn.addEventListener("click", previousSong);

// AUTOMATIC NEXT SONG
player.addEventListener("ended", nextSong);

// UPDATE BUTTON WHEN SONG ENDS OR PAUSES
player.addEventListener("pause", function() {
    playPauseBtn.textContent = "PLAY";
});

player.addEventListener("play", function() {
    playPauseBtn.textContent = "PAUSE";
});

console.log("YASSINE AFTER DARK PLAYER READY 🖤");
```
// REGISTER OFFLINE SERVICE WORKER

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./service-worker.js")
            .then(function() {
                console.log("Offline mode is ready!");
            })
            .catch(function(error) {
                console.log("Offline mode error:", error);
            });
    });
}