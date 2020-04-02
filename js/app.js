/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

const t0 = performance.now();

const sections = document.querySelectorAll("section");
const navList = document.querySelector("ul#navbar__list");
const fragment = document.createDocumentFragment();
const nav = document.getElementById("nav");

var initial;

var positions = [];

// Nav Creation - start

for(let i = 0; i < sections.length; i++) {
//here I created a list item with an anchor in it that reffers to it specific section and also I made the scroll in the 
//html smooth

    const link = sections[i].getAttribute("id");

    const text = sections[i].getAttribute("data-nav");

    const navLink = document.createElement("li");

    const navAnchor = document.createElement("a");

    navAnchor.setAttribute("href", "#" + link);

    navLink.appendChild(navAnchor);

    navLink.setAttribute("class", "menu__link");

    navAnchor.innerText = text;

    fragment.appendChild(navLink);
}

navList.appendChild(fragment);

//Nav Creation - end



//Active Sections - start

const activeLinks = document.querySelectorAll("li");

window.addEventListener("scroll", function(event) {
    //here I put a timeout when the person starts scrolling and reset it every time the scroll is triggered again

    nav.style.display = "block";
    window.clearTimeout(initial);
    initial = setTimeout(() => {
        nav.style.display = "none";
    }, 2000);

    //here I got the positions of every section relative to the top of the viewport and choose the closest one
    //I added 500 to this value because it triggered to fast (personal opinion)

    for(let i = 0; i < sections.length; i++) {
        positions[i] = sections[i].getBoundingClientRect().top + 500;
    }

    let min = 1000000, posMin;

    for(let i = 0; i < positions.length; i++) {
        if(positions[i] < min && positions[i] >= 0) {
            min = positions[i];
            posMin = i;
        }
    }

    //I added the active classes for the title and the navbar

    sections[posMin].classList.add("your-active-class");
    activeLinks[posMin].classList.add("link__active");

    for(let i = 0; i < sections.length; i++) {
        if(i != posMin) {
            sections[i].classList.remove("your-active-class");
            activeLinks[i].classList.remove("link__active");
        }
    }
    
 }, false);

//Active Sections - end

const t1 = performance.now();

console.log(t1 - t0 + " ms");


