export function buildNavigation(){
    const menu = document.querySelector(".menu");
    menu.innerHTML = renderNav()

    const priNav = document.querySelector("#primaryNav");
    const navEl = document.querySelector("nav");
    const x = document.querySelector("#hamburgerBtn");
    x.style.backgroundColor = "transparent";
    x.style.border = "none";
    x.style.cursor = "pointer"
    x.addEventListener("mouseover", ()=>{
        x.style.opacity = ".7";
        setTimeout(() => {
            x.style.opacity = "1";

          }, 1000);
    })

    x.addEventListener("click", ()=>{
        priNav.classList.toggle("open");
        x.classList.toggle("open");
        navEl.classList.toggle("open");
    })

}

function renderNav(){
    return `<nav>
    <button id="hamburgerBtn">
        <span><img src="../images/menuIcon.png" alt="hamburger menu icon"></span>
        <span><img src="../images/icons8-x-48.png" alt="close menu icon"></span>
    </button>
    <ul id="primaryNav">
        <li><a href="/user/index.html">Profile</a></li>
        <li><a href="#">Planner</a></li>
        <li><a href="#">Discover</a></li>
        <li><a href="/watch-party/index.html">Watch Party</a></li>
    </ul>
  </nav> `
    
}