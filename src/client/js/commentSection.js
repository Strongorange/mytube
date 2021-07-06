const { default: fetch } = require("node-fetch");

const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");
const removeBtns = document.querySelectorAll(".video__comment__xbtn");

const addComment = (text, id) => {
  const videoCommnets = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  const span = document.createElement("span");
  const spanX = document.createElement("span");
  spanX.innerText = "  ❌";
  spanX.addEventListener("click", removeComment);
  span.innerText = ` ${text}`;
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(spanX);
  newComment.className = "video__comment";
  videoCommnets.prepend(newComment);
};

const removeComment = async (event) => {
  const { id: commentId } = event.target.parentNode.dataset;
  const response = await fetch(`/api/deletecomment/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });

  if (response.status === 200) {
    event.target.parentNode.remove();
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const { id } = videoContainer.dataset;
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (removeBtns) {
  for (const removeBtn of removeBtns) {
    removeBtn.addEventListener("click", removeComment);
  }
}
