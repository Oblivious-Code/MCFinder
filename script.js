const backgroundMusic = new Audio('https://soundcloud.com/minecraft-scmusic/precipice-hyper-potions-remix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing');
backgroundMusic.loop = true;
backgroundMusic.muted = true;
backgroundMusic.volume = 0.5;

function setMusicButtonState(isMuted) {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;

  musicToggle.dataset.muted = String(isMuted);
  musicToggle.textContent = isMuted ? '🔇 Music' : '🔊 Music';
}

async function toggleMusic() {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;

  const isMuted = musicToggle.dataset.muted === 'true';

  if (isMuted) {
    backgroundMusic.muted = false;
    try {
      await backgroundMusic.play();
      setMusicButtonState(false);
    } catch (err) {
      console.log('Music play blocked until user interaction:', err);
    }
  } else {
    backgroundMusic.muted = true;
    backgroundMusic.pause();
    setMusicButtonState(true);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const musicToggle = document.getElementById('musicToggle');
  if (musicToggle) {
    setMusicButtonState(true);
    musicToggle.addEventListener('click', toggleMusic);
  }

  backgroundMusic.addEventListener('ended', () => {
    backgroundMusic.currentTime = 0;
    if (backgroundMusic.muted === false) {
      backgroundMusic.play();
    }
  });
});
