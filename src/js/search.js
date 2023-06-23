import { getMoviesBySearch, fetchMovieBySearch } from './externalServices.mjs';

export function createSearchBox() {

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('id', 'searchInput');

  // Create the search button element
  const searchButton = document.createElement('button');
  searchButton.setAttribute('id', 'searchButton');
  searchButton.textContent = 'Search';

  // Append the search box and button to the document body or a container element
  document.body.appendChild(searchInput);
  document.body.appendChild(searchButton);
}

export function redirectToSearchResults(searchTerm) {
  const urlParams = new URLSearchParams();
  urlParams.set('search', searchTerm);
  const newUrl = `results/results.html?${urlParams.toString()}`;
  window.location.href = newUrl;
}