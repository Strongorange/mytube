import "regenerator-runtime/runtime.js";
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile = null;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerHTML = "Transcoding....";
  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  //FS.readfile 의 return 은 Uint8Array
  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  console.log(mp4File);
  console.log(mp4File.buffer);
  //Uint8Array 의 binary data 를 사용하기 위해서 buffer 사용
  //JS 에서 파일같은 (file-like object) 객체를 만드려면 Blob 에 binary data 를 줘야함
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "recording.mp4");
  downloadFile(thumbUrl, "thumbnail.jpg");

  //속도를 위해 사용한 파일, URL 삭제
  ffmpeg.FS("unlink", files.thumb);
  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);

  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerHTML = "Record Again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  actionBtn.innerHTML = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);

  recorder = new MediaRecorder(stream, { MimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.play();
    video.loop = true;
    actionBtn.innerHTML = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
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

actionBtn.addEventListener("click", handleStart);
