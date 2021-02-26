import MoviesStorage from "./class/movies-storage.js";
import {
  updateMoviesCounterAll,
  updateMoviesCounterSeen,
} from "./functions/movies-counter.js";
import { seenTypes, attributes } from "./utils/constants.js";
import MoviesList from "./class/movies-list.js";

const moviesListContainer = document.querySelector("#moviesList");

const moviesStorage = new MoviesStorage();
const moviesList = new MoviesList(moviesListContainer, moviesStorage.get());

const updateMovie = (currentBtn) => {
  const movieId = parseInt(
    currentBtn.parentNode.getAttribute(attributes.dataId)
  );
  const [currentMovie] = moviesStorage.get(movieId);

  currentMovie.seen =
    currentMovie.seen === "T" ? seenTypes.false : seenTypes.true;

  moviesStorage.set(currentMovie, movieId);
  moviesList.updateMovieList(moviesStorage.get(), currentMovie, movieId);
  updateMoviesCounterSeen(moviesStorage.get());
};

const isSeenBtn = (target) => {
  return target.tagName === "BUTTON";
};

updateMoviesCounterAll(moviesStorage.get());
updateMoviesCounterSeen(moviesStorage.get());

moviesListContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;

  if (isSeenBtn(target)) {
    updateMovie(target);
  }
});
