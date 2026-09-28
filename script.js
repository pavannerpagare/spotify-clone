const songs = [
    {
        id: 1,
        title: "Mahiye Jinna Sohna",
        artist: "Darshan Raval",
        image: "card2img.jpeg",
        audio: "songs/Mahiye Jinna Sohna Dard 320 Kbps.mp3"
    },

    {
        id: 2,
        title: "Naa Ready",
        artist: "Anirudh Ravichander, Thalapathy Vijay",
        image: "card4img.jpeg",
        audio: "songs/Naa Ready_320(KoshalWorld.Com).mp3"
    },

    {
        id: 3,
        title: "Surili Akhiyon Wale",
        artist: "Rahat Fateh Ali Khan",
        image: "card3img.jpeg",
        audio: "songs/Surili Akiyon Wale Veer 320 Kbps.mp3"
    },

    {
        id: 4,
        title: "Character Dheela",
        artist: "Pritam, Neeraj Shridhar, Amrita Kak & Amitabh Bhattacharya",
        image: "character dheela.jpg",
        audio: "songs/Character Dheela Ishq Ke Naam Ready 320 Kbps.mp3"
    },

    {
        id: 5,
        title: "Dildaara",
        artist: "Vishal-Shekhar & Shafqat Am",
        image: "dildara.jpg",
        audio: "songs/Dildaara Stand By Me Ra One 320 Kbps.mp3"
    },

    {
        id: 6,
        title: "Dilliwaali Girlfriend",
        artist: "Pritam, Arijit Singh, Sunidhi Chauhan",
        image: "dilliwali girlfriend.jpg",
        audio: "songs/Dilliwaali Girlfriend Yeh Jawaani Hai Deewani 320 Kbps.mp3"
    },

    {
        id: 7,
        title: "Ghungroo",
        artist: "Arijit Singh & Shilpa Rao",
        image: "ghongaroo.jpg",
        audio: "songs/Ghungroo War 320 Kbps.mp3"
    },

    {
        id: 8,
        title: "Jhak Maar Ke",
        artist: "Pritam, Neeraj Shridhar, Harshdeep Kaur",
        image: "jhak mar ke.jpg",
        audio: "songs/Jhak Maar Ke Desi Boyz 320 Kbps.mp3"
    },

    {
        id: 9,
        title: "Raanjhanna",
        artist: "A.R. Rahman, Jaswinder Singh & Shiraz Uppal",
        image: "ranjhanna.jpg",
        audio: "songs/Raanjhanaa A.r. Rahman 320 Kbps.mp3"
    },

    {
        id: 10,
        title: "Tu Jaane Na",
        artist: "Pritam Chakraborty & Atif Aslam",
        image: "tu jane na.jpg",
        audio: "songs/Tu Jaane Na Reprise Ajab Prem Ki Ghazab Kahani 320 Kbps.mp3"
    },

    {
        id: 11,
        title: "Levitating x Woh Ladki",
        artist: "Abhijit & Dua Lipa",
        image: "levitating x wo ladki.jpg",
        audio: "songs/Levitating x Woh Ladki Jo Mashup_320(KoshalWorld.Com).mp3"
    }

    
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
const songsContainer = document.getElementById("songsContainer");
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

function createSongCard(song) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${song.image}" class="card-img">

        <p class="card-title">
            ${song.title}
        </p>

        <p class="card-info">
            ${song.artist}
        </p>

        <button class="favorite-btn">♡</button>

        <button class="add-playlist-btn">
            ➕ Add to Playlist
        </button>
    `;

    // Favorite button
    const favoriteBtn = card.querySelector(".favorite-btn");

    if (favorites.includes(song.id)) {
        favoriteBtn.textContent = "❤️";
    }

    favoriteBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        if (favorites.includes(song.id)) {

            favorites = favorites.filter(id => id !== song.id);
            favoriteBtn.textContent = "♡";

        } else {

            favorites.push(song.id);
            favoriteBtn.textContent = "❤️";
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    });


    // Add to playlist button
    const addPlaylistBtn =
        card.querySelector(".add-playlist-btn");

    addPlaylistBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        if (playlists.length === 0) {
            alert("Create a playlist first.");
            return;
        }

        const playlistNames = playlists
            .map((playlist, index) =>
                `${index + 1}. ${playlist.name}`
            )
            .join("\n");

        const choice = prompt(
            `Choose a playlist:\n\n${playlistNames}\n\nEnter playlist number:`
        );

        if (choice === null) {
            return;
        }

        const playlistIndex = Number(choice) - 1;

        if (
            playlistIndex < 0 ||
            playlistIndex >= playlists.length
        ) {
            alert("Invalid playlist.");
            return;
        }

        const selectedPlaylist = playlists[playlistIndex];

        if (selectedPlaylist.songs.includes(song.id)) {
            alert("Song is already in this playlist.");
            return;
        }

        selectedPlaylist.songs.push(song.id);

        localStorage.setItem(
            "playlists",
            JSON.stringify(playlists)
        );

        alert(
            `${song.title} added to ${selectedPlaylist.name}`
        );
    });


    // Play song when card is clicked
    card.addEventListener("click", () => {
        playSong(song);
    });

    return card;
}


function renderSongs() {

    songsContainer.innerHTML = "";

    songs.forEach(song => {

        const card = createSongCard(song);

        songsContainer.appendChild(card);
    });
}

renderSongs();


playPauseBtn.addEventListener("click", () => {

    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }

});


audioPlayer.addEventListener("play", () => {
    
    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

});


audioPlayer.addEventListener("pause", () => {

    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';
        
});


let currentSongIndex = 0;

function playSong(song) {

    currentSongIndex = songs.indexOf(song);

    audioPlayer.src = song.audio;

    currentSongImage.src = song.image;
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;

    audioPlayer.play();

}

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex && songs.length > 1);

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

    }

    playSong(songs[currentSongIndex]);

}

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    playSong(songs[currentSongIndex]);

}

nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong);


const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");


audioPlayer.addEventListener("loadedmetadata", () => {

    progressBar.max = audioPlayer.duration;

    duration.textContent = formatTime(audioPlayer.duration);

});


audioPlayer.addEventListener("timeupdate", () => {

    progressBar.value = audioPlayer.currentTime;

    currentTime.textContent = formatTime(audioPlayer.currentTime);

});


progressBar.addEventListener("input", () => {

    audioPlayer.currentTime = progressBar.value;

});

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}


const volumeBar = document.getElementById("volumeBar");
const muteBtn = document.getElementById("muteBtn");
const repeatBtn = document.getElementById("repeatBtn");
let isRepeat = false;
let isShuffle = false;
const shuffleBtn = document.getElementById("shuffleBtn");

volumeBar.addEventListener("input", () => {

    audioPlayer.volume = volumeBar.value;

    if (Number(volumeBar.value == 0)) {
        audioPlayer.muted = true;
        muteBtn.textContent = "🔇";
    } else {
        audioPlayer.muted = false;
        muteBtn.textContent = "🔊";
    }

});

muteBtn.addEventListener("click", () => {

    audioPlayer.muted = !audioPlayer.muted;

    if (audioPlayer.muted) {
        muteBtn.textContent = "🔇";
    } else {
        muteBtn.textContent = "🔊";
    }

});

repeatBtn.addEventListener("click", () => {

    isRepeat = !isRepeat;

    if (isRepeat) {
        repeatBtn.style.opacity = "1";
    } else {
        repeatBtn.style.opacity = "0.7";
    }

});

audioPlayer.addEventListener("ended", () => {

    if (isRepeat) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        nextSong();
    }

});

shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    if (isShuffle) {
        shuffleBtn.style.opacity = "1";
    } else {
        shuffleBtn.style.opacity = "0.7";
    }

});


const searchInput = document.getElementById("searchInput");

function searchSongs() {
    const searchText = searchInput.value.toLowerCase();

    songsContainer.innerHTML = "";

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchText) ||
        song.artist.toLowerCase().includes(searchText)
    );

    filteredSongs.forEach(song => {

        const card = createSongCard(song);

        songsContainer.appendChild(card);
    });

}

searchInput.addEventListener("input", searchSongs);


const likedSongsBtn = document.getElementById("likedSongsBtn");

function showLikedSongs() {

    songsContainer.innerHTML = "";

    const likedSongs = songs.filter(song =>
        favorites.includes(song.id)
    );

    if (likedSongs.length === 0) {
        songsContainer.innerHTML = `
            <p class="card-info">
                You haven't liked any songs yet.
            </p>
        `;
        return;
    }

    likedSongs.forEach(song => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${song.image}" class="card-img">

            <p class="card-title">
                ${song.title}
            </p>

            <p class="card-info">
                ${song.artist}
            </p>

            <button class="favorite-btn">❤️</button>
        `;

        card.addEventListener("click", () => {
            playSong(song);
        });

        const favoriteBtn = card.querySelector(".favorite-btn");

        favoriteBtn.addEventListener("click", (event) => {
            event.stopPropagation();

            favorites = favorites.filter(id => id !== song.id);

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            showLikedSongs();
        });

        songsContainer.appendChild(card);
    });
}

