import { getMoviesByTitle, addMovieToStorage } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export async function displayMovieDetails(movieTitle, selector){
  try{
    const container = document.querySelector(selector);
   const movie = await (await getMoviesByTitle(movieTitle)).json(); 
   console.log( movie)
   if(!movie){
       throw new SyntaxError("The movie you are trying to find is not available.")
   }

   
   
   container.innerHTML = renderMovieDetails(movie)

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

    <div><button id="fav-Btn" data-title="${movie.Title}" onclick="${addMovieToStorage(movie)}"><img src="../public/images/icons8-favorite-40.png" alt="Fav Icon"></button></div>
    <div>Add to watch list</div>


    `;
    
    return template;
}