const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const mute = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlay = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handlePause = () => (playBtn.innerHTML = "Play");
const handlePlayClick = () => (playBtn.innerHTML = "Pause");

const handleMute = (e) => {};

video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlayClick);
playBtn.addEventListener("click", handlePlay);
mute.addEventListener("click", handleMute);
