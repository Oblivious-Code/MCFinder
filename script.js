// Create the audio object
const backgroundMusic = new Audio('https://soundcloud.com/minecraft-scmusic/precipice-hyper-potions-remix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');

// Set it to loop indefinitely
backgroundMusic.loop = true;

// Functions to control it
function startMusic() {
    backgroundMusic.play();
}

function stopMusic() {
    backgroundMusic.pause();
}
