import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
} from "./db";

let whichOne;
let laterMovies = [];
let ratedMovies = [];

export const home = async (req, res) => {
  const movies = await getMovies();
  // console.log(movies);
  return res.render("home", { pageTitle: "Movies!", movies });
};

export const movieDetail = async (req, res) => {
  const { id } = req.params;
  const movie = await getMovieById(id);
  console.log(movie);
  return res.render("detail", {
    pageTitle: movie.title,
    movie,
    genres: movie.genres,
  });
};

export const filterMovie = async (req, res) => {
  const { year, rating } = req.query;

  if (rating) {
    ratedMovies = await getMovieByMinimumRating(rating);
    whichOne = "rating";
    return res.render("search", {
      pageTitle: `Search by rating`,
      movies: ratedMovies,
    });
  }
  if (year) {
    laterMovies = await getMovieByMinimumYear(year);
    whichOne = "year";
    return res.render("search", {
      pageTitle: `Search by year`,
      movies: laterMovies,
    });
  }
};
