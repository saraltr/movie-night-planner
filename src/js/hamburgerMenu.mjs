export function buildNavigation(){
    const menu = document.querySelector(".menu");
    menu.innerHTML = renderNav()

    
    const priNav = document.querySelector("#primaryNav");

    priNav.style.backgroundColor = "var(--quaternary)";
    priNav.style.padding = "1rem"
   

    const navEl = document.querySelector("nav");
    const x = document.querySelector("#hamburgerBtn");
    x.onclick = toggleMenu(priNav, navEl, x);

  

}

//Menu icon
function toggleMenu(priNav, navEl, x){
    priNav.classList.toggle("open");
    x.classList.toggle("open");
   navEl.classList.toggle("open");
    
}

function renderNav(){
    return template = `<nav>
    <button id="hamburgerBtn"><img src="../images/menuIcon.png" alt="hamburger menu icon"></button>
    <ul id="primaryNav">
        <li><a href="/user/index.html">Profile</a></li>
        <li><a href="#">Planner</a></li>
        <li><a href="#">Discover</a></li>
        <li><a href="/watch-party/index.html">Watch Party</a></li>
    </ul>
  </nav> `
    
}