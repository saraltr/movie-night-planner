import { getMoviesBySearch, fetchMovieBySearch } from './externalServices.mjs';

export function createSearchBox() {

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("id", "searchInput");
  searchInput.setAttribute("placeholder", "Enter your search...");
  searchInput.classList.add("search-input");


  // create the search button element
  const searchButton = document.createElement("button");
  searchButton.setAttribute("id", "searchButton");
  searchButton.textContent = "Search";
  searchButton.classList.add("search-button");

  const searchBox = document.createElement("div");
  searchBox.classList.add("search-box");
  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  // append the search box and button to the menu div
  const menuDiv = document.querySelector(".menu");
  menuDiv.prepend(searchBox);
}

export function redirectToSearchResults(searchTerm) {
  const urlParams = new URLSearchParams();
  urlParams.set("search", searchTerm);
  const newUrl = `results/results.html?${urlParams.toString()}`;
  window.location.href = newUrl;
}