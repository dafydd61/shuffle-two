'use strict';

var tracks = [{ 'id': 0, 'title': 'Jan 7', 'fileName': 'Jan7.mp3', 'author': 'Christine' }, { 'id': 2, 'title': 'Akula', 'fileName': 'akula.mp3', 'author': 'Joshua' }, { 'id': 3, 'title': 'Bowtie', 'fileName': 'bowtie.mp3', 'author': 'Joshua' }, { 'id': 6, 'title': 'March 11th', 'fileName': 'march-11th.mp3', 'author': 'Joshua' }, { 'id': 7, 'title': 'Platform', 'fileName': 'platform1.mp3', 'author': 'Dafydd' }, { 'id': 8, 'title': 'Weaver', 'fileName': 'weaver-2.mp3', 'author': 'Christine' }];

var playlist = void 0;
var allPlaying = false;
var currentTrack = 0;

function shuffle(_trackList) {
	for (var i = _trackList.length; i; i--) {
		var j = Math.floor(Math.random() * i);
		var _ref = [_trackList[j], _trackList[i - 1]];
		_trackList[i - 1] = _ref[0];
		_trackList[j] = _ref[1];
	}
	return _trackList;
}

function playNextTrack() {
	console.log('Current track: ' + currentTrack);
	if (currentTrack < playlist.length) {
		var id = playlist[currentTrack].id;
		var audio = document.querySelector('audio[data-id="' + id + '"]');
		var trackInterface = document.querySelector('.track-interface[data-id="' + id + '"]');
		audio.play();
		trackInterface.classList.add('is-playing');
		audio.addEventListener('timeupdate', function () {
			if (this.currentTime >= this.duration) {
				this.pause();
				trackInterface.classList.remove('is-playing');
				currentTrack++;
				playNextTrack();
			}
		});
	} else {
		stopAll();
	}
}

function playAll() {
	allPlaying = true;
	currentTrack = 0;
	var controls = document.getElementById('controls');
	controls.classList.add('is-all-playing');
	playNextTrack();
}

function stopAll() {
	console.log('stop');
	allPlaying = false;
	var audios = document.querySelectorAll('audio');
	audios.forEach(function (audio) {
		audio.pause();
	});
	var controls = document.getElementById('controls');
	controls.classList.remove('is-all-playing');
}

function stopTrack(id) {
	var audio = document.querySelector('audio[data-id="' + id + '"]');
	var trackInterface = document.querySelector('.track-interface[data-id="' + id + '"]');
	trackInterface.classList.remove('is-playing');
	audio.pause();
}

function playTrack(id) {
	var audios = document.querySelectorAll('audio');
	var trackInterfaces = document.querySelectorAll('.track-interface');
	audios.forEach(function (audio) {
		audio.pause();
	});
	trackInterfaces.forEach(function (trackInterface) {
		trackInterface.classList.remove('is-playing');
	});
	var audio = document.querySelector('audio[data-id="' + id + '"]');
	audio.currentTime = 0;
	audio.play();
	var trackInterface = document.querySelector('.track-interface[data-id="' + id + '"]');
	trackInterface.classList.add('is-playing');
}

var audioContainer = document.getElementById('audioContainer');

function makeTrackInterface(track) {
	var li = document.createElement('li');
	li.classList.add('track-interface');
	li.dataset.id = track.id;
	var trackContent = '<h1 class="track-title">' + track.title + '</h1>\n\t\t<span class="track-author">' + track.author + '</span>\n\t\t<div class="track-controls">\n\t\t\t<button class="track-play" data-id="' + track.id + '">Play</button>\n\t\t\t<button class="track-stop" data-id="' + track.id + '">Stop</button>\n\t\t</div>\n\t';
	li.innerHTML = trackContent;
	return li;
}

function loadAudio(_tracks) {
	_tracks.forEach(function (track) {
		var audio = document.createElement('audio');
		audio.src = 'media/' + track.fileName;
		audio.dataset.id = track.id;
		audioContainer.appendChild(audio);
	});
}

function showPlaylist(_playlist) {

	var trackList = document.getElementById('trackList');

	// Clear the current playlist interface
	while (trackList.firstChild) {
		trackList.removeChild(trackList.firstChild);
	}

	_playlist.forEach(function (track) {
		var trackInterface = makeTrackInterface(track);
		trackList.appendChild(trackInterface);
	});

	var playButtons = document.querySelectorAll('.track-play');
	playButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			playTrack(this.dataset.id);
		});
	});

	var stopButtons = document.querySelectorAll('.track-stop');
	stopButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			stopTrack(this.dataset.id);
		});
	});
}

function shuffleList(_tracks) {
	var playlist = shuffle(_tracks);
	showPlaylist(playlist);
}

loadAudio(tracks);
playlist = shuffle(tracks);
shuffleList(tracks);

var stopAllButton = document.getElementById('stopAll');
stopAllButton.addEventListener('click', stopAll);

var playAllButton = document.getElementById('playAll');
playAllButton.addEventListener('click', playAll);

var shuffleButton = document.getElementById('shuffle');
shuffleButton.addEventListener('click', function () {
	if (!allPlaying) {
		shuffleList(tracks);
	}
});