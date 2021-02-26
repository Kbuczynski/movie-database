import { seenTypes } from "../utils/constants.js";

const numberOfSeenMovies = (library) => {
  const seenMovies = library.filter(({ seen }) => seen === seenTypes.true);
  return seenMovies.length;
};

export const updateMoviesCounterSeen = (library) => {
  const moviesCounterSeen = document.querySelector("#moviesCounterSeen");
  moviesCounterSeen.innerText = numberOfSeenMovies(library);
};

export const updateMoviesCounterAll = (library) => {
  const moviesCounterAll = document.querySelector("#moviesCounterAll");
  moviesCounterAll.innerText = library.length;
};
