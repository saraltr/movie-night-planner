import { createSearchBox, redirectToSearchResults } from './search.mjs';
import { homePageList, createList } from './homePage.mjs';
import { movieFavList } from './userLists.mjs';
import { initialize } from './watchParty.mjs';
import { createScrollBtn } from './utils.mjs'

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

createList("trending/movie/week?language=en-US", "Welcome to Movie Night Planner!");
homePageList();
createScrollBtn();