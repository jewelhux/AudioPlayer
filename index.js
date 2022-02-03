console.log('Самооценка 60 из 60. Также имеется уникальный дизайн. Спасибо за адекватность при проверке!')

let player = document.querySelector('.player');
let playBtn = document.querySelector('.control__play');
let prevBtn = document.querySelector('.control__previous');
let nextBtn = document.querySelector('.control__next');
let audio = document.querySelector('.tools__music');
let progressContainer = document.querySelector('.progress');
let progressBar = document.querySelector('.progress__bar');
let musicName = document.querySelector('.tools__name');
let musicImg = document.querySelector('.player__img');


//Каталог песен
let songs = ['Blackpink - Kill This Love', 'Maby Baby - Ascorbic', 'DEAD BLONDE - Boy in nine', 'fem.love - Photographing the sunset']

//Песня по умолчанию/выбранная
let songIndex = 0;

//Инициализация песни
function loadSong(song) {
  musicName.innerHTML = song;
  audio.src = `./assets/music/${song}.mp3`;
  musicImg.src = `./assets/img/music-fone-${songIndex + 1}.jpg`
}
loadSong(songs[songIndex]) //Тестовая функция, можно дельнуть потом

//Проигрывание песни
function playSong() {
  musicImg.classList.add('player__effect');
  playBtn.classList.add('control__pause');
  player.classList.add('play');
  audio.play();
}
//Пауза для песни
function pauseSong() {
  musicImg.classList.remove('player__effect');
  playBtn.classList.remove('control__pause');
  player.classList.remove('play');
  audio.pause();
}

//Событие активации/остановки песни
playBtn.addEventListener('click', function(event) {
  let isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  }
  else {
    playSong();
  }
});

//Функция следующей песни
function nextSong() {
  songIndex++

  if (songIndex > songs.length-1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//Событие следующей песни
nextBtn.addEventListener('click', function(event) {
  nextSong();
});

//Функция предыдущей песни
function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length-1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//Событие предыдущей песни
prevBtn.addEventListener('click', function(event) {
  prevSong();
});

//Прогресс бар 
function updateProgress(event) {
  let duration = event.target.duration;
  let currentTime = event.target.currentTime;
  let progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`

  //Обновление времени трека
  let musicCurrentTime = document.querySelector('.current')
  let musicDurationTime = document.querySelector('.duration')

  audio.addEventListener('loadeddata', () => {
    //Время окончания трека
    let audioDuration = audio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    musicDurationTime.innerText = `${totalMin}:${totalSec}`;
  });

  //Время начала трека
  let currentMin = Math.floor(currentTime / 60);
  let currentlSec = Math.floor(currentTime % 60);

  if (currentlSec < 10) {
    currentlSec = `0${currentlSec}`
  }
  musicCurrentTime.innerText = `${currentMin}:${currentlSec}`;
};
audio.addEventListener('timeupdate', updateProgress)

//Перемотка трекича
function setProgress(event) {
  let width = progressContainer.clientWidth;
  let clickX = event.offsetX;
  let songDuration = audio.duration;

  audio.currentTime = (clickX / width) * songDuration
};
progressContainer.addEventListener('click', setProgress)