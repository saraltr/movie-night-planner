import { createSearchBox, redirectToSearchResults } from './search.mjs';
import { movieFavList } from "./userLists.mjs";
import { createScrollBtn } from './utils.mjs'


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

//display the lists
movieFavList(".fav-user-list", "fav-list");
movieFavList(".watch-list", "watch-list");
createScrollBtn();