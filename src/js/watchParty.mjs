import { fetchTrailerId } from "./externalServices.mjs"
import { addCommentToStorage, getData, getLocalStorage } from "./utils.mjs"


const movieData = require("../public/json/movies.json");

// randomly selects a movie
function selectRandomMovie(movies) {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}
// plays the trailer in the iframe using the trailer id
function playTrailer(trailerId) {
  const trailerIframe = document.createElement("iframe");
  trailerIframe.src = `https://www.youtube.com/embed/${trailerId}`;
  trailerIframe.allowFullscreen = true;
  return trailerIframe;
}

// function to create the trailer sections depending on the pages 
function createTrailerSection(trailerIframe, showJoinPartyButton = true) { // the join party is only visible in the main index

  const mainElement = document.querySelector("main");

  // creates this one if it is on the main index
  if (showJoinPartyButton) {

    const trailerSection = document.createElement("section");
    trailerSection.classList.add("trailerSection");

    const trailerDiv = document.createElement("div");
    trailerDiv.setAttribute("id", "app");

    trailerDiv.appendChild(trailerIframe);
    trailerSection.appendChild(trailerDiv);

    // creates the redirecting button
    const watchPartyButton = document.createElement("button");
    watchPartyButton.classList.add("joinBtn");
    watchPartyButton.textContent = "Join Watch Party 🎉";
    trailerSection.appendChild(watchPartyButton);

    const existingSection = mainElement.querySelector(".bannerSection");
    mainElement.insertBefore(trailerSection, existingSection.nextSibling);

    // section that is created in the watch party pages
  } else {
    const filmTitle = document.createElement("h1");
    filmTitle.classList.add("filmTitle");

    const trailerSection = document.createElement("section");
    trailerSection.classList.add("partySection");
    const trailerDiv = document.createElement("div");
    trailerDiv.classList.add("partyTrailer");

    trailerDiv.appendChild(filmTitle);
    trailerDiv.appendChild(trailerIframe);

    trailerSection.appendChild(trailerDiv);
    mainElement.appendChild(trailerSection);
  }
}


// function to create the movie info template
function createMovieInfoTemplate(movie) {
  const movieInfoTemplate = document.createElement("div");
  movieInfoTemplate.classList.add("moviecard");
  movieInfoTemplate.innerHTML = `
    <h2>${movie.title}</h2>
    <div class="movie-info">
      <p><strong>Synopsis:</strong> ${movie.synopsis}</p>
      <p><strong>Rating:</strong> ${movie.rating}</p>
      <p><strong>Starring:</strong> ${movie.starring}</p>
      <p><strong>Directed By:</strong> ${movie.directed_by}</p>
      <p><strong>Critics consensus:</strong> ${movie.consensus}</p>
    </div>
  `;
  return movieInfoTemplate;
}

// function to initialize the iframe
export async function initialize(movieTitle = null) {
  // movieData = await getData();

  // gets random movie of the json file 
  const randomMovie = selectRandomMovie(movieData);


  if (movieTitle) {
    // for watch party pages

    // gets the id of the movie using the title
    const trailerId = await fetchTrailerId(movieTitle);
    // passes the id to the iframe
    const trailerIframe = playTrailer(trailerId);

    createTrailerSection(trailerIframe, false)
    const filmTitle = document.querySelector(".filmTitle");
    filmTitle.innerHTML=  `Currently watching: ▶️${movieTitle}`;

    //COMMENT SECTION
    const main = document.querySelector("main");
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("movie-comments")
    commentDiv.innerHTML = renderCommentForm(movieTitle);
    main.appendChild(commentDiv)
    
     //ADD COMMENTS TO STORAGE
     const commentBtn = document.querySelector("#commtBtn");
     commentBtn.addEventListener("click", (e) => {
       e.preventDefault();
       addCommentToStorage(movieTitle);
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
       if (movieTitle === item.movie) {
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

  } else {
    // for the home page

    // gets the id of the movie using the title
    const trailerId = await fetchTrailerId(randomMovie.title);
    // console.log(trailerId);

    // passes the id to the iframe
    const trailerIframe = playTrailer(trailerId);
    createTrailerSection(trailerIframe);
    const movieInfoTemplate = createMovieInfoTemplate(randomMovie);
    const mainSection = document.querySelector(".trailerSection");

    // passes the template for the movie info
    mainSection.appendChild(movieInfoTemplate);
    const watchPartyButton = document.querySelector(".joinBtn");

    // redirects to the watch party page using the title of the movie
    watchPartyButton.addEventListener("click", () => {
      const movieTitle = encodeURIComponent(randomMovie.title);
      window.location.href = `/watch-party/index.html?movie=${movieTitle}`;
    });
  }

  displayOnlineUsers(); // not working currently :(
}

// function to display user icons in trailer section
function displayOnlineUsers() {
  const trailerSection = document.querySelector(".trailerSection");

  const userIconsDiv = document.createElement("div");
  userIconsDiv.classList.add("userIcons");

  const userIcons = [
    require("../public/images/user1.png"),
    require("../public/images/user2.png"),
    require("../public/images/user3.png"),
    require("../public/images/user4.png")
  ];

  userIcons.forEach((iconPath, index) => {
    const onlineUsers = document.createElement("div");
    onlineUsers.classList.add("onlineUsers");

    const userIconImg = document.createElement("img");
    userIconImg.src = iconPath;
    userIconImg.alt = "user online icon";
    onlineUsers.appendChild(userIconImg);

    const textDiv = document.createElement("div");
    textDiv.classList.add("icon-text");
    textDiv.textContent = `User ${index + 1}`;
    onlineUsers.appendChild(textDiv);

    userIconsDiv.appendChild(onlineUsers);
  });
  const titleDiv = document.createElement("h3");
  titleDiv.textContent = "Online Users: "
  trailerSection.appendChild(userIconsDiv);
  userIconsDiv.insertAdjacentElement("afterbegin", titleDiv);
}

function renderCommentForm(movieTitle) {
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
        <input id="mTitle" type="hidden" name="movieTitle" value="${movieTitle}">
        <input type="hidden" name="timeSend" id="formDateSend">
      </fieldset>
    </form>
  `;
  return form;
}