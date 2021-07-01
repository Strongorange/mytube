const { default: fetch } = require("node-fetch");

const form = document.getElementById("commentForm");
const videoContainrt = document.getElementById("videoContainer");

const addComment = (text) => {
  const videoCommnets = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const icon = document.createElement("i");
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.className = "video__comment";
  videoCommnets.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const { id } = videoContainrt.dataset;
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (status === 201) {
    addComment(text);
  }
  textarea.value = "";
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
