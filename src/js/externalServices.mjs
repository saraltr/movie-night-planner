import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
require("dotenv").config()

// fetch a movie by its title
export async function getMoviesByTitle(title) {
    const apiKey = process.env.OMDB_KEY; // our active key
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
    const apiKey = process.env.OMDB_KEY;
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

export async function fetchTrailerId(movieTitle) {
  try {
    const apiKey = process.env.GOOGLE_KEY;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(movieTitle + " trailer")}`);
    const data = await response.json();
    const trailerId = data.items[0].id.videoId;
    return trailerId;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}

export async function getMovies(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTMyYjY2MjM2YzI4OTQyZjgyOWYyYWM1Njg2N2E4YiIsInN1YiI6IjY0YTEwNDJhOGMwYTQ4MDEzYjNkYWI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TidpZEZvWp4o6Cy9_P3FexJEttfATJwtGZCjlfAXeZI"
    }
  };
  const response = await fetch(`https://api.themoviedb.org/3/${url}`, options)
  if (response.ok){
    const data = response.json()
    // console.log(data)
    return data;
  }
}