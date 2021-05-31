export const home = (req, res) => {
  res.render("home", {
    pageTitle: "Home",
  });
};
export const trending = (req, res) => {
  res.render("trending", {
    pageTitle: "Trending Stories",
  });
};
export const newStory = (req, res) => {
  res.render("newstory", {
    pageTitle: "New Story",
  });
};
export const seeStory = (req, res) => {
  res.render("seestory", {
    pageTitle: "See Story",
  });
};
export const editStory = (req, res) => {
  res.render("editstory", {
    pageTitle: "Edit Story",
  });
};
export const deleteStory = (req, res) => {
  res.render("deletestory", {
    pageTitle: "Delete Story",
  });
};
