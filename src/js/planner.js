import { buildNavigation } from './hamburgerMenu.mjs';
import { createSearchBox, redirectToSearchResults } from './search';
import { createScrollBtn } from './utils.mjs'
import { saveMovieNight } from './planning.mjs'

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector("#searchButton");
    const searchInput = document.querySelector("#searchInput");
  
    //  event listener for when the research is sent
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value; // getting the value from the search input
      redirectToSearchResults(searchTerm); // redirecting to the search results page with the search term
    });
});

createSearchBox();
buildNavigation();
createScrollBtn();
saveMovieNight();