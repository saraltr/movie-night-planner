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
    return data
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

export async function fetchTrailerId(movieTitle) {
  try {
    // const apiKey = "AIzaSyCH37v8r3AA8XJJ_zQYPYrpp2bofTKZWGI";
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(movieTitle + " trailer")}`);
    const data = await response.json();
    const trailerId = data.items[0].id.videoId;
    return trailerId;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}