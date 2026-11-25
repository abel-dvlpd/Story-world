/*=========================================================
    MILLBROOK ACADEMY
    Main Website JavaScript
    Version 1.0
=========================================================*/

"use strict";

/*=========================================================
    ELEMENTS
=========================================================*/

const body = document.body;

const navbar = document.querySelector(".navbar");

const themeToggle = document.getElementById("themeToggle");

const scrollTopBtn = document.getElementById("scrollTop");

const sections = document.querySelectorAll(
    "section"
);

const navLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

/*=========================================================
    THEME
=========================================================*/

const savedTheme =
    localStorage.getItem("theme");

if(savedTheme){

    body.classList.toggle(
        "dark-mode",
        savedTheme === "dark"
    );

}

updateThemeButton();

themeToggle.addEventListener(
    "click",
    toggleTheme
);

function toggleTheme(){

    body.classList.toggle("dark-mode");

    const currentTheme =
        body.classList.contains("dark-mode")
        ? "dark"
        : "light";

    localStorage.setItem(
        "theme",
        currentTheme
    );

    updateThemeButton();

}

function updateThemeButton(){

    if(body.classList.contains("dark-mode")){

        themeToggle.textContent = "☀️";

    }
    else{

        themeToggle.textContent = "🌙";

    }

}

/*=========================================================
    SCROLL TO TOP
=========================================================*/

window.addEventListener(
    "scroll",
    handleScroll
);

function handleScroll(){

    if(window.scrollY > 350){

        scrollTopBtn.classList.add("show");

    }
    else{

        scrollTopBtn.classList.remove("show");

    }

    updateNavbar();

}

scrollTopBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }
);

/*=========================================================
    NAVBAR EFFECT
=========================================================*/

function updateNavbar(){

    if(window.scrollY > 50){

        navbar.classList.add(
            "navbar-scrolled"
        );

    }
    else{

        navbar.classList.remove(
            "navbar-scrolled"
        );

    }

}

/*=========================================================
    SMOOTH SCROLL
=========================================================*/

navLinks.forEach(link=>{

    link.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if(!target) return;

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }
    );

});

/*=========================================================
    FADE IN SECTIONS
=========================================================*/

const observer =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add(
                "visible"
            );

        }

    });

},

{

    threshold:0.15

}

);

sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});

/*=========================================================
    INITIALIZE
=========================================================*/

updateNavbar();

handleScroll();