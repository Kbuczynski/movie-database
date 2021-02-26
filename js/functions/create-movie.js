import { seenTypes } from "../utils/constants.js";

const createId = () => {
  const movies = JSON.parse(localStorage.getItem("movies"));
  const lastId = Math.max(...movies.map((movie) => movie.id));

  return lastId + 1;
};

const createMovie = (title, year, genre, summary, seen = seenTypes.false) => {
  return {
    id: createId(),
    title: title,
    year: year,
    genre: genre,
    summary: summary,
    seen: seen,
  };
};

export default createMovie;
