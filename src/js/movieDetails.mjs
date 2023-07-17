import { comment } from "postcss";
import { getMoviesByTitle, getMovies } from "./externalServices.mjs";
import { getLocalStorage, addMovieToStorage, addCommentToStorage } from "./utils.mjs";

export async function displayMovieDetails(movieTitle, selector) {
  let container = document.querySelector(selector);
  try {
    const commentDiv = document.querySelector("#movie-comments");
    let movie = await (await getMoviesByTitle(movieTitle)).json();

    if (!movie) {
        // if the movie is not available in omdb database, looks into tmdb
      movie = await getMovies(`search/movie?query=${encodeURIComponent(movieTitle)}`);
      if (!movie.results || movie.results.length === 0) {
        throw new SyntaxError("The movie you are trying to find is not available.");
      }
      movie = movie.results[0];
    }

    if (!movieTitle) {
      // Display a message when the movie title is null or undefined
      const errorMessage = `
        <div class="error-Mess">
          <h1>No movie found</h1>
          <p>Please select a valid movie.</p>
        </div>
      `;
      container.innerHTML = errorMessage;
      return;
    }

    let renderMD = renderMovieDetails(movie);
    let comments = renderCommentForm(movie);

    container.innerHTML = renderMD;
    commentDiv.innerHTML = comments;
    
    const detailsContainer = document.querySelector(".detailsContainer");
    detailsContainer.style.backgroundImage = `url("${movie.Poster}")`;
    detailsContainer.style.backgroundSize = "cover";
    detailsContainer.style.backgroundPosition = "center";

    // Button icons
    const favBtn = document.querySelector("#fav-Btn");
    favBtn.addEventListener("click", () => {
      addMovieToStorage(movie, "fav-list");
    });

    const watchlistBtn = document.querySelector("#watchlist-Btn");
    watchlistBtn.addEventListener("click", () => {
      addMovieToStorage(movie, "watch-list");
    });

    const watchPartyButton = document.querySelector(".joinBtn");
    // Redirects to the watch party page using the title of the movie
    watchPartyButton.addEventListener("click", () => {
      const movieTitle = encodeURIComponent(movie.Title);
      window.location.href = `/watch-party/index.html?movie=${movieTitle}`;
    });

    //ADD COMMENTS TO STORAGE
    const commentBtn = document.querySelector("#commtBtn");
    commentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addCommentToStorage(movie);
    });

    //SHOW REVIEWS ON SCREEN
    const reviews = document.querySelector(".reviews");
    let commentList = getLocalStorage("reviews") || [];
    // console.log(commentList);

    if (commentList.length === 0) {
        // message to display when there is no user comments yet
        const noCommentsMessage = `<p>No comments yet</p>`;
        reviews.innerHTML = noCommentsMessage;
    }

    commentList.forEach((item) => {
      if (movie.Title === item.movie) {
        let div = document.createElement("div");
        let name = document.createElement("h4");
        let comment = document.createElement("p");

        name.innerHTML = `💬 ${item.name} (${item.date})`;
        comment.innerHTML = item.comment;

        div.style.backgroundColor = "rgb(0, 0, 0, .5)";
        div.style.marginTop = ".5rem";
        div.style.padding = ".3rem 1rem";
        div.style.textAlign = "start";
        div.style.border = "2px solid #d0d0d0";

        div.appendChild(name);
        div.appendChild(comment);

        reviews.appendChild(div);
      }
    });
  } catch {
    // to display when the movie's details are not available
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

function renderMovieDetails(movie) {
  // console.log(movie);
  const favBtn = require("../public/images/icons8-favorite-40.png");
  const watchListBtn = require("../public/images/bookmark.png");
  let ratingsTemplate = "";

  if (movie.Ratings.length > 0) {
    // checks how many rating are available
    for (let i = 0; i < movie.Ratings.length; i++) {
      ratingsTemplate += `<p>🎬${movie.Ratings[i].Source}: ${movie.Ratings[i].Value}</p>`;
    }
  } else {
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
      <h2>Description</h2>
      <p>${movie.Plot}</p>
    </div>
    <div class="mov-inf-rating">
      <h2>⭐⭐Ratings⭐⭐<h2>
      ${ratingsTemplate}
    </div>
  `;
  return template;
}

function renderCommentForm(movie) {
  let form = `
    <h2>Reviews</h2>
    <div class="reviews"></div>

    <h2>Share a Comment</h2>
    <div class="notice"></div>
    <form method="post">
      <fieldset>
        <label>Name: <input id="username" type="text" name="name"></label>
        <label>Your Comment: <textarea id="comment" name="comment"></textarea></label>
        <input id="commtBtn" type="button" name="submit" value="Share Comment">
        <input id="mTitle" type="hidden" name="movieTitle" value="${movie.Title}">
        <input type="hidden" name="timeSend" id="formDateSend">
      </fieldset>
    </form>
  `;
  return form;
}