import "regenerator-runtime/runtime.js";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile = null;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerHTML = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

const handleStart = () => {
  startBtn.innerHTML = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.play();
    video.loop = true;
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audip: true,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
