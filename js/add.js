import MoviesStorage from "./class/movies-storage.js";
import createMovie from "./functions/create-movie.js";
import {
  updateMoviesCounterAll,
  updateMoviesCounterSeen,
} from "./functions/movies-counter.js";

const form = document.querySelector(".formAdd");

const moviesStorage = new MoviesStorage();

const isNewMovie = (title) => {
  const movies = moviesStorage.get();
  const repetedMovie = movies.filter((movie) => movie.title === title).length;

  return repetedMovie === 0 ? true : false;
};

updateMoviesCounterAll(moviesStorage.get());
updateMoviesCounterSeen(moviesStorage.get());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const target = e.target;
  const { title, year, genre, description } = target.elements;

  if (isNewMovie(title.value)) {
    const newMovie = createMovie(
      title.value,
      year.value,
      genre.value,
      description.value
    );

    moviesStorage.set(newMovie);
    updateMoviesCounterAll(moviesStorage.get());
    target.reset();
    alert("New movie has added correctly");
  } else {
    alert("Error: This movie is already added");
  }
});
