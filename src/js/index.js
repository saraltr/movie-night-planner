import { createSearchBox, redirectToSearchResults } from './search';

// fetchMovieByTitle("Barbie");
// fetchMovieBySearch("shrek");

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    redirectToSearchResults(searchTerm);
  });
});

createSearchBox();

const menuDiv = document.querySelector(".menu");

const userIcon = document.createElement("img");
userIcon.src = "../public/images/mnp-logo.svg";

menuDiv.appendChild(userIcon);