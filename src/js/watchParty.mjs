import { fetchTrailerId } from "./externalServices.mjs"
import { getData } from "./utils.mjs"

// let movieData = "../public/json/movies.json"

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
    "../public/images/mnp-logo.svg",
    "/public/images/user2.png",
    "./public/images/user3.png"
  ];

  userIcons.forEach((iconPath) => {
    const userIconImg = document.createElement("img");
    userIconImg.src = iconPath;
    userIconImg.alt = "user online icon";
    userIconImg.classList.add("userIcon");

    userIconsDiv.appendChild(userIconImg);
  });

  trailerSection.appendChild(userIconsDiv);
}


// put it in here for testing because I can't figure out the paths 
const movieData = [
  {
    "id": 1,
    "title": "ARE YOU THERE GOD? IT'S ME, MARGARET.",
    "score": "99%",
    "rank": "#1",
    "consensus": "Effervescent and refreshingly frank about the travails of puberty, this long-awaited adaptation does full justice to Judy Blume's seminal novel.",
    "synopsis": "For over fifty years, Judy Blume's classic and groundbreaking novel Are You There God? It's Me, Margaret. has impacted generations... [More]",
    "starring": "Rachel McAdams, Abby Ryder Fortson, Elle Graham, Benny Safdie",
    "directed_by": "Kelly Fremon Craig"
  },
  {
    "id": 2,
    "title": "HUESERA: THE BONE WOMAN",
    "score": "97%",
    "rank": "#2",
    "consensus": "A bone-chilling body horror, Huesera offers genre fans a twisted take on What to Expect When You're Expecting.",
    "synopsis": "Valeria's joy at becoming a first-time mother is quickly taken away when she's cursed by a sinister entity. As danger... [More]",
    "starring": "Natalia Solián, Alfonso Dosal, Mayra Batalla, Mercedes Hernández",
    "directed_by": "Michelle Garza Cervera"
  },
  {
    "id": 3,
    "title": "BLACKBERRY",
    "score": "98%",
    "rank": "#3",
    "consensus": "With intelligence as sharp as its humor, BlackBerry takes a terrifically entertaining look at the rise and fall of a generation-defining gadget.",
    "synopsis": "'BlackBerry' tells the story of Mike Lazaridis and Jim Balsillie, the two men that charted the course of the spectacular... [More]",
    "starring": "Jay Baruchel, Glenn Howerton, Matt Johnson, Rich Sommer",
    "directed_by": "Matt Johnson"
  },
  {
    "id": 4,
    "title": "RYE LANE",
    "score": "98%",
    "rank": "#4",
    "consensus": "Good news, rom-com fans: Anyone looking for a smart, funny, and heartwarming new addition to the canon can find it waiting on Rye Lane.",
    "synopsis": "Yas (Vivian Oparah) and Dom (David Jonsson), two twenty-somethings both reeling from bad break-ups, connect over the course of an... [More]",
    "starring": "David Jonsson, Vivian Oparah, Charlie Knight, Simon Manyonda",
    "directed_by": "Raine Allen Miller"
  },
  {
    "id": 5,
    "title": "JOYLAND",
    "score": "98%",
    "rank": "#5",
    "consensus": "With stunning honesty that's achingly bittersweet, Joyland tackles gender and sexual fluidity in a repressed patriarchal society with wisps of hopefulness.",
    "synopsis": "The Ranas--a happily patriarchal joint family--yearn for the birth of a baby boy to continue the family line. Their youngest... [More]",
    "starring": "Ali Junejo, Rasti Farooq, Alina Khan, Sarwat Gil.",
    "directed_by": "Nashit Raza"
  },
  {
      "id": 6,
      "title": "FULL TIME",
      "rating": "98%",
      "consensus": "Led by Laure Calamy's gripping performance, Full Time serves as a sobering reminder that just staying financially afloat can sometimes feel like a white-knuckle thriller.",
      "synopsis": "Single mother Julie (César award-winning actress Laure Calamy) works a grueling job as a head chambermaid in a five-star Parisian...",
      "starring": "Laure Calamy, Anne Suarez, Geneviève Mnich, Cyril Gueï",
      "directed_by": "Eric Gravel"
    },
    {
      "id": 7,
      "title": "RETURN TO SEOUL",
      "rating": "97%",
      "consensus": "Sensitively attuned to its protagonist's quest, Return to Seoul uses one woman's story to explore universal truths about the human condition.",
      "synopsis": "On an impulse to reconnect with her origins, Freddie, 25, returns to South Korea for the first time, where she...",
      "starring": "Oh Kwang-rok, Kim Sun-young, Yoann Zimmer, Louis-Do de Lencquesaing",
      "directed_by": "Davy Chou"
    },
    {
      "id": 8,
      "title": "PAST LIVES",
      "rating": "97%",
      "consensus": "A remarkable debut for writer-director Celine Song, Past Lives uses the bonds between its sensitively sketched central characters to support trenchant observations on the human condition.",
      "synopsis": "Nora and Hae Sung, two deeply connected childhood friends, are wrest apart after Nora's family emigrates from South Korea. Two...",
      "starring": "Greta Lee, Teo Yoo, John Magaro, Seung-ah Moon",
      "directed_by": "Celine Song"
    },
    {
      "id": 9,
      "title": "SPIDER-MAN: ACROSS THE SPIDER-VERSE",
      "rating": "96%",
      "consensus": "Just as visually dazzling and action-packed as its predecessor, Spider-Man: Across the Spider-Verse thrills from start to cliffhanger conclusion.",
      "synopsis": "Miles Morales returns for the next chapter of the Oscar®-winning Spider-Verse saga, an epic adventure that will transport Brooklyn's full-time...",
      "starring": "Shameik Moore, Hailee Steinfeld, Oscar Isaac, Jake Johnson",
      "directed_by": "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson"
    },
    {
      "id": 10,
      "title": "SUZUME",
      "rating": "96%",
      "consensus": "Suzume sees director Makoto Shinkai falling just a bit short of the bar set by previous outings -- but when the results are this visually thrilling and emotionally impactful, it's hard to find much fault.",
      "synopsis": "17-year-old Suzume's journey begins in a quiet town in Kyushu when she encounters a young man who tells her, 'I'm looking for a door.' What Suzume finds is a single weathered door standing upright in the midst of ruins as though it was shielded from whatever catastrophe struck. Seemingly drawn by its power, Suzume reaches for the knob.... Doors begin to open one after another all across Japan, unleashing destruction upon any who are near. Suzume must close these portals to prevent further disaster. The stars. The sunset. The morning sky. Within that realm, it was as though all time had melted together in the sky--guided by these mysterious doors, Suzume's journey to close doors is about to begin.",
      "starring": "Nanoka Hara, Hokuto Matsumura, Eri Fukatsu, Hakuo Matsumoto II",
      "directed_by": "Makoto Shinkai"
    },
    {
      "id": 11,
      "title": "A THOUSAND AND ONE",
      "score": "96%",
      "consensus": "A tribute to parental devotion and a testament to Teyana Taylor's talent, A Thousand and One presents a heart-wrenching portrait of perseverance in the face of systemic inequity.",
      "synopsis": "A THOUSAND AND ONE follows unapologetic and free-spirited Inez (Teyana Taylor), who kidnaps six-year-old Terry from the foster care system.... [More]",
      "starring": "Teyana Taylor, Aaron Kingsley Adetola, Aven Courtney, Josiah Cross",
      "directed_by": "A.V. Rockwell"
    },
    {
      "id": 12,
      "title": "THE BLUE CAFTAN",
      "score": "96%",
      "consensus": "A love story shaped by some surprising contours, The Blue Caftan surveys the hidden heart with compassion and grace.",
      "synopsis": "Halim and Mina run a traditional caftan store in one of Morocco's oldest medinas. In order to keep up with... [More]",
      "starring": "Lubna Azabal, Saleh Bakri, Ayoub Messioui",
      "directed_by": "Maryam Touzani"
    },
    {
      "id": 13,
      "title": "R.M.N.",
      "score": "96%",
      "consensus": "R.M.N.'s spare, elegant approach lends a deceptively cool surface to its caustic take on cultural divisions.",
      "synopsis": "Award-winning director Cristian Mungiu's (4 Months, 3 Weeks, 2 Days) gripping portrait of ethnic and economic resentments tearing at the... [More]",
      "starring": "Marin Grigore, Judith State, Monica Bîrlădeanu, Orsolya Moldován",
      "directed_by": "Cristian Mungiu"
    },
    {
      "id": 14,
      "title": "YOU HURT MY FEELINGS",
      "score": "95%",
      "consensus": "Smart, funny, and above all entertaining, You Hurt My Feelings finds writer-director Nicole Holofcener as sharply perceptive as ever.",
      "synopsis": "From acclaimed filmmaker Nicole Holofcener comes a sharply observed comedy about a novelist whose long standing marriage is suddenly upended... [More]",
      "starring": "Julia Louis-Dreyfus, Tobias Menzies, Michaela Watkins, Arian Moayed",
      "directed_by": "Nicole Holofcener"
    },
    {
      "id": 15,
      "title": "BLUE JEAN",
      "score": "95%",
      "consensus": "Bridging times past with issues that are still current, Blue Jean resonates intellectually and emotionally thanks to thoughtful direction and authentic performances.",
      "synopsis": "England, 1988 -- Margaret Thatcher's Conservative government is about to pass a law stigmatizing gays and lesbians, forcing Jean, a... [More]",
      "starring": "Rosy McEwen, Kerrie Hayes, Lydia Page, Stacy Abalogun",
      "directed_by": "Georgia Oakley"
    },
    {
      "id": 16,
      "title": "BARBIE",
      "score": "-",
      "consensus": "-",
      "synopsis": "To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential crisis. Or you're a Ken.",
      "starring": "Margot Robbie, Ryan Gosling, America Ferrera, Kate McKinnon, Michael Cera",
      "directed_by": "Greta Gerwig"
    },
    {
      "id": 16,
      "title": "ATTACHMENT",
      "rating": "95%",
      "consensus": "A possession thriller that knows the devil's in the details, Attachment scares some fresh angles out of a well-worn horror subgenre.",
      "synopsis": "ATTACHMENT is a horror romance about Maja, a has-been actress in Denmark, who falls in love with Leah, a young,... [More]",
      "starring": "Sofie Gråbøl, Josephine Park, Ellie Kendrick, David Dencik",
      "directed_by": "Gabriel Bier Gislason"
    },
    {
      "id": 17,
      "title": "SAINT OMER",
      "rating": "94%",
      "consensus": "A gut-punching contemplation of a woman's immigrant experience, Saint Omer puts a mother on the stand and the audience in the jury box to find humanity in the inhumane.",
      "synopsis": "Saint-Omer court of law. Young novelist Rama attends the trial of Laurence Coly, a young woman accused of killing her... [More]",
      "starring": "Kayije Kagame, Guslagie Malanda, Valérie Dréville, Aurélia Petit",
      "directed_by": "Alice Diop"
    },
    {
      "id": 18,
      "title": "JOHN WICK: CHAPTER 4",
      "rating": "94%",
      "consensus": "John Wick: Chapter 4 piles on more of everything -- and suggests that when it comes to a well-dressed Keanu Reeves dispatching his enemies in lethally balletic style, there can never be too much.",
      "synopsis": "John Wick (Keanu Reeves) uncovers a path to defeating The High Table. But before he can earn his freedom, Wick... [More]",
      "starring": "Keanu Reeves, Donnie Yen, Bill Skarsgård, Laurence Fishburne",
      "directed_by": "Chad Stahelski"
    },
    {
      "id": 19,
      "title": "HOW TO BLOW UP A PIPELINE",
      "rating": "94%",
      "consensus": "An explosive adaptation of Andreas Malm's treatise, How to Blow Up a Pipeline delivers a high-stakes eco-thriller ignited by riveting and complex antiheroes.",
      "synopsis": "A crew of young environmental activists execute a daring mission to sabotage an oil pipeline, in Daniel Goldhaber's taut and... [More]",
      "starring": "Ariela Barer, Kristine Froseth, Lukas Gage, Forrest Goodluck",
      "directed_by": "Daniel Goldhaber"
    },
    {
      "id": 20,
      "title": "THE NIGHT OF THE 12TH",
      "rating": "94%",
      "consensus": "A grim, well-crafted thriller, The Night of the 12th takes a finely layered look at the toxic ripple effect of violence.",
      "synopsis": "In nearly every police precinct, detectives are inevitably confronted with a case that goes unsolved. The more heinous the crime,... [More]",
      "starring": "Bastien Bouillon, Bouli Lanners, Anouk Grinberg, Mouna Soualem",
      "directed_by": "Dominik Moll"
    },
    {
      "id": 21,
      "title": "AFTER LOVE",
      "rating": "94%",
      "consensus": "After Love marks an impressively nuanced feature debut for writer-director Aleem Khan -- and a brilliant showcase for Joanna Scanlan's dramatic chops.",
      "synopsis": "Set in the port town of Dover, Mary Hussain suddenly finds herself a widow following the unexpected death of her husband. A day after the burial, she discovers he has a secret just twenty-one miles across the English Channel in Calais.",
      "starring": "Joanna Scanlan, Nathalie Richards, Talid Ariss",
      "directed_by": "Aleem Khan"
    }
]