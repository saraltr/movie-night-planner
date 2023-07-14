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

export function addCommentToStorage(movie){
    const comment = document.querySelector("#comment").value;
    const username = document.querySelector("#username").value;
    const mTitle = document.querySelector("#mTitle").value;
    const inputDate = document.querySelector("#formDateSend");
    const notice = document.querySelector(".notice");
    let d = new Date()
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let date = `${months[d.getMonth()]}, ${d.getDate()} ${d.getFullYear()}`

    let reviewLst = getLocalStorage("reviews") || [];
    if(!username == "" || !comment == ""){
      reviewLst.push({comment: comment, name: username, movie: mTitle, date: inputDate.value = date})
      setLocalStorage("reviews", reviewLst);
      notice.innerHTML = `<p>Your Review for ${movie.Title} was added</p>`;
      setTimeout(function(){
        window.location.reload();
     }, 4000);
    }
    else{
        console.log("comment not addewd")
        notice.innerHTML = `<p>There was an error and the comment was not added</p>`
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

// Function to create a scroll-to-top button
export function createScrollBtn() {
  const scrollBtn = document.createElement("img");
  scrollBtn.src = require("../public/images/up.png")
  scrollBtn.setAttribute("id", "scroll-Btn");
  document.body.appendChild(scrollBtn);

  document.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}