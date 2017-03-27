const tracks = [
	{'id': 0, 'title': 'Jan 7', 'fileName': 'Jan7.mp3', 'author': 'Christine'},
	{'id': 2, 'title': 'Akula', 'fileName': 'akula.mp3', 'author': 'Joshua'},
	{'id': 3, 'title': 'Bowtie', 'fileName': 'bowtie.mp3', 'author': 'Joshua'},
	{'id': 6, 'title': 'March 11th', 'fileName': 'march-11th.mp3', 'author': 'Joshua'},
	{'id': 7, 'title': 'Platform', 'fileName': 'platform1.mp3', 'author': 'Dafydd'},
	{'id': 8, 'title': 'Weaver', 'fileName': 'weaver-2.mp3', 'author': 'Christine'},
];

let playlist;

function shuffle(_trackList) {
	for (let i = _trackList.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[_trackList[i - 1], _trackList[j]] = [_trackList[j], _trackList[i - 1]];
	}
	return _trackList;
}

function playAll() {

}

function stopAll() {
	console.log('stop');
	const audios = document.querySelectorAll('audio');
	audios.forEach(function(audio) {
		audio.pause();
	});
}

function stopTrack(id) {
	const audio = document.querySelector(`audio[data-id="${id}"]`);
	audio.pause();
}

function playTrack(id) {
	const audios = document.querySelectorAll('audio');
	audios.forEach(function(audio) {
		audio.pause();
	});
	const audio = document.querySelector(`audio[data-id="${id}"]`);
	audio.currentTime = 0;
	audio.play();
}

const audioContainer = document.getElementById('audioContainer');

function makeTrackInterface(track) {
	const li = document.createElement('li');
	li.classList.add('track-interface');
	const trackContent = `<h1 class="track-title">${track.title}</h1>
		<span class="track-author">${track.author}</span>
		<div class="track-controls">
			<button class="track-play" data-id="${track.id}">Play</button>
			<button class="track-stop" data-id="${track.id}">Stop</button>
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

const stopAllButton = document.getElementById('stopAll');
stopAllButton.addEventListener('click', stopAll);

const shuffleButton = document.getElementById('shuffle');
shuffleButton.addEventListener('click', function() {
	shuffleList(tracks);
});