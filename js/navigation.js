"use strict";

/*======================================================
    MILLBROOK READER ENGINE 2.0
    Dynamic Chapter Loader
======================================================*/

/*======================================================
    ELEMENTS
======================================================*/

const comicReader =
    document.getElementById("comicReader");

const chapterSelect =
    document.getElementById("chapterSelect");

const chapterTitle =
    document.getElementById("chapterTitle");

const counter =
    document.getElementById("counter");

const previousButton =
    document.getElementById("prev");

const nextButton =
    document.getElementById("next");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");


/*======================================================
    READER STATE
======================================================*/

let currentChapter = 0;

let currentPage = 0;

let pages = [];


/*======================================================
    LOAD CHAPTER
======================================================*/

function loadChapter(chapterIndex){

    comicReader.innerHTML = "";

    currentChapter = chapterIndex;

    const chapter =
        chapters[currentChapter];

    chapter.forEach((image,index)=>{

        const page = document.createElement("section");

        page.className = "comic-page";

        page.dataset.page = index + 1;

        page.id = `page${index+1}`;

        page.innerHTML = `

            <img
                src="${image}"
                class="comic-image"
                draggable="false"
                alt="Page ${index+1}">

            <div class="page-number">

                Page ${index+1}

            </div>

        `;

        comicReader.appendChild(page);

    });

    pages =
        document.querySelectorAll(".comic-page");

    currentPage = 0;

    updateCounter();

    updateProgress();

    chapterTitle.textContent =
        chapterSelect.options[
            chapterSelect.selectedIndex
        ].text;

    if(typeof observePages === "function"){

        observePages();

    }

}


/*======================================================
    COUNTER
======================================================*/

function updateCounter(){

    counter.textContent =
        `Page ${currentPage+1} / ${pages.length}`;

}


/*======================================================
    PROGRESS
======================================================*/

function updateProgress(){

    if(!progressFill) return;

    const percent =

        ((currentPage+1)/pages.length)*100;

    progressFill.style.width =
        percent + "%";

    progressText.textContent =
        Math.round(percent) + "%";

}


/*======================================================
    GO TO PAGE
======================================================*/

function goToPage(index){

    if(index<0) return;

    if(index>=pages.length) return;

    currentPage = index;

    pages[currentPage].scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

    updateCounter();

    updateProgress();

}


/*======================================================
    BUTTONS
======================================================*/

previousButton.addEventListener(

    "click",

    ()=>{

        goToPage(currentPage-1);

    }

);


nextButton.addEventListener(

    "click",

    ()=>{

        goToPage(currentPage+1);

    }

);


/*======================================================
    CHAPTER SELECT
======================================================*/

chapterSelect.addEventListener(

    "change",

    ()=>{

        loadChapter(

            Number(

                chapterSelect.value

            )

        );

    }

);


/*======================================================
    KEYBOARD
======================================================*/

document.addEventListener(

    "keydown",

    (event)=>{

        switch(event.key){

            case "ArrowLeft":

            case "ArrowUp":

                goToPage(currentPage-1);

                break;

            case "ArrowRight":

            case "ArrowDown":

                goToPage(currentPage+1);

                break;

        }

    }

);


/*======================================================
    INITIALIZE
======================================================*/

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadChapter(0);

    }

);