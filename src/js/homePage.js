import { getMoviesBySearch } from './externalServices.mjs';

import { getMoviesBySearch } from './externalServices.mjs';

async function fetchMoviesForCarousel(searchQuery) {
  try {
    const moviesResponse = await getMoviesBySearch(searchQuery);
    const movies = moviesResponse.Search; // Extract the movies array from the API response

    const carouselContainer = document.getElementById("carousel-container");
    movies.forEach(movie => {
      const posterElement = document.createElement("img");
      posterElement.src = movie.Poster;
      posterElement.alt = movie.Title;
      carouselContainer.appendChild(posterElement);
    });

  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch and display movie posters in the carousel
fetchMoviesForCarousel("The Lord of the Rings");
