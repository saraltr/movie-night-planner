import { fetchMovieBySearch} from './externalServices.mjs';

// creates the home page banner
export async function createBanner() {
    try {
      const mainElement = document.querySelector("main");
      const bannerSection = document.createElement("section");
      const bannerDiv = document.createElement("div");
      bannerDiv.classList.add("banner");
      const bannerTitle = document.createElement("h1");
      bannerTitle.textContent = "Banner";
  
      bannerDiv.appendChild(bannerTitle);
      bannerSection.appendChild(bannerDiv);
      mainElement.appendChild(bannerSection);
    
      // fetching movie data using the fetchMovieBySearch function and the keyword "dark" as it is common in films name
      const bannerMovies = await fetchMovieBySearch("dark");
    //   console.log(bannerMovies); 
      const bannerPosters = createBannerPosters(bannerMovies); // creating the HTML template for banner posters

      const postersContainer = document.createElement("div");
      postersContainer.classList.add("posters-container");
      postersContainer.innerHTML = bannerPosters;
  
      // applied additional styling using js to experiment 
      postersContainer.style.display = "flex";
      postersContainer.style.flexDirection = "row";
      postersContainer.style.overflowX = "auto";
      postersContainer.style.gap = "10px";
      postersContainer.style.transform = "scale(0.8)";
  
      const posterImages = postersContainer.querySelectorAll("img"); // selecting all img elements within the posters container
      posterImages.forEach((img) => {
        // applying additional styling to each poster image
        img.style.height = "500px";
        img.style.width = "300px";
        img.style.objectFit = "cover";
        img.style.transition = "transform 0.3s";
      });
  
      bannerDiv.appendChild(postersContainer);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  
// create the HTML template for the banner posters
function createBannerPosters(bannerMovies) {
    if (!bannerMovies || !Array.isArray(bannerMovies)) {
      return ""; // return an empty string if the movie data is invalid
    }
  
    let template = "";
  
    bannerMovies.forEach((movie) => {
      const moviePoster = movie.Poster;
      const mediaType = movie.Type;
      const movieTitle = movie.Title;
  
      if (mediaType === "movie") {
        // if the media type is a movie, add the movie details to the template
        template += `
        <div class="movie-details">
          <a href="#">
            <img src="${moviePoster}" alt="${movieTitle} poster"/>
          </a>
        </div>`;
      }
    });
  
    return template;
  }
  