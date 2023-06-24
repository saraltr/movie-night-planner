import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default function movieFavList(){
    const favList = getLocalStorage("fav-list") || [];
    const favEl = document.querySelector(".fav-user-list");

    const movie = favList.map((item) => {
         const template = `<li>
            <a href="#">
                <h3>${item.Title} (${item.Year})</h3>
                <img src="${item.Poster}" alt="Porter of ${item.Title}" />
                </a>
            </li>`;

    })

   
}