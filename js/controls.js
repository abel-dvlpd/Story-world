/*=========================================================
    MILLBROOK ACADEMY
    Reader Controls
    Part 4B
=========================================================*/

"use strict";

/*=========================================================
    ELEMENTS
=========================================================*/

const zoomInButton =
    document.getElementById("zoomIn");

const zoomOutButton =
    document.getElementById("zoomOut");

const resetButton =
    document.getElementById("reset");

const comicImages =
    document.querySelectorAll(".comic-image");

/*=========================================================
    SETTINGS
=========================================================*/
const MIN_ZOOM = 0.25;

const MAX_ZOOM = 4;

const STEP = 0.10;

/*=========================================================
    ACTIVE IMAGE
=========================================================*/

let activeImage = null;

let currentScale = 1;

/*=========================================================
    PAN STATE
=========================================================*/

let translateX = 0;

let translateY = 0;

let dragging = false;

let startX = 0;

let startY = 0;

/*=========================================================
    FIND ACTIVE IMAGE
=========================================================*/

function updateActiveImage(){

    let bestImage = comicImages[0];

    let bestDistance = Infinity;

    comicImages.forEach(image=>{

        const rect = image.getBoundingClientRect();

        const center = rect.top + rect.height / 2;

        const distance = Math.abs(

            center -

            window.innerHeight / 2

        );

        if(distance < bestDistance){

            bestDistance = distance;

            bestImage = image;

        }

    });

    activeImage = bestImage;

}

updateActiveImage();

/*=========================================================
    APPLY ZOOM
=========================================================*/

function applyZoom(){

    if(!activeImage) return;

    activeImage.style.transform =

        `translate(${translateX}px, ${translateY}px)
         scale(${currentScale})`;

    activeImage.style.transformOrigin =
        "center center";

}
/*=========================================================
    ZOOM IN
=========================================================*/

zoomInButton.addEventListener(

    "click",

    ()=>{

        updateActiveImage();

        currentScale = Math.min(

            MAX_ZOOM,

            currentScale + STEP

        );

        applyZoom();

    }

);

/*=========================================================
    ZOOM OUT
=========================================================*/

zoomOutButton.addEventListener(

    "click",

    ()=>{

        updateActiveImage();

        currentScale = Math.max(

            MIN_ZOOM,

            currentScale - STEP

        );

        applyZoom();

    }

);

/*=========================================================
    RESET
=========================================================*/

resetButton.addEventListener(

    "click",

    ()=>{

        currentScale = 1;

        translateX = 0;

        translateY = 0;

        comicImages.forEach(image=>{

            image.style.transform =

                "translate(0px,0px) scale(1)";

        });

    }

);
/*=========================================================
    MOUSE WHEEL
=========================================================*/

window.addEventListener(

    "wheel",

    e=>{

        if(!e.ctrlKey) return;

        e.preventDefault();

        updateActiveImage();

        if(e.deltaY < 0){

            currentScale = Math.min(

                MAX_ZOOM,

                currentScale + STEP

            );

        }

        else{

            currentScale = Math.max(

                MIN_ZOOM,

                currentScale - STEP

            );

        }

        applyZoom();

    },

    { passive:false }

);

/*=========================================================
    DRAG TO PAN
=========================================================*/

window.addEventListener(

    "mousedown",

    e=>{

        updateActiveImage();

        if(currentScale <= 1) return;

        if(!activeImage.contains(e.target)) return;

        dragging = true;

        startX = e.clientX - translateX;

        startY = e.clientY - translateY;

        activeImage.style.cursor = "grabbing";

    }

);

window.addEventListener(

    "mousemove",

    e=>{

        if(!dragging) return;

        translateX = e.clientX - startX;

        translateY = e.clientY - startY;

        applyZoom();

    }

);

window.addEventListener(

    "mouseup",

    ()=>{

        dragging = false;

        if(activeImage){

            activeImage.style.cursor =

                currentScale > 1

                ? "grab"

                : "zoom-in";

        }

    }

);

/*=========================================================
    UPDATE ACTIVE PAGE
=========================================================*/

window.addEventListener(

    "scroll",

    ()=>{

        updateActiveImage();

    }

);

window.addEventListener(

    "resize",

    ()=>{

        updateActiveImage();

    }

);