const { default: fetch } = require("node-fetch");

const form = document.getElementById("commentForm");
const videoContainrt = document.getElementById("videoContainer");

const handleSubmit = (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const { id } = videoContainrt.dataset;
  const text = textarea.value;
  fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    body: {
      text,
    },
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
