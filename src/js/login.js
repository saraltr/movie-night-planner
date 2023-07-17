import { buildNavigation } from './hamburgerMenu.mjs';
import { createSearchBox, redirectToSearchResults } from './search.mjs';
import { createScrollBtn, generateBreadcrumb, getParam } from './utils.mjs'


document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector("#searchButton");
    const searchInput = document.querySelector("#searchInput");
  
    //  event listener for when the research is sent
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value; // getting the value from the search input
      redirectToSearchResults(searchTerm); // redirecting to the search results page with the search term
    });

    const loginForm = document.getElementById("login-user");
    const redirectParam = "src/user/index.html" || "/";

    loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location = "/user/index.html"

});
});

generateBreadcrumb();
createSearchBox()

createScrollBtn();
buildNavigation()