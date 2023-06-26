import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// fetch a movie by its title
export async function getMoviesByTitle(title) {
    const apiKey = "f8b853da"; // our active key
    const baseURL = "https://www.omdbapi.com/";
    const response = await fetch(`${baseURL}?apikey=${apiKey}&t=${title}`);
    if (response.ok){
        return response;
    }
    else{
        throw new Error("Something went wrong");
    }
}

// fetch movies by search term
export async function getMoviesBySearch(search) {
    const apiKey = "f8b853da";
    const baseURL = "https://www.omdbapi.com/";
    const response = await fetch(`${baseURL}?apikey=${apiKey}&s=${search}`);
    if (response.ok){
        return response;
    }
    else{
        throw new Error("Something went wrong");
    }
}

// return the results by title
export async function fetchMovieByTitle(title) {
    try {
      const response = await getMoviesByTitle(title);
      const data = await response.json();
    //   console.log(data);
    return data
    } catch (error) {
      console.error(error);
    }
}

// return the search results
export async function fetchMovieBySearch(search) {
    try {
      const response = await getMoviesBySearch(search);
      const data = await response.json();
    //   console.log(data);
    return data.Search // search is the property that returns the array of results
    } catch (error) {
      console.error(error);
    }
}
export function addMovieToStorage(movie){
  const favList = getLocalStorage("fav-list") || [];
  const index = favList.findIndex((item) =>{ item.Title === movie.Title})
  if (index === -1) {
    favList.push({ ...movie, poster: movie.Poster, title: movie.Title});
  } 
  setLocalStorage("fav-list", favList);

}