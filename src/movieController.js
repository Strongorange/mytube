import { getMovieById, getMovies, addMovie } from "./db";

let newGenres = [];

export const home = (req, res) =>
  res.render("movies", { movies: getMovies(), pageTitle: "Movies!" });

export const movieDetail = (req, res) => {
  const {
    params: { id },
  } = req;
  const movie = getMovieById(id);
  if (!movie) {
    res.render("404", { pageTitle: "Movie not found" });
  }
  return res.render("detail", { movie });
};

/*
Write the controller or controllers you need to render the form
and to handle the submission
*/

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Add Movie!" });
};

export const postUpload = (req, res) => {
  const newMovie = {
    title: "",
    synopsis: "",
    genres: [],
  };
  newGenres = [];
  const { title, synopsis, genres } = req.body;

  newMovie.title = title;
  newMovie.synopsis = synopsis;
  newMovie.genres.push(genres);

  console.log(newMovie);

  addMovie(newMovie);

  res.redirect("/");
};
