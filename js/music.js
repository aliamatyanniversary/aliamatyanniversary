const musicIcon = document.getElementById('music-icon');
const musicWindow = document.getElementById('music-window');
const musicClose = document.getElementById('music-close');
const titlebar = document.getElementById('music-titlebar');
const btnPlay = document.getElementById('btn-play');
const btnNext = document.getElementById('btn-next');
const fileInput = document.getElementById('file-input');
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
  { name: 'House Tour', artist: 'Sabrina Carpenter', url: 'https://soundcloud.com/sabrinacarpenter/house-tour' },
  { name: 'Tears',      artist: 'Sabrina Carpenter', url: 'https://soundcloud.com/sabrinacarpenter/tears' },
  { name: 'The Last Two People on Earth', artist: 'Melanie Martinez', url: 'https://soundcloud.com/melaniemartinezsc/the-last-two-people-on-earth' },
];

let currentIndex = 0;
let widget = null;
let isPlaying = false;
let progressInterval = null;

musicIcon.addEventListener('click', e => {
  e.preventDefault();
  const open = musicWindow.style.display !== 'none' && musicWindow.style.display !== '';
  musicWindow.style.display = open ? 'none' : 'block';
  if (!open && !widget) initWidget(currentIndex);
});
musicClose.addEventListener('click', () => { musicWindow.style.display = 'none'; });

// drag
let dX=0,dY=0,drag=false;
titlebar.addEventListener('mousedown', e => { drag=true; dX=e.clientX-musicWindow.offsetLeft; dY=e.clientY-musicWindow.offsetTop; });
document.addEventListener('mousemove', e => { if(!drag)return; musicWindow.style.left=(e.clientX-dX)+'px'; musicWindow.style.top=(e.clientY-dY)+'px'; });
document.addEventListener('mouseup', ()=>drag=false);

function renderPlaylist() {
  playlistEl.innerHTML='';
  playlistEl.classList.add('has-items');
  songs.forEach((s,i)=>{
    const li=document.createElement('li');
    li.textContent=s.artist+' — '+s.name;
    if(i===currentIndex)li.classList.add('active');
    li.addEventListener('click',()=>loadSong(i));
    playlistEl.appendChild(li);
  });
}

function initWidget(index) {
  const iframe=document.getElementById('sc-iframe');
  const song=songs[index];
  const src='https://w.soundcloud.com/player/?url='+encodeURIComponent(song.url)
    +'&color=%23888888&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false';
  iframe.src=src;
  iframe.addEventListener('load',()=>{
    widget=SC.Widget(iframe);
    widget.bind(SC.Widget.Events.READY,()=>{
      updateMeta(index);
      bindEvents();
    });
  },{once:true});
}

function loadSong(index) {
  currentIndex=index;
  const iframe=document.getElementById('sc-iframe');
  const song=songs[index];
  const src='https://w.soundcloud.com/player/?url='+encodeURIComponent(song.url)
    +'&color=%23888888&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false';
  widget=null; stopProgress();
  progressFill.style.width='0%'; timeCurrent.textContent='0:00'; timeTotal.textContent='0:00';
  iframe.src=src;
  iframe.addEventListener('load',()=>{
    widget=SC.Widget(iframe);
    widget.bind(SC.Widget.Events.READY,()=>{
      updateMeta(index);
      widget.play();
      bindEvents();
    });
  },{once:true});
}

function bindEvents() {
  widget.bind(SC.Widget.Events.PLAY,()=>{
    isPlaying=true; btnPlay.textContent='⏸';
    record.classList.add('spinning'); tonearm.classList.add('playing');
    startProgress();
  });
  widget.bind(SC.Widget.Events.PAUSE,()=>{
    isPlaying=false; btnPlay.textContent='▶';
    record.classList.remove('spinning'); tonearm.classList.remove('playing');
    stopProgress();
  });
  widget.bind(SC.Widget.Events.FINISH,()=>{
    stopProgress(); record.classList.remove('spinning'); tonearm.classList.remove('playing');
    isPlaying=false; btnPlay.textContent='▶';
    loadSong((currentIndex+1)%songs.length);
  });
}

function updateMeta(index) {
  const s=songs[index];
  songTitle.textContent=s.name;
  artistTitle.textContent=s.artist;
  renderPlaylist();
}

function startProgress() {
  stopProgress();
  progressInterval=setInterval(()=>{
    if(!widget)return;
    widget.getPosition(pos=>{
      widget.getDuration(dur=>{
        if(!dur)return;
        const pct=(pos/dur)*100;
        progressFill.style.width=pct+'%';
        progressRange.value=pct;
        timeCurrent.textContent=fmt(pos/1000);
        timeTotal.textContent=fmt(dur/1000);
      });
    });
  },500);
}
function stopProgress(){if(progressInterval){clearInterval(progressInterval);progressInterval=null;}}

btnPlay.addEventListener('click',()=>{
  if(!widget){initWidget(currentIndex);return;}
  isPlaying?widget.pause():widget.play();
});
btnNext.addEventListener('click',()=>loadSong((currentIndex+1)%songs.length));

progressRange.addEventListener('input',e=>{
  if(!widget)return;
  widget.getDuration(dur=>widget.seekTo((e.target.value/100)*dur));
});

function fmt(s){const m=Math.floor(s/60);const sec=Math.floor(s%60);return m+':'+String(sec).padStart(2,'0');}
renderPlaylist();

// touch drag
titlebar.addEventListener('touchstart', e => {
  const t = e.touches[0];
  drag=true; dX=t.clientX-musicWindow.offsetLeft; dY=t.clientY-musicWindow.offsetTop;
}, {passive:true});
document.addEventListener('touchmove', e => {
  if(!drag)return;
  const t=e.touches[0];
  musicWindow.style.left=(t.clientX-dX)+'px';
  musicWindow.style.top=(t.clientY-dY)+'px';
}, {passive:true});
document.addEventListener('touchend', ()=>drag=false);