import { getMoviesByTitle } from "./externalServices.mjs";
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

    const template = `<h1>${movie.Title} (${movie.Year})</h1>
    <div class="mov-inf">
        <p><b>Genre:</b> ${movie.Genre}</p>
        <p><b>Runtime:</b> ${movie.Runtime}</p>
        <p><b>Released:</b> ${movie.Released}</p>
        <p><b>Rated:</b> ${movie.Rated}</p>
        <p><b>Director:</b> ${movie.Director}</p>
        <p><b>Actors:</b> ${movie.Actors}</p>
        <p><b>Language:</b> ${movie.Language}</p>
    </div>
    <img class="mov-inf-img" src="${movie.Poster}" alt="Poster of ${movie.Title}">
    <div class="mov-inf-descr">
        <h2>Description</h2>
        <p>${movie.Plot}</p>
    </div>

    `;
    
    return template;
}