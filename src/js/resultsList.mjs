import { fetchMovieBySearch } from './externalServices.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

// get the search term from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("search");

const searchContainer = document.querySelector("#resultsContainer");

// function to display movies based on the search term
export async function displayMovies() {
  try {
    // fetch the movie results using the search term
    const results = await fetchMovieBySearch(searchTerm);

    // generate the HTML template using the results
    const template = resultsTemplate(results);

    // update the search container with the template
    searchContainer.innerHTML = template;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// generate the HTML template for the movie results
export function resultsTemplate(movies) {
  if (!movies || !movies.Search || !Array.isArray(movies.Search)) {
    return "<h2>Sorry, we couldn\'t find any results. Try again!</h2>";
  }

  let template = "<h2>Search term: " + searchTerm + "</h2>";
  template += "<ul class='resultsList'>";
  
  
  movies.Search.forEach((movie) => {
    const movieTitle = movie.Title;
    const moviePoster = movie.Poster;   
    const mediaType = movie.Type;
    const movieYear = movie.Year;
    console.log(movie);

    if (mediaType === "movie"){
      template += `
      <li class="movie-details">
        <button id="fav-Btn" data-title="${movieTitle}" onclick="addToStorage(${movie})"><img src="../public/images/icons8-favorite-40.png" alt="Fav Icon"></button>
        <a href="#">
          <h3>${movieTitle} (${movieYear})</h3>
          <img src="${moviePoster}" alt="Porter of ${movieTitle}" />
        </a>
      </li>`;
    }
  });
  
  template += '</ul>';
  return template;
}

function addToStorage(movie){
  const favList = getLocalStorage("fav-list") || [];
  const index = favList.findIndex((item) =>{ item.Title === movie.Title})
  if (index === -1) {
    favList.push({ ...movie, poster: movie.Poster, title: movie.Title});
  } 
  setLocalStorage("fav-list", favList);

}