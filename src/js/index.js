import { createSearchBox, redirectToSearchResults } from './search';
import { createBanner } from './homePage.mjs';

// event listener to make sure the dom is loaded before the js is executed
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");

  //  event listener for when the research is sent
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value; // getting the value from the search input
    redirectToSearchResults(searchTerm); // redirecting to the search results page with the search term
  });
});

createSearchBox(); // creates the search box component

createBanner(); // creates the banner component

// I wanted to add the icons from here, but the path doesn't work
// const menuDiv = document.querySelector(".menu");

// const userIcon = document.createElement("img");
// userIcon.src = "../public/images/mnp-logo.svg";

// menuDiv.appendChild(userIcon);