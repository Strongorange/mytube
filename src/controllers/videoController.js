export const trending = (req, res) => {
  const videos = [
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
      views: 9,
      id: 3,
    },
  ];
  res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("Delete Video");
};
