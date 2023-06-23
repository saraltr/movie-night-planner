import { fetchMovieBySearch } from './externalServices.mjs';

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("search");
const searchContainer = document.querySelector("#resultsContainer");

// Display the search term on the page
const searchTermElement = document.createElement("h2");
document.body.appendChild(searchTermElement);

if (searchTerm == null) {
  searchTermElement.textContent = "Sorry, we couldn't find any results. Try again!";
} else {
  searchTermElement.textContent = `Search term: ${searchTerm}`;
}

searchContainer.appendChild(searchTermElement);

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
    return '<p>No movies found</p>';
  }

  let template = '<ul class="resultsList">';
  
  movies.Search.forEach((movie) => {
    const movieTitle = movie.Title;
    const moviePoster = movie.Poster;   
    
    console.log("Movie title:", movieTitle);
    console.log("Movie poster:", moviePoster);
    
    template += `
      <li class="product-card">
        <a href="#">
          <h3>${movieTitle}</h3>
          <img src="${moviePoster}" />
        </a>
      </li>`;
  });
  
  template += '</ul>';
  
  return template;
}
