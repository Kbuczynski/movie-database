import moviesData from "../utils/data.js";

class MoviesStorage {
  constructor() {
    this.movies = this.get() ? this.get() : [];
  }

  addToLocalStorage(data) {
    localStorage.setItem("movies", JSON.stringify(data));
  }

  getMovieIndex = (id) => {
    const { movies, get } = this;

    return movies.indexOf(...get(id));
  };

  get = (id) => {
    const { movies, addToLocalStorage } = this;

    if (id === undefined) {
      const storageData = JSON.parse(localStorage.getItem("movies"));

      if (Array.isArray(storageData)) {
        return storageData;
      } else {
        addToLocalStorage(moviesData);
        return moviesData;
      }
    } else {
      return movies.filter((movie) => movie.id === id);
    }
  };

  set = (data, id) => {
    const { movies, getMovieIndex, addToLocalStorage } = this;

    if (id === undefined) {
      movies.push(data);
      addToLocalStorage(movies);
    } else {
      movies[getMovieIndex(id)] = data;
      addToLocalStorage(movies);
    }
  };

  remove = (id) => {
    const { movies, getMovieIndex, addToLocalStorage } = this;

    movies.splice(getMovieIndex(id), 1);
    addToLocalStorage(movies);
  };
}

export default MoviesStorage;
