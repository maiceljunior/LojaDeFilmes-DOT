import axios from "axios";

export const apiMoviePopular = axios.create({
  baseURL: "https://api.themoviedb.org/",
});
