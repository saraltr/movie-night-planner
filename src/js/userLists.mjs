import { getLocalStorage } from './utils.mjs';

export function movieFavList(selector){
    try{
    const favList = getLocalStorage("fav-list") || [];
    const favEl = document.querySelector(selector);

    console.log(favList);

     // applied additional styling using js to experiment 
     favEl.style.display = "flex";
     favEl.style.flexDirection = "row";
     favEl.style.overflowX = "auto";
     favEl.style.gap = "10px";
     favEl.style.transform = "scale(0.8)";
     favEl.style.padding = "1rem"

    const movie = favList.map((item) => {
         return template = `<li>
            <a href="#">   
                <img src="${item.Poster}" alt="Porter of ${item.Title}" />
                <h3>${item.Title} (${item.Year})</h3>
                </a>
            </li>`;

    })
    console.log(movie);
    favEl.innerHTML = movie.join("");

    const favImages = favEl.querySelectorAll("img"); // selecting all img elements within the fav list container
    favImages.forEach((img) => {
      // applying additional styling to each image
      img.style.width = "250px";
      img.style.objectFit = "cover";
      img.style.transition = "transform 0.3s";
    });

} catch {
    console.log("Error: Could not create list");
}
   
}