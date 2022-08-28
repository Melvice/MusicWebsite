let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".play-pause-track");
let next_btn = document.querySelector(".next-track");
let previous_btn = document.querySelector(".previous-track");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;

let isPlaying = false;
let isRandom  = false;
let updateTimer;

const music_list  = [
  {
    img:"icons/undertheinfluence.jpg",
    name:" Under the influence",
    artist:"Chris Brown",
    music:"audio/onlymp3.to - Chris Brown - Under The Influence (Audio)-LPnDCTqW7zw-192k-1659405875722.mp3"
  },
  {
    img:"icons/dieForYou.jpg",
    name:" Die for you",
    artist:"The weeknd",
    music:"audio/onlymp3.to - Die For You-mTLQhPFx2nM-192k-1659366495152.mp3"
  }, 
  {
    img:"icons/earnedit.png",
    name:" Earned it",
    artist:"The weeknd",
    music:"audio/onlymp3.to - Earned It (Fifty Shades Of Grey)-OZ3YLkPuk-U-192k-1659421506113.mp3"
  }, {
    img:"icons/hills.jpg",
    name:"Hills",
    artist:"The weeknd",
    music:"audio/onlymp3.to - The Weeknd - The Hills (Official Video)-yzTuBuRdAyA-192k-1659415489123.mp3"
  }, {
    img:"icons/likeIwantyou.jpg",
    name:" Like i want you",
    artist:"Giveon",
    music:"audio/onlymp3.to - Giveon - Like I Want You (Official Music Video)-uCPjdfCUowg-192k-1659421342020.mp3"
  }, {
    img:"icons/mood.png",
    name:" Mood",
    artist:"DPR IAN",
    music:"audio/onlymp3.to - DPR IAN - Mood [Lyrics가사EngKor]-O53n-OrzVAU-192k-1659385724952.mp3"
  }, {
    img:"icons/lostinmyboots.jfif",
    name:"Lost in my boots",
    artist:"KWAYE",
    music:"audio/onlymp3.to - KWAYE - Lost In My Boots [Official Music Video]-7AEKSNBPGCM-192k-1660422034546.mp3"
  }, {
    img:"icons/nerves.jpg",
    name:"Nerves",
    artist:"DPR IAN",
    music:"audio/onlymp3.to - DPR IAN - Nerves (OFFICIAL MV)-KlEbnOZ9DZQ-192k-1659423046092.mp3"
  },
  {
    img:"icons/PRETTY PLEASE MV.png",
    name:"Pretty please",
    artist:"JAckson Wang & galantis",
    music:"audio/onlymp3.to - Jackson Wang & Galantis - Pretty Please (Lyrics)-jg5pfM7eBkk-192k-1659428501655.mp3"
  }
]

loadTrack(track_index);

function loadTrack(track_index){
  clearInterval(updateTimer);
  reset();
  curr_track.src = music_list[track_index].music;
  curr_track.load();
  track_art.style.backgroundImage = "url("+music_list[track_index].img +")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent = "Playing music " + (track_index+1)+ " of " +music_list.length;

  updateTimer = setInterval(setUpdate, 100);
  
  curr_track.addEventListener("ended",nextTrack);
  random_color();
}

function random_color(){  //orignate from the web, need to understand this part
  let hexa = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
  let b;

  function choose(a){
    for(let i = 0; i<6 ; i++){
      let x = Math.round(Math.random()*14);
      let y = hexa[x];
      a+=y;
    }
    return a;
  }
  let color1= choose("#");
  let color2= choose("#");
  var angle = "to right";

  let gradient = "linear-gradient(" + angle+","+color1+","+color2+")";
  document.body.style.background = gradient;
}

function reset(){
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack(){
  isRandom? pauseRandom():playRandom();
}

function pauseRandom(){
  isRandom =false;
  randomIcon.classList.remove("randomActive");
}

function playRandom(){
  isRandom =true;
  randomIcon.classList.add("randomActive");
}

function repeatTrack(){
  let curr_index = track_index;
  loadTrack(curr_index);
  playTrack();
}

function playpauseTrack(){
  isPlaying? pauseTrack(): playTrack();
}

function playTrack(){
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = "<i class= 'fa fa-pause-circle fa-5x'></i>";
}
function pauseTrack(){
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = "<i class= 'fa fa-play-circle fa-5x'></i>";
}

function nextTrack(){
  if(track_index<music_list.length-1 && isRandom===false){
    track_index+=1;
  }
  else if (track_index<music_list.length-1 && isRandom===true){
    let random_index = Number.parseInt(Math.random()*music_list.length);
    track_index =random_index;
  }else{
    track_index=0;
  }
  loadTrack(track_index);
  playTrack();
}

function previousTrack(){
  if(track_index>0){
    track_index-=1;
  }else{
    track_index=music_list.length-1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo(){
  let seekTo = curr_track.duration*(seek_slider.value/100);
  curr_track.currentTime = seekTo;
}

function setVolume(){
  curr_track.volume = volume_slider.value/100;
}
function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(curr_track.duration)){
    seekPositionm = curr_track.currentTime * (100/curr_track.duration);
    seek_slider.value = seekPosition;

    let curr_min = Math.floor(curr_track.currentTime/60);
    let curr_sec = Math.floor(curr_track.currentTime - curr_min*60);
    let duration_min = Math.floor(curr_track.duration/60);
    let duration_sec = Math.floor(curr_track.duration-duration_min*60);
    
    if (curr_sec<10) { curr_sec ="0"+curr_sec;}
    if (duration_sec<10){ duration_sec = "0"+duration_sec;}
    if (curr_min<10){ curr_min = "0"+curr_min;}
    if (duration_min<10){ duration_min = "0"+duration_min;}
 
    curr_time.textContent = curr_min + ":"+ curr_sec;
    total_duration.textContent = duration_min+":"+duration_sec;
  }
}
