import { createSearchBox, redirectToSearchResults } from './search';

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector("#searchButton");
  const searchInput = document.querySelector("#searchInput");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value;
    redirectToSearchResults(searchTerm);
  });
});

createSearchBox();

// I wanted to add the icons from here, but the path doesn't work
// const menuDiv = document.querySelector(".menu");

// const userIcon = document.createElement("img");
// userIcon.src = "../public/images/mnp-logo.svg";

// menuDiv.appendChild(userIcon);