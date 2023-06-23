import { fetchMovieBySearch } from './externalServices.mjs';

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("search");
const searchContainer = document.querySelector("#resultsContainer");

export async function displayMovies() {
  try {
    const results = await fetchMovieBySearch(searchTerm);
    const template = resultsTemplate(results);
    searchContainer.innerHTML = template;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function resultsTemplate(movies) {
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
        <a href="#">
          <h3>${movieTitle} (${movieYear})</h3>
          <img src="${moviePoster}" />
        </a>
      </li>`;
    }
  });
  
  template += '</ul>';
  return template;
}
