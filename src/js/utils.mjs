// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function generateBreadcrumb(){
  
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const url = urlParams.get(param)
  return url
}

export async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

export function addMovieToStorage(movie, list) {
  const favList = getLocalStorage(list) || [];
  const index = favList.findIndex((item) => item.Title === movie.Title);
  if (index === -1) {
    favList.push({ ...movie, poster: movie.Poster, title: movie.Title });
    setLocalStorage(list, favList);
  }
}


export function toggleIcon(img, movie, src){
  const favList = getLocalStorage("fav-list") || [];
  //const movieLst = favList.findIndex((item) => item.Title === movie.Title);
  //console.log(favList)
  //console.log(movieLst)

  //I had to solve the refreshing to keep icons on the correct toggle
  if(true ){
    img.src = src;
    setLocalStorage("toggle-icon", true)
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
