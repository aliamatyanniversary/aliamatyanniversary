const musicIcon = document.getElementById('music-icon');
const musicWindow = document.getElementById('music-window');
const musicClose = document.getElementById('music-close');
const titlebar = document.getElementById('music-titlebar');
const btnPlay = document.getElementById('btn-play');
const btnNext = document.getElementById('btn-next');
const playlistEl = document.getElementById('playlist');
const songTitle = document.getElementById('song-title');
const artistTitle = document.getElementById('artist-title');
const progressFill = document.getElementById('progress-fill');
const progressRange = document.getElementById('progress-range');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const record = document.getElementById('record');
const tonearm = document.getElementById('tonearm');

const songs = [
  { name: 'House Tour', artist: 'Sabrina Carpenter', url: 'https://raw.githubusercontent.com/aliamatyanniversary/fav-music/master/Sabrina%20Carpenter%20-%20House%20Tour%20(Lyrics).mp3' },
  { name: 'Tears', artist: 'Sabrina Carpenter', url: 'https://raw.githubusercontent.com/aliamatyanniversary/fav-music/master/Sabrina%20Carpenter%20-%20Tears%20(Lyrics).mp3' },
  { name: 'The Last Two People on Earth', artist: 'Melanie Martinez', url: 'https://raw.githubusercontent.com/aliamatyanniversary/fav-music/master/THE%20LAST%20TWO%20PEOPLE%20ON%20EARTH%20%20Melanie%20Martinez%20lyrics%20(Read%20description).mp3' },
  {name: "Ultraviolence", artist: 'Lana Del Rey', url: 'https://raw.githubusercontent.com/aliamatyanniversary/fav-music/master/Lana%20Del%20Rey%20-%20Ultraviolence%20(Audio).mp3'},
];

let audio = new Audio();
let currentIndex = 0;
let isPlaying = false;

musicIcon.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  musicWindow.style.display = musicWindow.style.display === 'block' ? 'none' : 'block';
});
musicClose.addEventListener('click', () => { musicWindow.style.display = 'none'; });

let dX=0, dY=0, drag=false;
titlebar.addEventListener('mousedown', e => { drag=true; dX=e.clientX-musicWindow.offsetLeft; dY=e.clientY-musicWindow.offsetTop; });
document.addEventListener('mousemove', e => { if(!drag)return; musicWindow.style.left=(e.clientX-dX)+'px'; musicWindow.style.top=(e.clientY-dY)+'px'; });
document.addEventListener('mouseup', () => drag=false);

titlebar.addEventListener('touchstart', e => { const t=e.touches[0]; drag=true; dX=t.clientX-musicWindow.offsetLeft; dY=t.clientY-musicWindow.offsetTop; }, {passive:true});
document.addEventListener('touchmove', e => { if(!drag)return; const t=e.touches[0]; musicWindow.style.left=(t.clientX-dX)+'px'; musicWindow.style.top=(t.clientY-dY)+'px'; }, {passive:true});
document.addEventListener('touchend', () => drag=false);

function loadSong(index) {
  currentIndex = index;
  audio.src = songs[index].url;
  songTitle.textContent = songs[index].name;
  artistTitle.textContent = songs[index].artist;
  renderPlaylist();
}

function playSong() {
  audio.play();
  isPlaying = true;
  btnPlay.textContent = '⏸';
  record.classList.add('spinning');
  tonearm.classList.add('playing');
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  btnPlay.textContent = '▶';
  record.classList.remove('spinning');
  tonearm.classList.remove('playing');
}

btnPlay.addEventListener('click', () => {
  if (!audio.src || audio.src === window.location.href) { loadSong(0); playSong(); return; }
  isPlaying ? pauseSong() : playSong();
});

btnNext.addEventListener('click', () => {
  loadSong((currentIndex + 1) % songs.length);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
  progressRange.value = pct;
  timeCurrent.textContent = fmt(audio.currentTime);
  timeTotal.textContent = fmt(audio.duration);
});

audio.addEventListener('ended', () => {
  loadSong((currentIndex + 1) % songs.length);
  playSong();
});

progressRange.addEventListener('input', e => {
  if (!audio.duration) return;
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

function renderPlaylist() {
  playlistEl.innerHTML = '';
  playlistEl.classList.add('has-items');
  songs.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = s.artist + ' — ' + s.name;
    if (i === currentIndex) li.classList.add('active');
    li.addEventListener('click', () => { loadSong(i); playSong(); });
    playlistEl.appendChild(li);
  });
}

function fmt(s) { const m=Math.floor(s/60); const sec=Math.floor(s%60); return m+':'+String(sec).padStart(2,'0'); }

renderPlaylist();
