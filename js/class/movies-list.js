import { seenTypes, attributes, cssClass } from "../utils/constants.js";

class MoviesList {
  constructor(listConatiner, library) {
    this.listConatiner = listConatiner;
    this.library = library;

    this.generateMovieList();
  }

  createMovieInfo = (content, label) => {
    const movieInfoLabel = document.createElement("p"),
      movieInfoText = document.createElement("p"),
      movieInfo = document.createElement("div");

    movieInfoLabel.classList.add(cssClass.movieInfoLabel);
    movieInfoLabel.innerText = `${label}:`;

    movieInfoText.classList.add(cssClass.movieInfoContent);
    movieInfoText.innerText = content;

    movieInfo.classList.add(cssClass.movieInfo);
    movieInfo.append(movieInfoLabel, movieInfoText);

    return movieInfo;
  };

  createSeenBtn = (value) => {
    const btn = document.createElement("button");

    btn.classList.add(
      cssClass.movieSeenBtn.default,
      value === seenTypes.true
        ? cssClass.movieSeenBtn.true
        : cssClass.movieSeenBtn.false
    );

    return btn;
  };

  createMovieListItem = (movie) => {
    const listItem = document.createElement("li");

    listItem.classList.add(cssClass.moviesListItem);

    Object.keys(movie).forEach((movieKey) => {
      if (movieKey === "id") return;

      if (movieKey === "seen") {
        listItem.append(this.createSeenBtn(movie[movieKey]));
      } else {
        movie[movieKey] !== "" &&
          listItem.append(this.createMovieInfo(movie[movieKey], movieKey));
      }
    });

    listItem.setAttribute(attributes.dataId, movie["id"]);

    return listItem;
  };

  generateMovieList = () => {
    this.library.forEach((movie) =>
      this.listConatiner.append(this.createMovieListItem(movie))
    );
  };

  updateMovieList = (newLibrary, data, id) => {
    this.library = newLibrary;

    if (id === undefined) {
      this.listConatiner.append(this.createMovieListItem(data));
    } else {
      const movies = [...document.querySelectorAll(".moviesListItem")];
      const [oldMovie] = movies.filter(
        (movie) => parseInt(movie.getAttribute(attributes.dataId)) === id
      );
      const newMovie = this.createMovieListItem(data);

      oldMovie.parentNode.replaceChild(newMovie, oldMovie);
    }
  };
}

export default MoviesList;
