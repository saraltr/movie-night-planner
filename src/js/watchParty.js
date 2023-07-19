import { buildNavigation } from './hamburgerMenu.mjs';
import { createSearchBox, redirectToSearchResults } from './search.mjs';
import { getParam, createScrollBtn, generateBreadcrumb } from "./utils.mjs"
import { initialize, showMovieSelection } from "./watchParty.mjs"


document.addEventListener("DOMContentLoaded", () => {
    const movieTitle = getParam("movie");
    // console.log(movieTitle);
  
    if (movieTitle) {
      // use the movie title to fetch the corresponding movie data and play the trailer
      initialize(movieTitle);
      generateBreadcrumb(movieTitle);
    } else {
      generateBreadcrumb();
      showMovieSelection();
    }
    
    const searchButton = document.querySelector("#searchButton");
    const searchInput = document.querySelector("#searchInput");
  
    // event listener for when the research is sent
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value; // getting the value from the search input
      redirectToSearchResults(searchTerm); // redirecting to the search results page with the search term
    });
  });

createSearchBox(); 
buildNavigation();
createScrollBtn();