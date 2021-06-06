import Video from "../models/Video";
// Video.find({}, (error, videos) => {});

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const {
    params: { id },
  } = req;

  return res.render("watch", { pageTitle: `Watching` });
};

export const getEdit = (req, res) => {
  return res.render("edit", { pageTitle: `Editing:` });
};

export const postEdit = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  console.log(video);
  return res.redirect("/");
};
