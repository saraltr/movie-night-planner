import { getMoviesByTitle, getMovies } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, addMovieToStorage } from "./utils.mjs";

export async function displayMovieDetails(movieTitle, selector) {
    let container = document.querySelector(selector);
    try {
      let movie = await (await getMoviesByTitle(movieTitle)).json();
  
      if (!movie) {
        movie = await getMovies(`search/movie?query=${encodeURIComponent(movieTitle)}`);
        if (!movie.results || movie.results.length === 0) {
          throw new SyntaxError("The movie you are trying to find is not available.");
        }
        movie = movie.results[0];
      }
  
      container.innerHTML = renderMovieDetails(movie);
  
      const detailsContainer = document.querySelector(".detailsContainer");
      detailsContainer.style.backgroundImage = `url("${movie.Poster}")`;
      detailsContainer.style.backgroundSize = "cover";
      detailsContainer.style.backgroundPosition = "center";
  
      const favBtn = document.querySelector("#fav-Btn");
      favBtn.addEventListener("click", () => {
        addMovieToStorage(movie, "fav-list");
      });
  
      const watchlistBtn = document.querySelector("#watchlist-Btn");
      watchlistBtn.addEventListener("click", () => {
        addMovieToStorage(movie, "watch-list");
      });
  
      const watchPartyButton = document.querySelector(".joinBtn");
      watchPartyButton.addEventListener("click", () => {
        const movieTitle = encodeURIComponent(movie.Title);
        window.location.href = `/watch-party/index.html?movie=${movieTitle}`;
      });
    } catch {
        const gifImage = require("../public/images/working.gif");
      const errorMessage = `
        <div class="error-Mess">
          <h1>The movie you are trying to find is not available yet</h1>
          <p>We are still working on it!</p>
          <img src="${gifImage}" alt="movie gif">
          <p>Return to the <a href="../index.html">Home Page</a> and explore more movies!</p>
        </div>
      `;
      container.innerHTML = errorMessage;
    }
}

function renderMovieDetails(movie){
    console.log(movie);
    const favBtn = require("../public/images/icons8-favorite-40.png");
    const watchListBtn = require("../public/images/bookmark.png");
    let ratingsTemplate = "";

    if (movie.Ratings.length > 0) {
        for (let i = 0; i < movie.Ratings.length; i++) {
            ratingsTemplate += `<p>🎬${movie.Ratings[i].Source}: ${movie.Ratings[i].Value}</p>`;
        }
    } else{
        ratingsTemplate = "<p>Not enough ratings yet</p>";
    }

    const template = `
    <div class="mov-inf">
    <h1>${movie.Title} (${movie.Year})</h1>
        <p><b>Genre:</b> ${movie.Genre}</p>
        <p><b>Runtime:</b> ${movie.Runtime}</p>
        <p><b>Released:</b> ${movie.Released}</p>
        <p><b>Country:</b> ${movie.Country}</p>
        <p><b>Rated:</b> ${movie.Rated}</p>
        <p><b>Director:</b> ${movie.Director}</p>
        <p><b>Actors:</b> ${movie.Actors}</p>
        <p><b>Language:</b> ${movie.Language}</p>
        <p><b>Awards:</b> ${movie.Awards}</p>
        <div class="btnContainer">
        <button id="fav-Btn" data-title="${movie.Title}"><img src="${favBtn}" alt="Fav Icon" title="Add ${movie.Title} to Favorites"></button>
        <button id="watchlist-Btn" data-title="${movie.Title}"><img src="${watchListBtn}" alt="Watchlist Icon" title="Add ${movie.Title} to Watch List"></button>
        </div>
        <div class="create-Party">
            <button class="joinBtn">Create Watch Party 🎥</button>
        </div>
    
    </div>
    <img class="mov-inf-img" src="${movie.Poster}" alt="Poster of ${movie.Title}">
    <div class="mov-inf-descr">
        <h3>Description</h3>
        <p>${movie.Plot}</p>
    </div>

    <div class="mov-inf-rating">
    <h3>⭐⭐Ratings⭐⭐<h3>
    ${ratingsTemplate}
    </div>
    `;
    return template;
}