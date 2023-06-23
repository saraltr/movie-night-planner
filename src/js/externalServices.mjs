export async function getMoviesByTitle(title) {
    const apiKey = "f8b853da";
    const baseURL = "https://www.omdbapi.com/";
    const response = await fetch(`${baseURL}?apikey=${apiKey}&t=${title}`);
    if (response.ok){
        return response;
    }
    else{
        throw new Error("Something went wrong");
    }
}
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

export async function getMoviePosterById(imdbId) {
    const apiKey = "f8b853da";
    const posterURL = "https://img.omdbapi.com/";
    const response = await fetch(`${posterURL}?apikey=${apiKey}&i=${imdbId}`);
    if (response.ok){
        return response;
    }
    else{
        throw new Error("Failed to fetch movie poster");
    }
}

export async function fetchMovieByTitle(title) {
    try {
      const response = await getMoviesByTitle(title);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
}
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