import { createSearchBox, redirectToSearchResults } from './search';
import { createBanner } from './homePage.mjs';
import { movieFavList } from './userLists.mjs';
import { initialize } from './watchParty';

// event listener to make sure the dom is loaded before the js is executed
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");

  //  event listener for when the research is sent
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value; // getting the value from the search input
    redirectToSearchResults(searchTerm); // redirecting to the search results page with the search term
  });

  initialize() // displays the watchparty section
});

createSearchBox(); // creates the search box component

createBanner(); // creates the banner component