const backgroundMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
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
    } catch (error) {
      console.log('Music play blocked until user interaction:', error);
      backgroundMusic.muted = true;
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
    if (!backgroundMusic.muted) {
      backgroundMusic.play();
    }
  });
});
