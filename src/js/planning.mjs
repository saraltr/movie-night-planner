import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { getMovies } from './externalServices.mjs';

export async function saveMovieNight() {
  const form = document.querySelector("#planning-form");
  const movieTitleInput = document.querySelector("#movie-title");
  const suggestionsContainer = document.querySelector(".suggestions");

  let timeoutId;

  movieTitleInput.addEventListener("input", async (event) => {
    const title = event.target.value;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      // call the getMovies function to get movie suggestions based on the entered title
      const movieSuggestions = await getMovies(`search/movie?query=${encodeURIComponent(title)}`);

      const results = movieSuggestions.results;
      console.log(results);

      // display the movie suggestions in a dropdown
      displayMovieSuggestions(results);
    }, 300);
  });

  const dateInput = document.querySelector("#date");
  const timeInput = document.querySelector("#time");
  const notesInput = document.querySelector("#notes");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the values entered by the user
    const movieTitle = movieTitleInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const notes = notesInput.value;

    // Create an object to store the movie night data
    const movieNight = {
      movieTitle,
      date,
      time,
      notes
    };

    // retrieve the existing movie nights from local storage
    const existingMovieNights = getLocalStorage("movie-Nights") || [];

    // add the new movie night to the existing ones
    existingMovieNights.push(movieNight);

    // save the updated movie nights to local storage
    setLocalStorage("movie-Nights", existingMovieNights);

    // display a success message or perform any other actions
    alert("Movie night planned successfully!");
    form.reset(); // clear the form inputs
    window.location.reload();
  });

  function displayMovieSuggestions(movieSuggestions) {
    // clear previous suggestions
    suggestionsContainer.innerHTML = '';

    // create and display dropdown if there are suggestions
    if (movieSuggestions && movieSuggestions.length > 0) {
      const dropdown = document.createElement("ul");
      dropdown.classList.add('suggestions-dropdown');

      movieSuggestions.forEach((movie) => {
        const suggestionItem = document.createElement("li");
        suggestionItem.textContent = movie.title;
        suggestionItem.addEventListener("click", () => {
          // set the selected suggestion as the input value
          movieTitleInput.value = movie.title;
          // clear the suggestions dropdown
          suggestionsContainer.innerHTML = '';
        });

        dropdown.appendChild(suggestionItem);
      });

      suggestionsContainer.appendChild(dropdown);
    }
  }
  displayPlanning()

}

export function displayPlanning() {
    const plannedNightsContainer = document.querySelector("#nightsContainer");
    const containerTitle = document.createElement("h2");
    containerTitle.textContent = "Upcoming Movie Nights";
    plannedNightsContainer.appendChild(containerTitle);
  
    // Retrieve the saved movie night data from local storage
    const savedMovieNights = getLocalStorage("movie-Nights");
    if (savedMovieNights) {
      // Iterate over each saved movie night
      savedMovieNights.forEach((savedMovieNight, index) => {
        // Create HTML elements to display the movie night details
        const nightElement = document.createElement("div");
        nightElement.classList.add("planned-night");
  
        const movieTitleElement = document.createElement("h3");
        movieTitleElement.innerHTML = `<img src=${require("../public/images/tickets.png")} alt=" film ticket icon"> ${savedMovieNight.movieTitle}`;
        nightElement.appendChild(movieTitleElement);
  
        const dateElement = document.createElement("p");
        dateElement.textContent = `Date: ${savedMovieNight.date}`;
        nightElement.appendChild(dateElement);
  
        const timeElement = document.createElement("p");
        timeElement.textContent = `Time: ${savedMovieNight.time}`;
        nightElement.appendChild(timeElement);
  
        if (savedMovieNight.notes) {
          const notesElement = document.createElement("p");
          notesElement.textContent = `Notes: ${savedMovieNight.notes}`;
          nightElement.appendChild(notesElement);
        }
  
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-movie");
        deleteButton.setAttribute("data-index", index);
        deleteButton.textContent = "X";
        nightElement.appendChild(deleteButton);
  
        // Append the nightElement to the container
        plannedNightsContainer.appendChild(nightElement);
      });
    }
  
    const deleteButtons = document.querySelectorAll(".delete-movie");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {

        const index = button.getAttribute("data-index");
  
        // retrieve the saved movie nights from local storage
        const existingMovieNights = getLocalStorage("movie-Nights") || [];
  
        // remove the movie night at the specified index
        existingMovieNights.splice(index, 1);
  
        // save the updated movie nights to local storage
        setLocalStorage("movie-Nights", existingMovieNights);
  
        // remove the deleted movie night from the display
        const nightElement = button.parentNode;
        plannedNightsContainer.removeChild(nightElement);
      });

      button.parentNode.style.position = "relative";
      button.style.position = "absolute";
      button.style.right = "1rem";
      button.style.bottom = "50px";
      button.style.border = "1px solid #d0d0d0";
      button.style.backgroundColor = "#122936";
      button.style.color = "#d0d0d0";
      button.style.opacity = ".7";
      button.style.fontSize = "22px";
      button.style.cursor = "pointer";
      button.style.padding = "5px";
    //   button.style.marginRight= "80px";
    });
}
  
  