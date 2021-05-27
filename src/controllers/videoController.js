export const trending = (req, res) => res.send("Home Videos");
export const see = (req, res) => {
  console.log(req.params);
  return res.send(`Watch Video #${req.params.id}`);
};
export const edit = (req, res) => {
  console.log(req.params);
  res.send("Edit Video");
};
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("Delete Video");
};