export const seeUser = (req, res) => {
  res.render("seeuser", {
    pageTitle: "See User",
  });
};
export const seeProfile = (req, res) => {
  res.render("seeprofile", {
    pageTitle: "User Profile",
  });
};
export const editProfile = (req, res) => {
  res.render("editstory", {
    pageTitle: "Edit Profile",
  });
};
export const join = (req, res) => {
  res.render("join", {
    pageTitle: "Join",
  });
};
export const login = (req, res) => {
  res.render("login", {
    pageTitle: "Log In",
  });
};
