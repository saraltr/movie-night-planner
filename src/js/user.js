import { buildNavigation } from './hamburgerMenu.mjs';
import { createSearchBox, redirectToSearchResults } from './search.mjs';
import { movieFavList } from "./userLists.mjs";
import { createScrollBtn, generateBreadcrumb } from './utils.mjs'


document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector("#searchButton");
    const searchInput = document.querySelector("#searchInput");
  
    //  event listener for when the research is sent
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value; // getting the value from the search input
      redirectToSearchResults(searchTerm); // redirecting to the search results page with the search term
    });
});

const favContainerEl = document.querySelector(".breadcrumbContainer");
generateBreadcrumb("", favContainerEl);

createSearchBox();
buildNavigation();

//display the lists
movieFavList(".fav-user-list", "fav-list");
movieFavList(".watch-list", "watch-list");
createScrollBtn();