likedSongsBtn.addEventListener("click", showLikedSongs);


const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", () => {
    songsContainer.innerHTML = "";
    renderSongs();
});


const createPlaylistBtn = document.getElementById("createPlaylistBtn");

createPlaylistBtn.addEventListener("click", () => {

    const playlistName = prompt("Enter playlist name:");

    if (playlistName === null) {
        return;
    }

    if (playlistName.trim() === "") {
        alert("Please enter a playlist name.");
        return;
    }

    const newPlaylist = {
        id: Date.now(),
        name: playlistName.trim(),
        songs: []
    };

    playlists.push(newPlaylist);

    localStorage.setItem(
        "playlists",
        JSON.stringify(playlists)
    );

    renderPlaylists();

    console.log("Playlist created:", newPlaylist);
});


const playlistsContainer = document.getElementById("playlistsContainer");

function renderPlaylists() {

    playlistsContainer.innerHTML = "";

    playlists.forEach(playlist => {

        const playlistElement = document.createElement("div");

        playlistElement.classList.add("playlist-option");

        playlistElement.innerHTML = `
            <span>📁</span>
            <span>${playlist.name}</span>
        `;

        playlistElement.addEventListener("click", () => {
            showPlaylist(playlist);
        });

        playlistsContainer.appendChild(playlistElement);
    });
}

renderPlaylists();


function showPlaylist(playlist) {

    songsContainer.innerHTML = "";

    const playlistSongs = songs.filter(song =>
        playlist.songs.includes(song.id)
    );

    if (playlistSongs.length === 0) {

        songsContainer.innerHTML = `
            <p class="card-info">
                This playlist is empty.
            </p>
        `;

        return;
    }

    playlistSongs.forEach(song => {

        const card = createSongCard(song);

        const removeBtn = document.createElement("button");

        removeBtn.classList.add("remove-playlist-btn");

        removeBtn.textContent = "🗑️ Remove";

        removeBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            playlist.songs = playlist.songs.filter(
                id => id !== song.id
            );

            localStorage.setItem(
                "playlists",
                JSON.stringify(playlists)
            );

            showPlaylist(playlist);
        });

        card.appendChild(removeBtn);

        songsContainer.appendChild(card);
    });
}

const currentSongImage = document.getElementById("currentSongImage");
const currentSongTitle = document.getElementById("currentSongTitle");
const currentSongArtist = document.getElementById("currentSongArtist");

