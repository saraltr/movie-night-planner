// creates the search box
export function createSearchBox() {

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("id", "searchInput");
  searchInput.setAttribute("placeholder", "Enter your search...");
  searchInput.classList.add("search-input");


  // create the search button element
  const searchButton = document.createElement("button");
  searchButton.setAttribute("id", "searchButton");
  searchButton.textContent = "Search";
  searchButton.classList.add("search-button");

  const searchBox = document.createElement("div");
  searchBox.classList.add("search-box");
  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  // append the search box and button to the menu div
  const menuDiv = document.querySelector(".menu");
  menuDiv.prepend(searchBox);
}

// redirect to search results page
export function redirectToSearchResults(searchTerm) {
  // Create URL parameters and set the search term
  const urlParams = new URLSearchParams();
  urlParams.set("search", searchTerm);

  // Get the root path of the website so we can uses the search box everywhere
  const rootPath = window.location.origin;

  // create the new URL with the search term as a parameter
  const newUrl = `${rootPath}/results/index.html?${urlParams.toString()}`;

  // redirect the page to the new URL
  window.location.href = newUrl;
}
