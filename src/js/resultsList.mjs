import { fetchMovieBySearch, addMovieToStorage } from './externalServices.mjs';

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

    addMovieToStorage(results.Search, "recs-list")

    const favBtns = document.querySelectorAll("#fav-Btn");
    favBtns.forEach((favBtn) => {
      favBtn.addEventListener("click", () => {
        const movieTitle = favBtn.getAttribute("data-title");
        const movie = results.Search.find((movie) => movie.Title === movieTitle);
        addMovieToStorage(movie, "fav-list");
      });
    });
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// generate the HTML template for the movie results
export function resultsTemplate(movies) {
  console.log(movies)
  if (!movies || !movies.Search || !Array.isArray(movies.Search)) {
    return "<h2>Sorry, we couldn\'t find any results. Try again!</h2>";
  }

  const numMatches = movies.Search.length;
  let template = `<h1>🔎 Search Results</h1>
  <h2>Found ${numMatches} Matches for "${searchTerm}"</h2>`;
  template += "<ul class='resultsList'>";
  
  
  movies.Search.forEach((movie) => {
    const movieTitle = movie.Title;
    const moviePoster = movie.Poster;   
    const mediaType = movie.Type;
    const movieYear = movie.Year;
    // console.log(movie);

    if (mediaType === "movie"){
      template += `
      <li class="movie-details">
        <a href="/movie-details/index.html?movie=${movieTitle}" >
          <img id="posterImg" src="${moviePoster}" alt="Poster of ${movieTitle}" />
          <p>${movieTitle} (${movieYear})<p>

        </a>
        <button id="fav-Btn" data-title="${movieTitle}"><img src="../public/images/icons8-favorite-40.png" alt="Fav Icon"></button>
      </li>`;
    }
  });
  
  template += '</ul>';
  return template;
}
