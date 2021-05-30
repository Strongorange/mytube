let videos = [
  {
    title: "Video1",
    rating: 5,
    comments: 2,
    createdAt: "1 mins ago",
    views: 59,
    id: 1,
  },
  {
    title: "Video2",
    rating: 5,
    comments: 5,
    createdAt: "2 mins ago",
    views: 13,
    id: 2,
  },
  {
    title: "Video3",
    rating: 5,
    comments: 2,
    createdAt: "3 mins ago",
    views: 1,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const {
    params: { id },
  } = req;
  const video = videos[id - 1];

  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
