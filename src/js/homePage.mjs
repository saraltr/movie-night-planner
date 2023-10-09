import { fetchMovieBySearch, getMovies } from './externalServices.mjs';
import { getLocalStorage } from './utils.mjs';

// creates a container for movie posters
function createPostersContainer(movies, createTemplate, className) {
  const postersContainer = document.createElement("div");
  postersContainer.classList.add(className);

  const template = createTemplate(movies);
  postersContainer.innerHTML = template;

  // set styles for the posters container
  postersContainer.style.display = "flex";
  postersContainer.style.flexDirection = "row";
  postersContainer.style.overflowX = "auto";
  postersContainer.style.gap = "10px";
  postersContainer.style.transform = "scale(0.8)";

  // set styles for poster images
  const posterImages = postersContainer.querySelectorAll("img");
  posterImages.forEach((img) => {
    img.style.height = "500px";
    img.style.width = "300px";
    img.style.objectFit = "cover"; 
  });

  return postersContainer;
}

// creates the lists of movies
export async function createList(url = "", bannerText, mainBanner = true, sortByPopularity = false) {
  try {
    const mainElement = document.querySelector("main");
    const bannerSection = document.createElement("section");
    bannerSection.classList.add("bannerSection");
    const bannerDiv = document.createElement("div");
    bannerDiv.classList.add(mainBanner ? "banner" : "movie-list");

    const bannerTitleElement = mainBanner ? "h1" : "h2";
    const bannerTitle = document.createElement(bannerTitleElement);
    bannerTitle.textContent = bannerText;

    // if it's the main banner, create the banner message
    if (mainBanner) {
      const iconClap = require("../public/images/clap.png");
      const bannerMessage = document.createElement("p");
      const clapImage = document.createElement("img");
      clapImage.src = iconClap;
      clapImage.alt = "clap icon";
      bannerMessage.appendChild(clapImage); // Append the image element to the paragraph

      // banner message 
      bannerMessage.innerHTML += "-- Lights, Camera, Action! Plan Your Perfect Movie Night. --";

      const iconFilm = require("../public/images/film.png");
      const filmImage = document.createElement("img");
      filmImage.src = iconFilm;
      filmImage.alt = "film icon";

      // add the icons to the message
      bannerMessage.appendChild(filmImage);

      // adds an h1 if it's the main banner
      bannerDiv.appendChild(bannerTitle);
      bannerDiv.appendChild(bannerMessage);
    } else {
      // adds an h2 for any other list
      bannerDiv.appendChild(bannerTitle);
    }

    // adds the different elements to the section and then to the document
    bannerSection.appendChild(bannerDiv);
    mainElement.appendChild(bannerSection);

    let bannerMovies; // declares the banner of movies that will be used
    if (url) {
      // if it gets an url, uses the getMovie function to get the results
      bannerMovies = await getMovies(url);
      // Sort the bannerMovies by popularity if specified
      if (sortByPopularity) {
        bannerMovies.results.sort((a, b) => b.popularity - a.popularity);
      }
    } else {
      // otherwise uses the fetchMovieBySearch to more peronalized lists
      const randomWord = await discoverList(); // popular keywords to get random movies in the discover list
      bannerMovies = await fetchMovieBySearch(randomWord);
    }

    // create the posters container based on the movie data and template function
    const postersContainer = createPostersContainer(bannerMovies, createTemplate, mainBanner ? "posters-container" : "list-container");
    bannerDiv.appendChild(postersContainer);
  } catch (error) {
    console.log("Error fetching trending movies:", error);
  }
}

// function to randomly select a word from a popular words list
export async function discoverList() {
  const popularWords = ["dark", "flower", "youth", "home", "fire", "little", "fantastic", "star", "lady", "one", "lost", "new", "love", "life", "night", "world", "meet"];
  const randomWord = popularWords[Math.floor(Math.random() * popularWords.length)];
  // console.log(randomWord);
  return randomWord;
}

// function to create the template for movie posters
function createTemplate(movies) {
  let template = "";
  if (movies && movies.results) {
    // loop through movie results and create template for each movie
    movies.results.forEach((movie) => {
      const movieTitle = movie.original_title;
      const image = movie.poster_path;

      template += `
        <div class="movie-details">
          <a href="/movie-details/index.html?movie=${movieTitle}">
            <img src="https://image.tmdb.org/t/p/w500/${image}" alt="${movieTitle} poster">
          </a>
        </div>
      `;
    });
  } else if (movies && movies.Search) {
    // loop through search results and create template for each movie
    movies.Search.forEach((movie) => {
      const moviePoster = movie.Poster;
      const mediaType = movie.Type;
      const movieTitle = movie.Title;

      if (mediaType === "movie") {
        template += `
          <div class="movie-details">
            <a href="/movie-details/index.html?movie=${movieTitle}">
              <img src="${moviePoster}" alt="${movieTitle} poster"/>
            </a>
          </div>`;
      }
    });
  }
  return template;
} 

// Function to create a list of recommended movies
export async function recommendationsList() {
  const favList = getLocalStorage("fav-list");
  const searchTerm = localStorage.getItem("searchTerm");

  // if there is movies in the favlist, display this list, otherwise ignore it
  if (favList && favList.length !== 0) {
    // console.log(favList.length);
    const randomIndex = Math.floor(Math.random() * favList.length);
    const randomMovie = favList[randomIndex];
    const movieTitle = randomMovie.Title;
    // console.log(movieTitle);
    const movie = await getMovies(`search/movie?query=${encodeURIComponent(movieTitle)}`);
    const movieId = movie.results[0].id;
    createList(`movie/${movieId}/recommendations?language=en-US&page=1`, "Recommendations", false, true);
  }
  // only if there is a searchTerm saved 
  if (searchTerm) {
    const movie = await getMovies(`search/movie?query=${encodeURIComponent(searchTerm)}`);
    const movieId = movie.results[0].id;
    createList(`search/movie?query=${encodeURIComponent(searchTerm)}&language=en-US&page=1`, "Continue Exploring", false, true);

  }
}

export async function homePageList() {
  await recommendationsList(); // call the recommendationsList function first

  // define an array of objects containing the configurations for each list
  const lists = [
    { url: "movie/now_playing?language=en-US&page=1", title: "Currently in theatres", mainBanner: false },
    { url: "movie/top_rated?language=en-US&page=1", title: "Top Rated", mainBanner: false },
    { url: "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=10751", title: "Family", mainBanner: false },
    { url: "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28", title: "Action", mainBanner: false },
    { url: "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=18", title: "Drama", mainBanner: false },
    { url: "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648", title: "Mystery", mainBanner: false },
    { url: "", title: "Discover", mainBanner: false },
  ];

  // execute the createList function for each list configuration using Promise.all
  await Promise.all(lists.map(({ url, title, mainBanner }) => createList(url, title, mainBanner)));
}