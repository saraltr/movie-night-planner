import { getLocalStorage, setLocalStorage } from './utils.mjs';

export function movieFavList(selector, list){
    try{
    const favList = getLocalStorage(list) || [];
    const favEl = document.querySelector(selector);
    const favCtner = document.querySelector(".fav-container");

    if(favList.length === 0){
        favCtner.innerHTML = `<h3>Create your Fav List</h3>
                            <p>Explore and add Movies to share with your friends!</p>`
    }

    // console.log(favList);

     // applied additional styling using js to experiment 
        favEl.style.display = "flex";
        favEl.style.flexDirection = "row";
        // favEl.style.justifyContent = "space-evenly";
        favEl.style.overflowX = "auto";
        favEl.style.gap = "10px";
        favEl.style.transform = "scale(0.8)";
        favEl.style.padding = "1rem";

    const movie = favList.map((item) => {
         return template = `<li>
            <div class="delBtn" title="Delete Movie from list"><button class="delete-movie" data-title="${item.Title}" data-lst="${list}"> X </button></div>
            <a href="/movie-details/index.html?movie=${item.Title}" > 
                <img src="${item.Poster}" alt="Poster of ${item.Title}" />
                <h3 class="movie-title">${item.Title} (${item.Year})</h3>
            </a>
        </li>`;
    });
     console.log(`here ${movie}`);
    favEl.innerHTML = movie.join("");

    const favImages = favEl.querySelectorAll("img"); // selecting all img elements within the fav list container
    favImages.forEach((img) => {
      // applying additional styling to each image
      img.style.width = "250px";
      img.style.objectFit = "cover";
    });

    // check if the list overflows and apply justify-content if necessary
    setTimeout(() => {
        if (favEl.scrollWidth > favEl.clientWidth) {
            favEl.style.justifyContent = "start";
        } else {
            favEl.style.justifyContent = "space-between";
        }
    }, 0);

    //HANDLE REMOVE MOVIE FROM LISTS
    const deleteBtn = document.querySelectorAll(".delete-movie");

    deleteBtn.forEach((del)=>{
        del.style.position = "absolute";
        del.style.right = "0";
        del.style.border = "1px solid #d0d0d0";
        del.style.backgroundColor = "#122936";
        del.style.color = "#d0d0d0";
        del.style.opacity = ".7"
        del.style.fontSize = "25px";
        del.addEventListener("mouseover", ()=>{
            del.style.opacity = "1";
            del.style.color = "#fff";
            del.style.padding = ".3rem";
            setTimeout(() => {
                del.style.color = "#d0d0d0";
                 del.style.opacity = ".7"
                 del.style.padding = ".2rem";
              }, 1000);
        })
        

        del.addEventListener("click",()=>{
            const movieTitle = del.getAttribute("data-title");
            const movieLst = del.getAttribute("data-lst");
            const index = favList.findIndex((item) => item.Title === movieTitle);
            if (index != -1 && movieLst === list) { //get specific index and from that specific list
                favList.splice(index, 1);
               setLocalStorage(movieLst, favList);
             }
        });

    })
   

} catch {
    console.log("Error: Could not create list");
}
   
}