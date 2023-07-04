import { createSearchBox, redirectToSearchResults } from './search.mjs';
import { getParam } from "./utils.mjs"
import { initialize } from "./watchParty.mjs"


document.addEventListener("DOMContentLoaded", () => {
    const movieTitle = getParam("movie");
    console.log(movieTitle)
  
    if (movieTitle) {
      // Use the movie title to fetch the corresponding movie data and play the trailer
      initialize(movieTitle);
    }
    
    const searchButton = document.querySelector("#searchButton");
    const searchInput = document.querySelector("#searchInput");
  
    // Event listener for when the research is sent
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value; // getting the value from the search input
      redirectToSearchResults(searchTerm); // redirecting to the search results page with the search term
    });
  });

createSearchBox(); // creates the search box component
