"use strict";

/*==========================================
    AUDIO PLAYER
==========================================*/

const music =
document.getElementById("bgMusic");

const musicButton =
document.getElementById("musicToggle");

const volumeSlider =
document.getElementById("volumeSlider");


if(music){

    initialiseAudio();

}


/*==========================================
    INITIALISE
==========================================*/

function initialiseAudio(){

    //----------------------------------
    // Restore volume
    //----------------------------------

    const savedVolume =
        localStorage.getItem("musicVolume");

    if(savedVolume!==null){

        music.volume=parseFloat(savedVolume);

        volumeSlider.value=savedVolume;

    }
    else{

        music.volume=.5;

    }

    //----------------------------------
    // Restore play state
    //----------------------------------

    const playing =
        localStorage.getItem("musicPlaying");

    if(playing==="true"){

        music.play().catch(()=>{});

        updateButton(true);

    }

}


/*==========================================
    PLAY / PAUSE
==========================================*/

musicButton.addEventListener(

    "click",

    ()=>{

        if(music.paused){

            music.play();

            updateButton(true);

            localStorage.setItem(

                "musicPlaying",

                "true"

            );

        }

        else{

            music.pause();

            updateButton(false);

            localStorage.setItem(

                "musicPlaying",

                "false"

            );

        }

    }

);


/*==========================================
    VOLUME
==========================================*/

volumeSlider.addEventListener(

    "input",

    ()=>{

        music.volume=

            volumeSlider.value;

        localStorage.setItem(

            "musicVolume",

            volumeSlider.value

        );

    }

);


/*==========================================
    BUTTON ICON
==========================================*/

function updateButton(state){

    musicButton.textContent=

        state ? "❚❚" : "▶";

}