// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function generateBreadcrumb(param = "", mainEl = document.querySelector("main")) {
  
  const breadcrumbNav = document.createElement("div");
  breadcrumbNav.classList.add("breadcrumb-navigation");

  const breadcrumbList = document.createElement("ul");
  breadcrumbList.classList.add("breadcrumb-list");

  // create the home link and add it to the breadcrumb list
  const homeLink = createBreadcrumbLink("Home", "/index.html");
  breadcrumbList.appendChild(homeLink);

  // get the current path of the page and split it into segments
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split("/").filter(segment => segment !== "");

  // variables to keep track of the path and previous segment
  let path = "/";
  let previousSegment = "";

  // iterate through the path segments
  for (let i = 0; i < pathSegments.length; i++) {
    // append the current segment to the path
    path += pathSegments[i];

    // Check if the current segment is different from the previous segment
    if (pathSegments[i] !== "index.html" && pathSegments[i] !== previousSegment) {

      // create the segment link and add it to the breadcrumb list
      const segmentLink = createBreadcrumbLink(pathSegments[i], path);
      breadcrumbList.appendChild(segmentLink);

      // check if it is not the last segment to add a slash
      if (i !== pathSegments.length - 1) {
        const slash = document.createElement("span");
        slash.classList.add("breadcrumb-slash");
        slash.textContent = "/";
        breadcrumbList.appendChild(slash);
      }
    }

    // Update the previous segment
    previousSegment = pathSegments[i];
  }

  // Check if a parameter is provided and add it to the breadcrumb list
  if (param !== "") {
    const paramLink = createBreadcrumbLink(param);
    breadcrumbList.appendChild(paramLink);
  }

  // Append the breadcrumb list to the breadcrumb navigation container
  breadcrumbNav.appendChild(breadcrumbList);

  // Insert the breadcrumb navigation container at the beginning of the main element
  mainEl.insertAdjacentElement("afterbegin", breadcrumbNav);
}

// Function to create a breadcrumb link
function createBreadcrumbLink(text, href = "") {

    // only for the results page so it would not redirect towards an empty page
    if (text === "results")
    {
      const searchTerm = localStorage.getItem("searchTerm"); // retrieve the search term from local storage
      const searchParam = encodeURIComponent(searchTerm); // encode the search term for URL
      href = `/results/index.html?search=${searchParam}`;
    }

    // create the link element
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;

    // Create the list item element and add the link to it
    const listItem = document.createElement("li");
    listItem.classList.add("breadcrumb-item");
    listItem.appendChild(link);

    if(text === "Home")
    {
      // Create and append the slash element after the home link
      const slash = document.createElement("span");
      slash.classList.add("breadcrumb-home");
      slash.textContent = "/";
      listItem.appendChild(slash);
    }
    
    return listItem;
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
      if(movie.Title){
        notice.innerHTML = `<p>Your Review for ${movie.Title} was added</p>`;}
      else{ notice.innerHTML = `<p>Your Review for ${movie} was added</p>`;}  
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