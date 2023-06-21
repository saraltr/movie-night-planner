export async function getMoviesByTitle(title) {
    const apiKey = "f8b853da";
    const baseURL = "http://www.omdbapi.com/";
    
    const response = await fetch(`${baseURL}?apikey=${apiKey}&t=${title}`);
    return response;
}

export async function getMoviePosterById(imdbId) {
    const apiKey = "f8b853da"; // Replace with your actual OMDB API key
    const posterURL = "http://img.omdbapi.com/";
  
    const response = await fetch(`${posterURL}?apikey=${apiKey}&i=${imdbId}`);
    return response;
  }
