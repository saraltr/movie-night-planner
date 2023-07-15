
export async function displayPopups(){
    //
    const response = await fetch("../json/alert.json");
    if (response.ok) {
      let data = await response.json();
      console.log(data)
      displayResults(data);
    } else {
      throw new Error("Bad Response");
    }
    
}

function displayResults(data){
    const main = document.querySelector("main");
    const section = document.createElement("section");
    const closeBtn = document.createElement("button");
    const list = [];

    section.classList.add("alert-list");
    section.style.backgroundColor = "var(--light-grey)";
    section.style.position = "fixed";;
    section.style.zIndex = "5";
    //section.style.height = "30%";
    section.style.maxWidth = "400px"
    section.style.transform = "translateX(-100%)";
    section.style.transition = "1s ease-in-out";
    section.style.padding = "2rem";
    section.style.left = "0";
    section.style.bottom = "20%";
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "X";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "0";
    closeBtn.style.top = "0";
    closeBtn.style.border = "none";
    closeBtn.style.fontWeight = "bold"
    closeBtn.style.backgroundColor = "transparent";
    closeBtn.addEventListener("mouseover", ()=>{
        closeBtn.style.color = "red";
        setTimeout(() => {
            closeBtn.style.color = "black";

          }, 1000);
    })
  
    //iterate though alerts.json
    data.forEach((item) => {
        const h1 = document.createElement("h1");
        const p = document.createElement("p");
        const a = document.createElement("a");
        const message = document.createElement("p");
        h1.innerHTML = item.title;
        h1.style.color = "var(--primary-color)"
        message.innerHTML = item.message;
        message.style.padding = ".5rem";
        a.innerHTML = item.callToAct;
        a.setAttribute("href", item.redirect);
        a.style.color = "var(--secondary-color)";
        a.style.padding = ".2rem";
        a.addEventListener("mouseover", ()=>{
            a.style.border = "1px solid #40125f";
            setTimeout(() => {
                a.style.border = "none";
    
              }, 2000);
        })
        message.style.color = "var(--primary-color)";
        
        list.push(message);
        section.appendChild(h1)
        section.appendChild(message)
        section.appendChild(a)
    });
  
  //  let randomp = list[Math.floor(Math.random() * list.length)];
    section.appendChild(closeBtn);
  //  section.appendChild(randomp);
    main.appendChild(section);
    setTimeout(() => {
      
      section.style.transform = "translateX(0)";
    }, 4000);


    closeBtn.addEventListener("click", () => {
        section.style.display = "none";
      });
    
}