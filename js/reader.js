"use strict";

/*=========================================
    Reader State
=========================================*/

const comicReader =
    document.getElementById("comicReader");

const counter =
    document.getElementById("counter");

const chapterTitle =
    document.getElementById("chapterTitle");

let currentPage = 1;

/*=========================================
    Update Counter
=========================================*/

function updateCounter(page,total){

    currentPage = page;

    counter.textContent =
        `Page ${page} / ${total}`;

}

/*=========================================
    Update Chapter Title
=========================================*/

function updateChapterTitle(){

    const chapterSelect =
        document.getElementById("chapterSelect");

    if(!chapterSelect) return;

    chapterTitle.textContent =
        chapterSelect.options[
            chapterSelect.selectedIndex
        ].text;

}

/*=========================================
    Observe Visible Pages
=========================================*/

const pageObserver =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const page =
            Number(
                entry.target.dataset.page
            );

        const total =
            document.querySelectorAll(
                ".comic-page"
            ).length;

        updateCounter(page,total);

    });

},

{

    threshold:0.60

}

);

/*=========================================
    Observe All Pages
=========================================*/

function observePages(){

    document
        .querySelectorAll(".comic-page")
        .forEach(page=>{

            pageObserver.observe(page);

        });

}

/*=========================================
    Initialize
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateChapterTitle();

        observePages();

    }

);