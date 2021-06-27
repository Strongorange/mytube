import "regenerator-runtime/runtime.js";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audip: true,
    video: true,
  });
  console.log(stream);
  video.srcObject = stream;
  video.play();
};

startBtn.addEventListener("click", handleStart);
