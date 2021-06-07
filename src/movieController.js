/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!

export const handleHome = async (req, res) => {
  const movies = await Movie.find({});
  return res.render("home", { pageTitle: "Home", movies });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, summary, year, rating, genres },
  } = req;
  await Movie.create({
    title,
    summary,
    year,
    rating,
    genres: genres.split(","),
  });
  return res.redirect("/");
};

export const movieDetail = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  console.log(movie);
  res.render("movieDetail", { pageTitle: movie.title, movie });
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  await Movie.deleteOne({ _id: id });
  res.redirect("/");
};

export const getEdit = (req, res) => {
  res.render("edit", { pageTitle: "Edit" });
};

export const putEdit = (req, res) => {
  res.send("put edit", { pageTitle });
};
