const tracks = [
	{'id': 0, 'title': 'Jan 7', 'fileName': 'Jan7.mp3', 'author': 'Christine'},
	{'id': 2, 'title': 'Akula', 'fileName': 'akula.mp3', 'author': 'Joshua'},
	{'id': 3, 'title': 'Bowtie', 'fileName': 'bowtie.mp3', 'author': 'Joshua'},
	{'id': 6, 'title': 'March 11th', 'fileName': 'march-11th.mp3', 'author': 'Joshua'},
	{'id': 7, 'title': 'Platform', 'fileName': 'platform1.mp3', 'author': 'Dafydd'},
	{'id': 8, 'title': 'Weaver', 'fileName': 'weaver-2.mp3', 'author': 'Christine'},
];

let playlist;
let allPlaying = false;
let currentTrack = 0;

const title = "shuffle";
const titleSplit = title.split('');
const titleShuffled = shuffle(titleSplit).join('');
const pageTitle = document.getElementById('page-title');
pageTitle.innerHTML = titleShuffled;


function shuffle(toShuffle) {
	for (let i = toShuffle.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[toShuffle[i - 1], toShuffle[j]] = [toShuffle[j], toShuffle[i - 1]];
	}
	return toShuffle;
}

function playNextTrack() {
	console.log(`Current track: ${currentTrack}`);
	if (currentTrack < playlist.length) {
		const id = playlist[currentTrack].id;
		const audio = document.querySelector(`audio[data-id="${id}"]`);
		const trackInterface = document.querySelector(`.track-interface[data-id="${id}"]`);
		audio.play();
		trackInterface.classList.add('is-playing')
		audio.addEventListener('timeupdate', function() {
			if (this.currentTime >= this.duration) {
				this.pause();
				trackInterface.classList.remove('is-playing')
				currentTrack++;
				playNextTrack();
			}
		});
	} else {
		stopAll();
	}
}

function playStopAll() {
	if (allPlaying) {
		stopAll();
	} else {
		playAll();
	}
}

function playAll() {
	allPlaying = true;
	currentTrack = 0;
	const controls = document.getElementById('controls');
	controls.classList.add('is-all-playing');
	const playStopIcon = document.getElementById('icon--playstop');
	playStopIcon.classList.remove('icon--play');
	playStopIcon.classList.add('icon--stop');
	playNextTrack();
}

function stopAll() {
	console.log('stop');
	allPlaying = false;
	const audios = document.querySelectorAll('audio');
	audios.forEach(function(audio) {
		audio.pause();
	});
	const trackInterfaces = document.querySelectorAll('.track-interface');
	trackInterfaces.forEach(function(trackInterface) {
		trackInterface.classList.remove('is-playing');
	});
	const controls = document.getElementById('controls');
	controls.classList.remove('is-all-playing');
	const playStopIcon = document.getElementById('icon--playstop');
	playStopIcon.classList.add('icon--play');
	playStopIcon.classList.remove('icon--stop');
}

function stopTrack(id) {
	const audio = document.querySelector(`audio[data-id="${id}"]`);
	const trackInterface = document.querySelector(`.track-interface[data-id="${id}"]`);
	trackInterface.classList.remove('is-playing');
	audio.pause();
}

function playTrack(id) {
	const audios = document.querySelectorAll('audio');
	const trackInterfaces = document.querySelectorAll('.track-interface');
	audios.forEach(function(audio) {
		audio.pause();
	});
	trackInterfaces.forEach(function(trackInterface) {
		trackInterface.classList.remove('is-playing');
	});
	const audio = document.querySelector(`audio[data-id="${id}"]`);
	audio.currentTime = 0;
	audio.play();
	const trackInterface = document.querySelector(`.track-interface[data-id="${id}"]`);
	trackInterface.classList.add('is-playing');
}

const audioContainer = document.getElementById('audioContainer');

function makeTrackInterface(track) {
	const li = document.createElement('li');
	li.classList.add('track-interface');
	li.dataset.id = track.id;
	const trackContent = `<h1 class="track-title">${track.title}</h1>
		<span class="track-author">${track.author}</span>
		<div class="track-controls">
			<button class="btn track-play" data-id="${track.id}">Play</button>
			<button class="btn track-stop" data-id="${track.id}">Stop</button>
		</div>
	`;
	li.innerHTML = trackContent;
	return li;
}

function loadAudio(_tracks) {
	_tracks.forEach(function(track) {
		const audio = document.createElement('audio');
		audio.src = `media/${track.fileName}`;
		audio.dataset.id = track.id;
		audioContainer.appendChild(audio);
	});
}

function showPlaylist(_playlist) {

	const trackList = document.getElementById('trackList');

	// Clear the current playlist interface
	while(trackList.firstChild) {
		trackList.removeChild(trackList.firstChild);
	}

	_playlist.forEach(function(track) {
		const trackInterface = makeTrackInterface(track);
		trackList.appendChild(trackInterface);
	});

	const playButtons = document.querySelectorAll('.track-play');
	playButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			playTrack(this.dataset.id);
		});
	});

	const stopButtons = document.querySelectorAll('.track-stop');
	stopButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			stopTrack(this.dataset.id);
		});
	});

}

function shuffleList(_tracks) {
	const playlist = shuffle(_tracks);
	showPlaylist(playlist);
}

loadAudio(tracks);
playlist = shuffle(tracks);
shuffleList(tracks);

const playStopAllButton = document.getElementById('playStopAll');
playStopAllButton.addEventListener('click', playStopAll);

const shuffleButton = document.getElementById('shuffle');
shuffleButton.addEventListener('click', function() {
	if (!allPlaying) {
		shuffleList(tracks);
	}
});