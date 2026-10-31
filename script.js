// Create the audio object
const backgroundMusic = new Audio('Featherfall (Hyper Potions Remix).mp3');

// Set it to loop indefinitely
backgroundMusic.loop = true;

// Functions to control it
function startMusic() {
    backgroundMusic.play();
}

function stopMusic() {
    backgroundMusic.pause();
}
