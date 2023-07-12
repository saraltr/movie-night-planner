import { fetchMovieBySearch, getMovies } from './externalServices.mjs';
import { getLocalStorage } from './utils.mjs';

function createPostersContainer(movies, createTemplate, className) {
  const postersContainer = document.createElement("div");
  postersContainer.classList.add(className);

  const template = createTemplate(movies);
  postersContainer.innerHTML = template;

  postersContainer.style.display = "flex";
  postersContainer.style.flexDirection = "row";
  postersContainer.style.overflowX = "auto";
  postersContainer.style.gap = "10px";
  postersContainer.style.transform = "scale(0.8)";

  const posterImages = postersContainer.querySelectorAll("img");
  posterImages.forEach((img) => {
    img.style.height = "500px";
    img.style.width = "300px";
    img.style.objectFit = "cover";
  });

  return postersContainer;
}

export async function createList() {
  try {
    const mainElement = document.querySelector("main");
    const bannerSection = document.createElement("section");
    bannerSection.classList.add("bannerSection");
    const bannerDiv = document.createElement("div");
    bannerDiv.classList.add("movie-list");
    const bannerTitle = document.createElement("h2");
    bannerTitle.textContent = "Discover";

    bannerDiv.appendChild(bannerTitle);
    bannerSection.appendChild(bannerDiv);
    mainElement.appendChild(bannerSection);

    const popularWords = ["dark", "flower", "youth", "home", "fire", "little", "fantastic", "one", "star", "lady"];
    const randomWord = popularWords[Math.floor(Math.random() * popularWords.length)];
    const bannerMovies = await fetchMovieBySearch(randomWord);

    const createBannerPostersTemplate = (movies) => {
      if (!movies || !Array.isArray(movies.Search)) {
        return "";
      }

      let template = "";
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

      return template;
    };

    const postersContainer = createPostersContainer(bannerMovies, createBannerPostersTemplate, "list-container");
    bannerDiv.appendChild(postersContainer);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function createBanner(url, bannerText, mainBanner = true) {
  try {
    const mainElement = document.querySelector("main");
    const bannerSection = document.createElement("section");
    bannerSection.classList.add("bannerSection");
    const bannerDiv = document.createElement("div");

    if (mainBanner) {
      const iconClap = require("../public/images/clap.png");
      const bannerTitle = document.createElement("h1");
      bannerTitle.textContent = bannerText;
      const bannerMessage = document.createElement("p");
      const clapImage = document.createElement("img");
      clapImage.src = iconClap;
      clapImage.alt = "clap icon"
      bannerMessage.appendChild(clapImage); // append the image element to the paragraph
      bannerMessage.innerHTML += "-- Lights, Camera, Action! Plan Your Perfect Movie Night. --";
      const iconFilm = require("../public/images/film.png");
      const filmImage = document.createElement("img");
      filmImage.src = iconFilm;
      filmImage.alt = "film icon";
      bannerMessage.appendChild(filmImage);
      const bannerDiv = document.createElement("div");
      bannerDiv.classList.add("banner");
      bannerDiv.appendChild(bannerTitle);
      bannerDiv.appendChild(bannerMessage);
      bannerSection.appendChild(bannerDiv);
      mainElement.appendChild(bannerSection);

      const bannerMovies = await getMovies(url);
      if (bannerMovies && bannerMovies.results) {
        const createListTemplate = (movies) => {
          let template = "";
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

          return template;
        };

        const postersContainer = createPostersContainer(bannerMovies, createListTemplate, "posters-container");
        bannerDiv.appendChild(postersContainer);
        postersContainer.classList.add("loop");
      } else {
        console.log('Trending movies data is missing or invalid');
      }
    } else {
      const bannerTitle = document.createElement("h2");
      bannerTitle.textContent = bannerText;
      const bannerMessage = document.createElement("p");
      bannerDiv.appendChild(bannerTitle);
      bannerDiv.classList.add("movie-list");
      bannerDiv.appendChild(bannerMessage);
      bannerSection.appendChild(bannerDiv);
      mainElement.appendChild(bannerSection);

      const bannerMovies = await getMovies(url);
      if (bannerMovies && bannerMovies.results) {
        const createListTemplate = (movies) => {
          let template = "";
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

          return template;
        };

        const postersContainer = createPostersContainer(bannerMovies, createListTemplate, "list-container");
        bannerDiv.appendChild(postersContainer);
        postersContainer.classList.add("loop");
      } else {
        console.log('Trending movies data is missing or invalid');
      }
    }
  } catch (error) {
    console.log('Error fetching trending movies:', error);
  }
}

export async function createCustomList(templateCreator) {
  try {
    const mainElement = document.querySelector("main");
    const bannerSection = document.createElement("section");
    bannerSection.classList.add("bannerSection");
    const bannerDiv = document.createElement("div");
    bannerDiv.classList.add("banner");

    const template = templateCreator(); // call the template creator function to get the custom template
    bannerDiv.innerHTML = template;

    bannerSection.appendChild(bannerDiv);
    mainElement.appendChild(bannerSection);
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

export function createScrollBtn() {
  const mainElement = document.querySelector("main");
  const scrollBtn = document.createElement("button");
  scrollBtn.setAttribute("id", "scroll-Btn");
  scrollBtn.textContent = "Top";
  mainElement.appendChild(scrollBtn);

  window.onscroll = function () {
    scrollFunction(scrollBtn);
  };

  scrollBtn.addEventListener("click", () => {
    topFunction();
  });
}

function scrollFunction(btn) {
  if (
    document.documentElement.scrollTop > 100
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

// function to scroll to the top when the button is clicked
function topFunction() {
  document.documentElement.scrollTop = 0;
}
