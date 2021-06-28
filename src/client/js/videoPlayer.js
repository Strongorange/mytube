const { default: fetch } = require("node-fetch");
import "regenerator-runtime/runtime.js";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 1;
let timeoutId = null;
let timeoutMoveId = null;
video.volume = volumeValue;

const handlePlay = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const value = event.target.value;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
  volumeValue = value;
  video.volume = volumeValue;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerHTML = formatTime(Math.floor(video.currentTime));
  timeline.value = video.currentTime;
};

const handleTimeline = (event) => {
  const timeValue = event.target.value;
  video.currentTime = timeValue;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    fullScreenIcon.classList = "fas fa-compress";
    videoContainer.requestFullscreen();
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (timeoutMoveId) {
    clearTimeout(timeoutMoveId);
    timeoutMoveId = null;
  }
  videoControls.classList.add("showing");
  timeoutMoveId = setTimeout(hideControls, 2000);
};

const handleMouseLeave = () => {
  timeoutId = setTimeout(hideControls, 2000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
timeline.addEventListener("input", handleTimeline);
video.addEventListener("loadedmetadata", handleMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlay);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
fullScreenBtn.addEventListener("click", handleFullScreen);
