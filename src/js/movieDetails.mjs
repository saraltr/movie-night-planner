import { comment } from "postcss";
import { getMoviesByTitle } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, addMovieToStorage, addCommentToStorage } from "./utils.mjs";
export async function displayMovieDetails(movieTitle, selector){
  try{
   const container = document.querySelector(selector);
   const commentDiv = document.querySelector("#movie-comments");
   const movie = await (await getMoviesByTitle(movieTitle)).json(); 
   if(!movie){
       throw new SyntaxError("The movie you are trying to find is not available.")
   }   
   let renderMD = renderMovieDetails(movie)
   let comments = renderCommentForm(movie)
  
   container.innerHTML = renderMD;
   commentDiv.innerHTML = comments;

   const detailsContainer = document.querySelector(".detailsContainer");
   detailsContainer.style.backgroundImage = `url("${movie.Poster}")`;
   detailsContainer.style.backgroundSize = "cover";
   detailsContainer.style.backgroundPosition = "center";

   //button icons
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
   watchPartyButton.addEventListener("click", () => {
     const movieTitle = encodeURIComponent(movie.Title);
     window.location.href = `/watch-party/index.html?movie=${movieTitle}`;
   });

   //ADD COMMENTS TO STORAGE
   const commentBtn = document.querySelector("#commtBtn");
   commentBtn.addEventListener("click", (e)=>{
      e.preventDefault();
      addCommentToStorage(movie)
    });

    //SHOW REVIEWS ON SCREEN
    const reviews = document.querySelector(".reviews");
    let commentList = getLocalStorage("reviews") || [];
    console.log(commentList)
   
    let index = commentList.forEach((item)=>{
        if(movie.Title === item.movie){
           
            const reviews = document.querySelector(".reviews");
            let div = document.createElement("div");
            let name = document.createElement("h4");
            let comment = document.createElement("p");

            name.innerHTML = `💬 ${item.name} (${item.date})`;
            comment.innerHTML = item.comment;

            div.style.backgroundColor = "rgb(0, 0, 0, .5)";
            div.style.marginTop = ".5rem"
            div.style.padding = ".3rem 1rem";
            div.style.textAlign = "start";
            div.style.border = "2px solid #d0d0d0";

            div.appendChild(name);
            div.appendChild(comment);

            reviews.appendChild(div);
          
        } 
      
    })

    


  } catch(err) {
      console.log(err.message) 
      const container = document.querySelector(selector);
      container.innerHTML = `<div><h1>There was a problem</h1>
      <p>The movie details is not available.</p>
      <p>${err.message}</p></div>`
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

function renderCommentForm(movie){
    let form = `<h2>Reviews</h2><div class="reviews"></div>
    
    <h2>Share a Comment</h2>
    <div class="notice"></div>
    <form method=post>
    <fieldset>
    <label>Name: <input id="username" type="text" name="name"></label>
    <label>Your Comment: <textarea id="comment" name="comment"></textarea></label>
    <input id="commtBtn" type="button" name="submit" value="Share Comment">
    <input id="mTitle" type="hidden" name="movieTitle" value="${movie.Title}">
    <input type="hidden" name="timeSend" id="formDateSend">
    </fieldset>
    </form>`;   
    return form;
   }
   