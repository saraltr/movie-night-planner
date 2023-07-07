import { getMoviesByTitle } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, addMovieToStorage } from "./utils.mjs";
export async function displayMovieDetails(movieTitle, selector){
  try{
    const container = document.querySelector(selector);
   const movie = await (await getMoviesByTitle(movieTitle)).json(); 
//    console.log( movie)
   if(!movie){
       throw new SyntaxError("The movie you are trying to find is not available.")
   }   
   container.innerHTML = renderMovieDetails(movie)
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
   // redirects to the watch party page using the title of the movie
   console.log(movie.Title);
   watchPartyButton.addEventListener("click", () => {
     const movieTitle = encodeURIComponent(movie.Title);
     window.location.href = `/watch-party/index.html?movie=${movieTitle}`;
   });
  } catch(err) {
      console.log(err) 
  }
  
}

function renderMovieDetails(movie){
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
        <div>
        <button id="fav-Btn" data-title="${movie.Title}"><img src="../images/icons8-favorite-40.png" alt="Fav Icon" title="Add ${movie.Title} to Favorites"></button>
        <button id="watchlist-Btn" data-title="${movie.Title}"><img src="../images/bookmark.png" alt="Watchlist Icon" title="Add ${movie.Title} to Watch List"></button>
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
        <p>🎬${movie.Ratings[0].Source}: ${movie.Ratings[0].Value}</p>
        <p>🎬${movie.Ratings[1].Source}: ${movie.Ratings[1].Value}</p>
        <p>🎬${movie.Ratings[2].Source}: ${movie.Ratings[2].Value}</p>
    </div>
    `;
    
    return template;
}