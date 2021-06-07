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

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.render("edit", { pageTitle: "Edit", movie });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, summary, year, rating, genres },
  } = req;
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year,
    rating,
    genres: genres.split(","),
  });
  res.redirect("/");
};

export const search = async (req, res) => {
  const {
    query: { searchTitle },
  } = req;

  let movies = [];

  if (searchTitle) {
    movies = await Movie.find({
      title: {
        $regex: new RegExp(searchTitle, "i"),
      },
    });
  }

  res.render("search", { pageTitle: "Search", movies });
};
