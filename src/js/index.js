import { createSearchBox, redirectToSearchResults } from './search';

// fetchMovieByTitle("Barbie");
// fetchMovieBySearch("shrek");

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.querySelector('#searchInput');

  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    redirectToSearchResults(searchTerm);
  });
});

createSearchBox();
